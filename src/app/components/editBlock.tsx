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
        defaultValue={block.context}
        onChange={(e) => setContext(e.target.value)}
      ></textarea>
      <textarea
        className="content"
        defaultValue={block.content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <button className="cancel" onClick={handleEditCancelClick}>
        &#10005;
      </button>
      <div className="button-bar">
        <div></div>
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
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }
        textarea.context {
          height: 2.5rem;
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
          position: absolute;
          top: 1.6rem;
          right: 0;
          border: 0;
          outline: 0;
          background: transparent;
          width: 24px;
          height: 24px;
          font-size: 20px;
          cursor: pointer;
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
