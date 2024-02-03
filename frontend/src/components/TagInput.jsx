import React, { useState } from 'react';
import '../static/TagInput.css';

const TagInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTag = () => {
    if (inputValue.trim() !== '') {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveTag = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };

  return (
    <div className="tag-input-container">
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add your channels"
          className="tag-input"
          style={{backgroundColor:"transparent", outline:"none"}}
        />
        <button style={{backgroundColor:"#70baaf", border:"none", borderRadius:"3px", cursor:"pointer", boxShadow: "3px 3px 0px 0px #000"}}onClick={handleAddTag} className="add-button">
          Add
        </button>
      </div>

      <div className="tags-container">
        {tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
            <button style={{marginRight:"-4px"}} onClick={() => handleRemoveTag(tag)} className="remove-button">
             <span style={{padding:"1px", fontWeight:"bold"}}>X</span>
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
