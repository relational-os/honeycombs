import React, { useEffect, useState } from "react";
import TimeAgo from "timeago-react";
// import { useWallet } from "@gimmixfactory/use-wallet";

import { OSBlock, RelationalOS } from "@relational-os/block-bridge";

import EditBlock from "./editBlock";
import EditHistory from "./editHistory";
import TogglePostInclude from "./togglePostInclude";
import Avatar from "./avatar";
import { useWallet } from "@gimmixfactory/use-wallet";

export interface BlockView {
  editing?: boolean;
  collapsed?: boolean;
  ipfsComplete?: boolean;
  txComplete?: boolean;
  txConfirmed?: boolean;
  block: OSBlock;
}

export interface EditBlockView extends BlockView {
  handleEditSaveClick: (block: OSBlock) => void;
  handleEditCancelClick: () => void;
}

const Block = (view: BlockView) => {
  console.log(`block text ${view.block.content}, editing: ${view.editing}`);

  const { provider } = useWallet();

  const [block, setBlock] = useState(view.block);
  const [editing, setEditing] = useState(view.editing);
  const [collapsed, setCollapsed] = useState(view.collapsed);

  const [ipfsComplete, setIPFSComplete] = useState(view.ipfsComplete);
  const [txComplete, setTxComplete] = useState(view.txComplete);
  const [txConfirmed, setTxConfirmed] = useState(view.txConfirmed);

  const toggleEditing = () => setEditing(!editing);
  const toggleCollapsed = () => setCollapsed(!collapsed);

  const handleEditSaveClick = async (block: OSBlock) => {
    console.log("saved", block);

    if (!provider) throw new Error("NO PROVIDER BUT SAVING A BLOCK");
    const os = new RelationalOS(provider);
    const tx = await os.newBlock(block, {
      IPFSUploadComplete: (hash: string) => {
        setIPFSComplete(true);
        setBlock(block);
        toggleEditing();

        console.log(`IPFS HASH: ${hash}`);
      },
    });

    console.log("transaction submitted", tx);
    setTxComplete(true);

    const receipt = await tx.wait(2);
    console.log("transaction confirmed");
    setTxConfirmed(true);

    console.log(receipt);
    console.log(
      `hash: ${receipt.blockHash}, tokenID: ${
        // @ts-ignore
        receipt.events?.pop()?.args["tokenId"]
      }`
    );
  };
  const handleEditCancelClick = () => toggleEditing();

  useEffect(() => {
    setBlock(view.block);
    setEditing(view.editing);
    setCollapsed(view.collapsed);
    setIPFSComplete(view.ipfsComplete);
    setTxComplete(view.txComplete);
    setTxConfirmed(view.txConfirmed);
  }, [view]);

  return (
    <div className={editing ? "editing block" : "block"}>
      {/* Block Header */}
      <div className="block-header">
        <Avatar />
        <div className="header-metadata">
          <div className="author">
            {view.block.creator ? view.block.creator : "test.eth"}
          </div>
          <div>
            posted{" "}
            <TimeAgo
              datetime={view.block.datetime ? view.block.datetime : ""}
            />
          </div>
          <div>
            {ipfsComplete ? (
              <span>IPFS</span>
            ) : (
              <span className="incomplete">incomplete ipfs</span>
            )}
            {txComplete ? (
              <span>tx received</span>
            ) : (
              <span className="incomplete">tx not here yet</span>
            )}
            {txConfirmed ? (
              <span>tx confirmed</span>
            ) : (
              <span className="incomplete">tx not confirmed yet</span>
            )}
          </div>
        </div>

        <div className="spacer"></div>

        <div className="header-controls">
          {/* History Button */}
          {!collapsed ? (
            <button className="history-button" onClick={toggleCollapsed}>
              <img src="/assets/icon-history.svg" />
            </button>
          ) : (
            <>
              <button className="history-button" onClick={toggleCollapsed}>
                &#10005;
              </button>
            </>
          )}
          {!editing && (
            <>
              <button className="edit-button" onClick={toggleEditing}>
                Edit
              </button>
              <div className="post-toggle">
                <TogglePostInclude block={view.block}></TogglePostInclude>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Content Display Block */}
      {editing ? (
        <EditBlock
          {...view}
          handleEditSaveClick={handleEditSaveClick}
          handleEditCancelClick={handleEditCancelClick}
        ></EditBlock>
      ) : (
        <div className="block-body">
          <div className="block-context">{block.context}</div>
          {block.type == "text" && (
            <p className="block-text">{block.content}</p>
          )}
          {block.type == "image" && (
            <img src={block.content} className="block-image" />
          )}
        </div>
      )}

      {/* History Button */}
      {collapsed && <EditHistory {...view}></EditHistory>}

      <style jsx>{`
        .block {
          position: relative;

          padding: 0 1rem 1rem;
          border-radius: 8px;
        }

        .block::after {
          content: "";
          display: block;
          margin-top: 1.5rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          width: calc(100% - 2rem;);
        }

        .block.editing {
          background: #fff;
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
          border: none;
        }

        .block.new {
          background: #fff6e8;
        }

        .block.editing::after,
        .block.new::after {
          display: none;
        }

        .block-header {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          margin: 0 0 0;
          padding: 1rem 0 0.75rem;
          box-sizing: border-box;
        }
        .block-header .header-metadata {
          margin-left: 0.5rem;
        }
        .block-header .header-metadata .author {
          max-width: 6rem;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: bold;
        }
        .block-header .header-metadata div:last-child {
          margin-top: -0.2rem;
          font-size: 0.9rem;
          color: rgba(0, 0, 0, 0.3);
        }

        .block-header .header-controls {
          display: flex;
          flex-direction: row;
        }

        .block-header .post-toggle {
          margin-left: 0.75rem;
        }
        @media screen and (max-width: 768px) {
          .block-header .post-toggle {
            margin-left: -12px;
          }
        }
        .block-header .spacer {
          flex-grow: 2;
          height: 2rem;
        }

        .block-context {
          padding: 0.5rem 1rem;
          font-style: italic;
          color: rgba(0, 0, 0, 0.3);
        }

        .block-image {
          max-width: 100%;
        }

        .edit-button {
          padding: 0.25rem 0.5rem;
          outline: 0;
          background: rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-sizing: border-box;
          border-radius: 6px;
          font-size: 0.9rem;
          cursor: pointer;
        }

        .history-button {
          width: 2rem;
          margin-right: 0.4rem;
          padding: 0.25rem 0;
          outline: 0;
          background: rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-sizing: border-box;
          border-radius: 6px;
          font-size: 0.9rem;
          cursor: pointer;
          line-height: 0.9rem;
          text-align: center;
        }

        .editing .history-button {
          display: none;
        }

        span {
          margin-right: 0.25rem;
          background-color: #a4ffc7;
        }

        .incomplete {
          background-color: #ffe5d5;
        }
      `}</style>
    </div>
  );
};

export default Block;
