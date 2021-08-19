import React, { useEffect, useState } from "react";

import { useWallet } from "@gimmixfactory/use-wallet";
import NewBlockButton from "./newBlockButton";

// TODO: move to some sort of utils dir?
const getShortAddress = (address: string) => {
  return (
    address?.slice(0, 6) +
    "..." +
    address?.slice(address.length - 4, address.length)
  );
};

const ConnectWalletButton = () => {
  const { account, provider, connect, disconnect } = useWallet();

  const [network, setNetwork] = useState("");

  useEffect(() => {
    if (provider) {
      provider.getNetwork().then((n) => {
        if (n.chainId == 1) setNetwork("mainnet");
        else setNetwork(n.name);
      });
    }
  });

  return (
    <div className="authentication">
      {account == undefined ? (
        <button onClick={() => connect()}>Connect Wallet</button>
      ) : (
        <>
          <button onClick={() => disconnect()} className="disconnect">
            <div style={{ fontSize: "1rem" }}>{getShortAddress(account)}</div>
            <b>Disconnect Wallet</b>
            <div className="center-flex">
              <span className="dot"></span>
              <div style={{ marginRight: ".5rem", fontSize: "1rem" }}>
                network: {network}
              </div>
            </div>
          </button>

          <NewBlockButton></NewBlockButton>
        </>
      )}

      <style jsx>
        {`
          .center-flex {
            display: flex;
            align-items: center;
          }

          .authentication {
            position: fixed;
            top: 1rem;
            right: 1rem;
          }

          button {
            padding: 0.5rem 1rem;
            background: linear-gradient(180deg, #4d9aff 0%, #006eff 100%),
              #006eff;
            color: #fff;
            border-radius: 36px;
            border: 0;
            outline: 0;
            cursor: pointer;
            font-size: 18px;
          }

          button.disconnect {
            position: fixed;
            bottom: 1rem;
            left: 1rem;
            background: transparent;
            color: #666;
          }

          @media screen and (max-width: 768px) {
            .authentication {
              top: auto;
              bottom: 1.5rem;
              right: 1rem;
              z-index: 111;
            }
          }

          .dot {
            height: 0.5rem;
            width: 0.5rem;
            background-color: ${network == "rinkeby" ? "#0f0" : "#f00"};
            border-radius: 50%;
            display: inline-block;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
            margin-right: 0.5rem;
          }
        `}
      </style>
    </div>
  );
};

export default ConnectWalletButton;
