import React from "react";

import Block from "@app/components/block";

import blocks from "@data/blocks.json";

const IndexPage = () => {
  return (
    <div className="index">
      <h1>test</h1>

      {blocks.data.map((block, i) => {
        return (
          <Block
            key={i}
            block={block}
            collapsed={false}
            editing={false}
          ></Block>
        );
      })}

      <style jsx>{`
        .index {
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default IndexPage;
