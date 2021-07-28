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
				<div className="post-toggle">
					<TogglePostInclude block={view.block}></TogglePostInclude>
				</div>
				<Avatar />
				<div className="header-metadata">
					<div>{view.block.creator}</div>
					<div>
						posted <TimeAgo datetime={view.block.datetime ? view.block.datetime : ""} />
					</div>
				</div>

				<div className="spacer"></div>

				<div className="header-controls">
					{!view.editing && <button className="edit-button">edit</button>}
				</div>
			</div>

			{view.editing ? (
				<EditBlock {...view}></EditBlock>
			) : (
				<div className="block-body">
					<div className="block-context">{view.block.context}</div>

					{view.block.type == "text" && (
						<p className="block-text">
							{view.block.content}
							{/* <pre>{JSON.stringify(view, null, 2)}</pre> */}
						</p>
					)}

					{view.block.type == "image" && (
						<img src={view.block.content} className="block-image" />
					)}
				</div>
			)}

			<style jsx>{`
				.block {
					padding-bottom: 1rem;
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
				.block-header .post-toggle {
					width: 24px;
					margin-left: -24px;
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
					outline: 0;
					border: 0;
					background: transparent;
					font-size: 1rem;
					color: #006eff;
					cursor: pointer;
				}
			`}</style>
		</div>
	);
};

export default Block;
