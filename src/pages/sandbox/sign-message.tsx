import { useWallet } from '@gimmixfactory/use-wallet';
import React from 'react';

const IndexPage = () => {
  const { account, provider } = useWallet();

  const signMessage = async () => {
    if (!provider) throw new Error('not logged in!');
    const message = 'Hello!';
    const signature = await provider.getSigner().signMessage(message);
    console.log(signature);
    const response = await fetch('/api/verify-signature', {
      method: 'POST',
      body: JSON.stringify({ signature, message }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
    console.log(response);
  };

  return (
    <div className="index">
      {account ? (
        <button onClick={signMessage}>Sign Message</button>
      ) : (
        'Not logged in'
      )}
      <style jsx>{`
        .index {
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default IndexPage;
