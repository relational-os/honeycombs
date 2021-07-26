import React from "react";

interface ButtonView {
  color: string;
  text: string;
  onClick: () => void;
}

const Button = (view: ButtonView) => {
  return (
    <div className="button">
      <style jsx>{`
        .button {
        }
      `}</style>
    </div>
  );
};

export default Button;
