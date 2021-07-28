import React, { useState } from "react";

const WritePage = () => {
  const [text, setText] = useState("");
  const [blockHash, setBlockHash] = useState(null);

  const onSubmit = async () => {
    console.log("our submitted text is:", text);

    let targetBlock = {
      text: text,
      // "author": ""
    };

    try {
      let uploadURL = `${process.env.NEXT_PUBLIC_IPFS_TARGET}/uploadJSON`;
      console.log("pushing to", uploadURL);

      // upload to our IPFS bridge
      const bridgeResponse = await fetch(uploadURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(targetBlock),
      }).then((res) => {
        return res.json();
      });

      console.log("brdigeResponse", bridgeResponse);
      setBlockHash(bridgeResponse.hash);
    } catch (error) {
      console.log("error", error);
    }

    // on success
    setText("");
  };

  return (
    <div className="frame">
      <h1>Write</h1>

      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        className="write-input"
      ></input>

      {text.trim().length > 0 && (
        <button className="post-button" onClick={onSubmit}>
          post
        </button>
      )}

      <div className="block-target">
        {!!blockHash && (
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://ipfs.io/ipfs/${blockHash}`}
          >
            published block
          </a>
        )}
      </div>

      <style jsx>{`
        .frame {
          padding: 20px;
        }
        .write-input {
          background-color: darkgray;
        }
        .block-target {
          margin-top: 1rem;
        }
        .post-button {
          margin-left: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default WritePage;
