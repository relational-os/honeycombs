import React from "react";

interface ButtonView {
  color: string;
  text: string;
  onClick: () => void;
}

const Button = (view: ButtonView) => {
  return (
    <button>
      <style jsx>{`
        button {
          background: linear-gradient(180deg, #4D9AFF 0%, #006EFF 100%), #006EFF;
          border-radius: 36px;
        }
      `}</style>
    </button>
  );
};

export default Button;
