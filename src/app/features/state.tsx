import create from "zustand";

import { BlockView } from "@app/components/block";

type BlockStore = {
  blocks: BlockView[];
  setBlocks: (blocks: BlockView[]) => void;
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
