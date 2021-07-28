import React from "react";

import { BlockView } from "./block";

const EditBlock = (view: BlockView) => {
	return (
		<div>
			<textarea className="context">{view.block.context}</textarea>
			<textarea className="content">{view.block.content}</textarea>
			<button>Save</button>
			<button>Cancel</button>

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
