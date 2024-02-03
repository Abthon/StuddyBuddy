import React from "react";
import "../static/Modal.css";
import { useState } from "react";
import TagInput from "./TagInput";

const Modal = ({ open, setModalStatus }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);


  const handleAddItem = () => {
    if (inputValue.trim() !== "") {
      setSelectedItems([...selectedItems, inputValue]);
      setInputValue("");
    }
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...selectedItems];
    updatedItems.splice(index, 1);
    setSelectedItems(updatedItems);
  };
  if (!open) return null;
  return (
    <>
      <section className="overlay">
        <div className="modalContainer">
          <div className="modal-left">
            <input type="text" placeholder="Room name" />
            <TagInput/>
            <input type="text" placeholder="Description" />
            <input type="text" placeholder="Category" />
            <input type="date" />
            <input type="submit" value="Create Room" />
          </div>
          <div className="modal-right">
            <i onClick={() => setModalStatus(false)} className="material-icons">
              close
            </i>
          </div>
        </div>
      </section>
    </>
  );
};

export default Modal;
