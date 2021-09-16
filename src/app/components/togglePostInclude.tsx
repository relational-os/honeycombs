import { OSBlock } from "@relational-os/block-bridge";
import React, { useState } from "react";

interface TogglePostIncludeView {
  block: OSBlock;
  checked?: boolean;
}

const TogglePostInclude = (view: TogglePostIncludeView) => {
  const [checked, setChecked] = useState(false);

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
