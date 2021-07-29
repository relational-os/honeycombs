import React from "react";

import { editBlockView } from "./block";

const EditBlock = (props: editBlockView) => {
	const { block, handleEditSaveClick, handleEditCancelClick } = props;
	return (
		<div>
			<textarea className="context">{block.context}</textarea>
			<textarea className="content">{block.content}</textarea>

			<button className="cancel" onClick={handleEditCancelClick}>
				&#10005;
			</button>
			<div className="button-bar">
				<div></div>
				<button className="save" onClick={handleEditSaveClick}>
					Save
				</button>
			</div>

			<style jsx>{`
				textarea {
					width: 100%;
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
			`}</style>
		</div>
	);
};

export default EditBlock;
