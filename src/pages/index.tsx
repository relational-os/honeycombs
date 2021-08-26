import React from "react";

import Block from "@app/components/block";

import { useBlockStore, BlockStore } from "@app/features/state";

const blockSelector = (state: BlockStore) => state.blocks;

const IndexPage = () => {
  const blocks = useBlockStore(blockSelector);

  return (
    <div className="index">
      {blocks.map((block) => {
        return <Block key={block.uuid} {...block}></Block>;
      })}

      <style jsx>{`
        .index {
        }
      `}</style>
    </div>
  );
};

export default IndexPage;
