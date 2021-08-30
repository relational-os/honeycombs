import React, { useState } from "react";
import TimeAgo from "timeago-react";
import Image from "next/image";

import { OSBlock, RelationalOS } from "@relational-os/block-bridge";

import { useBlockStore } from "@app/features/state";

import EditBlock from "./editBlock";
import EditHistory from "./editHistory";
import TogglePostInclude from "./togglePostInclude";
import Avatar from "./avatar";
import { useWallet } from "@gimmixorg/use-wallet";
import { ENSName } from "react-ens-name";

export interface BlockView {
  uuid: string;
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
  const { provider } = useWallet();

  const updateBlock = useBlockStore.getState().updateBlock;
  const removeBlock = useBlockStore.getState().removeBlock;

  const [editing, setEditing] = useState(view.editing);
  const [collapsed, setCollapsed] = useState(view.collapsed);

  const toggleEditing = () => setEditing(!editing);
  const toggleCollapsed = () => setCollapsed(!collapsed);

  const handleEditCancelClick = () => {
    // remove the block from the view if the user has not saved it in any capacity
    view.ipfsComplete ? removeBlock(view) : toggleEditing();
  };

  const handleEditSaveClick = async (block: OSBlock) => {
    if (!provider) throw new Error("NO PROVIDER BUT SAVING A BLOCK");
    const os = new RelationalOS(provider);
    const tx = await os.newBlock(block, {
      IPFSUploadComplete: (hash: string) => {
        toggleEditing();
        updateBlock({
          ...view,
          ipfsComplete: true,
          block: block,
        });

        console.log(`IPFS HASH: ${hash}`);
      },
    });

    console.log("transaction submitted", tx);
    updateBlock({ ...view, txComplete: true });

    const receipt = await tx.wait(2);
    console.log("transaction confirmed");
    updateBlock({ ...view, txConfirmed: true });

    console.log(receipt);
    console.log(
      `hash: ${receipt.blockHash}, tokenID: ${
        // @ts-ignore
        receipt.events?.pop()?.args["tokenId"]
      }`
    );
  };

  return (
    <div className={editing ? "editing block" : "block"}>
      {/* Block Header */}
      <div className="block-header">
        <Avatar />
        <div className="header-metadata">
          <div className="author">
            <ENSName address={view.block.author}></ENSName>
          </div>
          <div>
            posted{" "}
            <TimeAgo
              datetime={view.block.datetime ? view.block.datetime : ""}
            />
          </div>
        </div>

        <div className="spacer"></div>

        <div className="header-controls">
          {/* History Button */}
          {!collapsed ? (
            <button className="history-button" onClick={toggleCollapsed}>
              <Image
                src="/assets/icon-history.svg"
                alt="history"
                width={12}
                height={12}
              />
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
          <div className="block-context">{view.block.context}</div>
          {view.block.type == "text" && (
            <p className="block-text">{view.block.content}</p>
          )}
          {view.block.type == "image" && (
            <a href={"https://ipfs.io/ipfs/" + view.block.content}>
              <img
                src={"https://ipfs.io/ipfs/" + view.block.content}
                className="block-image"
                alt="this blocks image"
              />
            </a>
          )}
        </div>
      )}

      {/* History Button */}
      {collapsed && !editing && (
        <>
          <div>
            {view.ipfsComplete ? (
              <span>IPFS</span>
            ) : (
              <span className="incomplete">incomplete ipfs</span>
            )}
            {view.txComplete ? (
              <span>tx received</span>
            ) : (
              <span className="incomplete">tx not here yet</span>
            )}
            {view.txConfirmed ? (
              <span>tx confirmed</span>
            ) : (
              <span className="incomplete">tx not confirmed yet</span>
            )}
          </div>
          <EditHistory {...view}></EditHistory>
        </>
      )}

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
          margin-bottom: 1rem;
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
          max-width: 10rem;
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
          padding: 0.25rem;
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

export default React.memo(Block);
