import React, { useEffect, useState } from "react";
import { request, gql } from "graphql-request";
import { Variables } from "graphql-request/dist/types";
import useSWR, { SWRConfiguration } from "swr";
import { useBlockStore } from "@app/features/state";
import { useWallet } from "@gimmixorg/use-wallet";

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

const baseQuery = gql`
  query BlockQuery($author: String) {
    blocks(
      first: 25
      orderBy: datetime
      orderDirection: desc # where: { author: $author }
    ) {
      id
      owner
      author
      content
      context
      uri
      type
      datetimeString
    }
  }
`;

const QueryBar = () => {
  const [query, setQuery] = useState("");
  const [params, setParams] = useState<Record<string, string>>({});
  const [gqlQuery, setGQLQuery] = useState("");
  const debouncedParams = useDebounce(params, 300);
  const { account } = useWallet();

  useEffect(() => {
    console.log(account);
    if (account !== undefined) {
      setParams({ author: account });
      setGQLQuery(baseQuery);
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

    var converted = results.data.blocks.map((b: any) => ({
      ipfsComplete: true,
      txComplete: true,
      txConfirmed: true,
      block: { ...b, datetime: b.datetimeString },
    }));

    console.log(converted);

    useBlockStore.setState({ blocks: converted });
  }, [results?.data]);

  useEffect(() => {
    parseQuery();
  }, [query]);

  return (
    <div className="query-bar">
      <input
        className="search"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      ></input>
      <div className="filter-bar">
        <ul className="order-chooser">
          <li className="newest active">Newest First</li>
          <li className="oldest">Oldest First</li>
        </ul>
        <div className="spacer"></div>
        <div className="highlight-toggle">
          <label>
            <input type="checkbox" defaultChecked /> Highlight unread blocks
          </label>
        </div>
      </div>

      <style jsx>{`
        .query-bar input.search {
          position: sticky;
          top: 1rem;
          width: 38rem;
          padding: 0.25rem 1rem 0.25rem 2.5rem;
          background: #ffffff url("/assets/icon-search.svg") 1rem 50% no-repeat;
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-sizing: border-box;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
          border-radius: 36px;
          outline: none;
          z-index: 100;
        }

        .filter-bar {
          display: flex;
          flex-direction: row;
          align-content: flex-end;
          margin: 1rem 0.5rem 0;
          font-size: 0.9rem;
        }
        .filter-bar .spacer {
          flex: 2;
        }

        .order-chooser {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .order-chooser li {
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
          color: rgba(0, 0, 0, 0.5);
          cursor: pointer;
        }
        .order-chooser li.active {
          background: rgba(0, 0, 0, 0.05);
          cursor: default;
        }
      `}</style>
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
