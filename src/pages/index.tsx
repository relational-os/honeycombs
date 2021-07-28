import React from "react";

import Block from "@app/components/block";

import blocks from "@data/blocks.json";

const IndexPage = () => {
  return (
    <div className="index">
      {blocks.data.map((block, index) => {
        return <Block key={`block_${index}`} block={block}></Block>;
      })}

      <style jsx>{`
				.index {
				}
			`}</style>
    </div>
  );
};

export default IndexPage;
