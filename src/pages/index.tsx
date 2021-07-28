import React from "react";

import Block from "@app/components/block";

import blocks from "@data/blocks.json";

const IndexPage = () => {
	return (
		<div className="index">
			{blocks.data.map((block) => {
				return <Block block={block} collapsed={false} editing={false}></Block>;
			})}

			<style jsx>{`
				.index {
				}
			`}</style>
		</div>
	);
};

export default IndexPage;
