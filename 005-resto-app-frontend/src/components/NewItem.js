import React, { useState } from "react";

const NewItem = ({ dispatch, hideNewItemForm }) => {
  const [item, setItem] = useState({
    name: "",
    price: 0,
    category: "",
    image: "",
  });

  const onChange = (e) => {
    const inputName = e.target.name;

    switch (inputName) {
      case "name":
        setItem({
          ...item,
          name: e.target.value,
        });
        break;
      case "price":
        setItem({
          ...item,
          price: e.target.value,
        });
        break;
      case "category":
        setItem({
          ...item,
          category: e.target.value,
        });
        break;
      case "image":
        setItem({
          ...item,
          image: e.target.value,
        });
        break;
      default:
        break;
    }
  };

  const onSubmitItem = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_NEW_ITEM', payload: {newItem: item}})
  };
  
  const cancelItem = (e) => {
    e.preventDefault();
    hideNewItemForm(false);
  };

  return (
    <div>
      <form>
        <label>Item Name: </label>
        <input name="name" type="text" onChange={onChange} />
        <br />
        <label>Item Price: </label>
        <input name="price" type="number" onChange={onChange} />
        <br />
        <label>Item Category: </label>
        <input name="category" type="text" onChange={onChange} />
        <br />
        <label>Item Image: </label>
        <input name="image" type="text" onChange={onChange} />
        <br />
        <button className="submit-btn" onClick={onSubmitItem}>
          Submit
        </button>
        <button className="cancel-btn" onClick={cancelItem}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default NewItem;
