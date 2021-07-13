import React, {useState} from 'react';

const WritePage = () => {
  const [text, setText] = useState("");

  const onSubmit = () => {
    // console.log('our submitted text is:', text);
    setText("");
  }

  return (
    <div className="frame">
      <h1>Write</h1>

      <input value={text} onChange={event => setText(event.target.value)} className="write-input"></input>
      {text.trim().length > 0 && 
        <button onClick={onSubmit}>send</button>
      }
      <style jsx>{`
        .frame {
          padding: 20px;
        }
        .write-input {
            background-color: darkgray;
        }
      `}</style>
    </div>
  );
};

export default WritePage;
