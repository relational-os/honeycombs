import React from "react";

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
  const { account, connect, disconnect } = useWallet();

  return (
    <div className="authentication">
      {account == undefined ? (
        <button onClick={() => connect()}>Connect Wallet</button>
      ) : (
        <>
          <button onClick={() => disconnect()} className="disconnect">
            <div style={{ fontSize: "1rem" }}>{getShortAddress(account)}</div>
            Disconnect Wallet
          </button>

          <NewBlockButton></NewBlockButton>
        </>
      )}

      <style jsx>
        {`
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
        `}
      </style>
    </div>
  );
};

export default ConnectWalletButton;
