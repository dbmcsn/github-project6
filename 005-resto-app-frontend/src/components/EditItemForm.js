import React, { useState } from "react";

const EditItemForm = ({ details, saveChanges, hideEditItemForm }) => {
  const [editItem, setEditItem] = useState({
    id: details.id,
    name: details.name,
    price: details.price,
    category: details.category,
    image: details.image,
  });


  const onChange = (e) => {
    const inputName = e.target.name;

    switch (inputName) {
      case "name":
        setEditItem({
          ...editItem,
          name: e.target.value,
        });
        break;
      case "price":
        setEditItem({
          ...editItem,
          price: Number(e.target.value),
        });
        break;
      case "category":
        setEditItem({
          ...editItem,
          category: e.target.value,
        });
        break;
      case "image":
        setEditItem({
          ...editItem,
          image: e.target.value,
        });
        break;
      default:
        break;
    }
  };

  const onEditItem = (e) => {
    e.preventDefault();
    saveChanges(editItem);
  };
  const hideForm = (e) => {
    e.preventDefault();
    hideEditItemForm(false);
  };
  
  return (
    <div>
      <form>
        <label>Item Name: </label>
        <input
          name="name"
          value={editItem.name}
          type="text"
          onChange={onChange}
        />
        <br />
        <label>Item Price: </label>
        <input
          name="price"
          value={editItem.price}
          type="number"
          onChange={onChange}
        />
        <br />
        <label>Item Category: </label>
        <input
          name="category"
          value={editItem.category}
          type="text"
          onChange={onChange}
        />
        <br />
        <label>Item Image: </label>
        <input
          name="image"
          value={editItem.image}
          type="text"
          onChange={onChange}
        />
        <br />
        <input name="id" value={editItem.id} type="hidden" />
        <button className="submit-btn" onClick={onEditItem}>
          Edit Item
        </button>
        <button className="cancel-btn" onClick={hideForm}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditItemForm;
