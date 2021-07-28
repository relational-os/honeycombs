import React from "react";

import { editBlockView } from "./block";

const EditBlock = (props: editBlockView) => {
  const {block, handleEditSaveClick, handleEditCancelClick} = props;
	return (
		<div>
			<textarea className="context">{block.context}</textarea>
			<textarea className="content">{block.content}</textarea>
			<button onClick={handleEditSaveClick}>Save</button>
			<button onClick={handleEditCancelClick}>Cancel</button>

			<style jsx>{`
				textarea {
					width: 100%;
				}
				textarea.content {
					height: 7rem;
				}
			`}</style>
		</div>
	);
};

export default EditBlock;
