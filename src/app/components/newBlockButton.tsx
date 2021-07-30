import { useBlockStore } from "@app/features/state";
import { useWallet } from "@gimmixfactory/use-wallet";
import React from "react";
import { BlockView } from "./block";

const NewBlockButton = () => {
  const { account } = useWallet();
  const prependBlock = useBlockStore((state) => state.prependBlocks);

  const createNewBlock = (type: string) => {
    var block: BlockView = {
      block: {
        creator: account,
        type: type,
      },
      editing: true,
    };

    // console.log("prepending", block);

    prependBlock([block]);
    // clear();
  };

  return (
    <div className="newButton">
      <span>+</span>
      <ul>
        <li onClick={() => createNewBlock("text")}>Text</li>
        <li onClick={() => createNewBlock("image")}>Image</li>
      </ul>

      <style jsx>{`
        .newButton {
          position: relative;
          height: 3rem;
          width: 3rem;
          background: linear-gradient(180deg, #4d9aff 0%, #006eff 100%), #006eff;
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
          background: #fff;
        }

        .newButton ul li:hover {
          color: #006eff;
        }

        @media screen and (max-width: 768px) {
          .newButton ul {
            bottom: 3em;
            top: auto;
            left: -1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default NewBlockButton;
