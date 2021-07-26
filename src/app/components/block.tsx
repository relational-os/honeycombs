import React from "react";

import EditBlock from "./editBlock";
import TogglePostInclude from "./togglePostInclude";

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
    <div>
      <pre>{JSON.stringify(view, null, 2)}</pre>

      <TogglePostInclude block={view.block}></TogglePostInclude>

      {view.editing ? <EditBlock {...view}></EditBlock> : <div></div>}
    </div>
  );
};

export default Block;
