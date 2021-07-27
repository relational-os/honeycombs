import React from "react";
import TimeAgo from "timeago-react";

import EditBlock from "./editBlock";
import TogglePostInclude from "./togglePostInclude";
import Avatar from "./avatar";

export type BlockType = {
	parent: BlockType | null;
	creator: string;
	datetime?: string;
	type: string;
	context: string;
	content: string;
};

export interface BlockView {
	block: BlockType;
	collapsed: boolean;
	editing: boolean;
}

const Block = (view: BlockView) => {
	return (
		<div className="block">
			<div className="block-header">
				<Avatar />
				<div className="header-metadata">
					<div>{view.block.creator}</div>
					<div>
						posted <TimeAgo datetime={view.block.datetime} />
					</div>
				</div>

				<div className="spacer"></div>

				<div className="header-controls">edit</div>
			</div>

			<div className="block-context">{view.block.context}</div>

			<pre>{JSON.stringify(view, null, 2)}</pre>

			<TogglePostInclude block={view.block}></TogglePostInclude>

			{view.editing ? <EditBlock {...view}></EditBlock> : <div></div>}

			<style jsx>{`
				.block {
					margin-bottom: 2rem;
					border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
				.block-header .header-metadata div:last-child {
					margin-top: -0.2rem;
					font-size: 0.9rem;
					color: rgba(0, 0, 0, 0.3);
				}

				.block-header .spacer {
					flex-grow: 2;

					height: 2rem;
				}

				.block-context {
					padding: 1rem;
					font-style: italic;
					color: rgba(0, 0, 0, 0.3);
				}
			`}</style>
		</div>
	);
};

export default Block;
