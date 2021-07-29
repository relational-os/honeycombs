import React from "react";

import { useWallet } from "@gimmixfactory/use-wallet";

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

          <div className="newButton">
            <span>+</span>
            <ul>
              <li>Text</li>
              <li>Image</li>
            </ul>
          </div>
        </>
      )}

      <style jsx>
        {`
          .authentication {
            position: fixed;
            top: 1rem;
            right: 1rem;
          }

          .newButton {
            position: relative;
            height: 3rem;
            width: 3rem;
            background: linear-gradient(180deg, #4d9aff 0%, #006eff 100%),
              #006eff;
            text-align: center;
            border-radius: 100%;
            transition: color 0.15s ease-in-out;
            cursor: pointer;
          }

          .newButton > span {
            color: #fff;
            font-size: 2rem;
            line-height: 2.8rem;
          }

          .newButton:hover ul {
            display: block;
          }

          .newButton ul {
            display: none;
            position: absolute;
            width: 5rem;
            top: 3em;
            left: -1rem;
            padding: 0.35rem 0;
            text-align: center;
          }

          .newButton ul li {
            padding: 0 0.25rem;
          }

          .newButton ul li:hover {
            color: #006eff;
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
            nav,
            .authentication {
              position: absolute;
            }

            nav ul {
              display: flex;
            }

            nav ul li {
              margin-right: 1rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ConnectWalletButton;
