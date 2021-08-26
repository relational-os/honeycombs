import create from "zustand";

import { BlockView } from "@app/components/block";

export type BlockStore = {
  blocks: BlockView[];
  setBlocks: (blocks: BlockView[]) => void;
  updateBlock: (block: BlockView) => void;
  removeBlock: (block: BlockView) => void;
  prependBlocks: (blocks: BlockView[]) => void;
  appendBlocks: (blocks: BlockView[]) => void;
  clearBlocks: () => void;
};

export const useBlockStore = create<BlockStore>((set, get) => ({
  blocks: [],
  // blocks: testBlocks,
  setBlocks: (blocks: BlockView[]) => {
    set(() => {
      blocks: blocks;
    });
  },
  updateBlock: (block: BlockView) => {
    var blocks = get().blocks;
    const index = blocks.findIndex((b) => b.uuid == block.uuid);
    blocks[index] = block;

    set((state) => ({
      blocks: [...blocks],
    }));
  },
  removeBlock: (block: BlockView) => {
    var blocks = get().blocks;
    const index = blocks.findIndex((b) => b.uuid == block.uuid);
    blocks.splice(index, 1);

    set((state) => ({
      blocks: [...blocks],
    }));
  },
  prependBlocks: (blocks: BlockView[]) => {
    set((state) => ({
      blocks: [...blocks, ...state.blocks],
    }));
  },
  appendBlocks: (blocks: BlockView[]) => {
    set((state) => ({
      blocks: [...state.blocks, ...blocks],
    }));
  },
  clearBlocks: (): void => {
    set((state) => ({
      blocks: [],
    }));
  },
}));
