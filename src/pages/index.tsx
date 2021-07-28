import React from "react";

import Block from "@app/components/block";

import blocks from "@data/blocks.json";

import {v4 as uuidv4} from 'uuid';

const IndexPage = () => {
	return (
		<div className="index">
			{blocks.data.map((block) => {
        let tempID = uuidv4();
        console.log('tempID', tempID)
				return <Block key={tempID} block={block} collapsed={false} editing={false}></Block>;
			})}

			<style jsx>{`
				.index {
				}
			`}</style>
		</div>
	);
};

export default IndexPage;
