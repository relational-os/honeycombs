import React from 'react';
import type { AppProps } from 'next/app';
import MainLayout from '@app/layouts/MainLayout';
import { useWallet } from '@gimmixfactory/use-wallet';
import Link from 'next/link';

function App({ Component, pageProps }: AppProps) {
  const { account, connect, disconnect } = useWallet();
  console.log(account);
  return (
    <MainLayout>
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
      </header>
      <Component {...pageProps} />
      <style jsx>{`
        header {
          padding: 20px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
    </MainLayout>
  );
}

export default App;
