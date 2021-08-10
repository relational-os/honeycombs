import React, { useEffect, useState } from "react";
import { request, gql } from "graphql-request";
import { Variables } from "graphql-request/dist/types";
import useSWR, { SWRConfiguration } from "swr";
import { useBlockStore } from "@app/features/state";
import { useWallet } from "@gimmixfactory/use-wallet";

const graphURL =
  "https://api.thegraph.com/subgraphs/name/relational-os/honeycombs";

const useQuery = (
  query: string,
  variables?: Variables,
  swrOptions?: Partial<SWRConfiguration>
) => {
  console.log("querying", query);
  const { data, error, mutate } = useSWR(
    [query, JSON.stringify(variables), "home-search"],
    (query) => request(graphURL, query, variables),
    { revalidateOnMount: true, ...swrOptions }
  );
  return { data, error, refresh: mutate };
};

const QueryBar = () => {
  const [query, setQuery] = useState("");
  const [params, setParams] = useState<Record<string, string>>({});
  const [gqlQuery, setGQLQuery] = useState("");
  const debouncedParams = useDebounce(params, 300);
  const { account } = useWallet();

  useEffect(() => {
    if (account !== undefined) {
      setParams({ author: account });

      setGQLQuery(gql`
        query BlockQuery($author: String) {
          blocks(
            first: 10
            orderBy: datetime
            orderDirection: desc
            where: { author: $author }
          ) {
            id
            owner
            author
            content
            context
            uri
            type
          }
        }
      `);
    }
  }, [account]);

  const parseQuery = () => {
    const terms = ["author", "type", "is"];
    var split = query.split(" ").map((c) => {
      return c.split(":");
    });

    var namedResults = split.filter((el) => {
      return terms.includes(el[0]);
    });
    var text = split.filter((el) => {
      return el.length == 1;
    });

    setParams((_params) => {
      return {
        ...Object.fromEntries(namedResults.map(([k, v]) => [k, v])),
        text: text.join(" "),
      };
    });
  };

  var results = useQuery(gqlQuery, debouncedParams);

  useEffect(() => {
    if (!results?.data) {
      return;
    }

    var converted = results.data.blocks.map((b: any) => ({ block: b }));
    useBlockStore.setState({ blocks: converted });
  }, [results?.data]);

  useEffect(() => {
    parseQuery();
  }, [query]);

  return (
    <div>
      <input
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      ></input>
    </div>
  );
};

function useDebounce(value: any, delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

export default QueryBar;
