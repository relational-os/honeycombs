import React from "react";

import Block from "@app/components/block";

import { useBlockStore } from "@app/features/state";

const IndexPage = () => {
  const blocks = useBlockStore((state) => state.blocks);

  return (
    <div className="index">
      {blocks.map((block, index) => {
        return <Block key={`block_${index}`} {...block}></Block>;
      })}

      <style jsx>{`
        .index {
        }
      `}</style>
    </div>
  );
};

export default IndexPage;
