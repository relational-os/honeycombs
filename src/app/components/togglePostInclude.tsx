import React, { useState } from "react";
import { BlockType } from "./block";

interface TogglePostIncludeView {
  block: BlockType;
  checked?: boolean;
}

const TogglePostInclude = (view: TogglePostIncludeView) => {
  const [checked, setChecked] = useState(false);

  console.log(checked);

  return (
    <div className="togglepostinclude">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      ></input>
      <style jsx>{`
        .togglepostinclude {
        }
      `}</style>
    </div>
  );
};

export default TogglePostInclude;
