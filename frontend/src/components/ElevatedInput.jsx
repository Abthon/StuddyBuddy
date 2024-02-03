import React, { useState } from 'react';
import '../static/ElevatedInput.css'; 

const ElevatedInput = ({sendJsonMessage}) => {
  const [inputValue, setInputValue] = useState('');

  const onSendMessage = (e)=>{
    console.log(inputValue)
    e.preventDefault();
    sendJsonMessage({type : "message", inputValue})
    setInputValue("");
  }

  return (
    <form className="elevated-input-container" onSubmit={(e)=> onSendMessage(e)}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="elevated-input"
        placeholder="Type something..."
      />
    </form>
  );
};


export default ElevatedInput;
