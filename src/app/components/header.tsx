import React from "react";
import { useWallet } from "@gimmixfactory/use-wallet";
import Link from "next/link";

const Header = () => {
  const { account, connect, disconnect } = useWallet();
  console.log(account);
  return (
    <header>
      <Link href="/">
        <a>
          <h1>Honeycombs</h1>
        </a>
      </Link>
      <Link href="/write">
        <a>Write</a>
      </Link>
      {account == undefined ? (
        <button onClick={() => connect()}>Connect Wallet</button>
      ) : (
        <button onClick={() => disconnect()}>Disconnect Wallet</button>
      )}

      <style jsx>{`
        header {
          padding: 20px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
    </header>
  );
};

export default Header;
