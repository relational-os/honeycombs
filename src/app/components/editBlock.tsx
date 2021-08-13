import React, { useState } from "react";

import { EditBlockView } from "./block";

const EditBlock = (props: EditBlockView) => {
  const [content, setContent] = useState("");
  const [context, setContext] = useState("");

  const { block, handleEditSaveClick, handleEditCancelClick } = props;

  const saveBlock = () => {
    const block = {
      ...props.block,
      content: content,
      context: context,
    };

    handleEditSaveClick(block);
  };

  return (
    <div>
      <textarea
        className="context"
        placeholder="context"
        defaultValue={block.context}
        onChange={(e) => setContext(e.target.value)}
      ></textarea>
      <textarea
        className="content"
        placeholder="what are you thinking?"
        defaultValue={block.content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <div className="button-bar">
        <ul className="type-chooser">
          <li className="text active">Text</li>
          <li className="image">Image</li>
        </ul>
        <div></div>
        <button className="cancel" onClick={handleEditCancelClick}>
          Cancel
        </button>
        <button className="save" onClick={saveBlock}>
          Save
        </button>
      </div>

      <style jsx>{`
        textarea {
          width: calc(100% + 2rem);
          padding: 0.25rem 1rem;
          margin: 0 -1rem;
          border: none;
          outline: none;
        }
        textarea::placeholder {
          color: rgba(0, 0, 0, 0.3);
        }
        textarea.context {
          height: 2.5rem;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          margin-bottom: 0.4rem;
          font-style: italic;
          color: rgba(0, 0, 0, 0.5);
        }
        textarea.content {
          height: 7rem;
        }

        .button-bar {
          display: flex;
          flex-direction: row;
          align-content: flex-end;
        }
        .button-bar div {
          flex: 2;
        }

        .type-chooser {
          display: flex;
          flex-direction: row;
          align-items: center;
          font-size: 0.9rem;
        }
        .type-chooser li {
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
          color: rgba(0, 0, 0, 0.5);
          cursor: pointer;
        }
        .type-chooser li.active {
          background: rgba(0, 0, 0, 0.05);
          cursor: default;
        }

        button.save {
          padding: 0.5rem 1rem;
          background: linear-gradient(180deg, #4d9aff 0%, #006eff 100%), #006eff;
          color: #fff;
          border-radius: 36px;
          border: 0;
          outline: 0;
          cursor: pointer;
          flex-shrink: 0;
        }
        button.cancel {
          margin-right: 0.5rem;
          border: 0;
          outline: 0;
          background: transparent;
          cursor: pointer;
          color: rgba(0, 0, 0, 0.5);
        }

        @media screen and (max-width: 768px) {
          button.save {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
};

export default EditBlock;
