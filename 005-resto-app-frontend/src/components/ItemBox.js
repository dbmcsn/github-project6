import axios from "axios";
import React from "react";
import "./ItemBox.css";

const ItemBox = ({
  id,
  name,
  price,
  image,
  showEditItemForm,
  editItem,
  dispatch,
  newItem,
}) => {
  return (
    <div className="Item">
      <div>
        <img src={image} alt="Image" className="icons" />
      </div>
      <div>
        <strong>{name}</strong>
        <p>
          <small>$ {price}</small>
        </p>
        <p>
          <button
            className="itemBtn"
            onClick={() =>
              axios
                .post("http://localhost:8888/api/cart/", {
                  id: id,
                  name: name,
                  price: price,
                  image: image,
                })
                .then((response) => {
                  dispatch({ type: "ADD_CART", payload: { id: id } });
                })
            }
          >
            Order
          </button>
          <br />
          {editItem || newItem ? (
            ""
          ) : (
            <button
              className="itemBtn"
              onClick={() => showEditItemForm(true, id)}
            >
              Edit
            </button>
          )}
          <br />
          <button
            className="itemBtn"
            onClick={() =>
              dispatch({ type: "DELETE_LIST", payload: { id: id } })
            }
          >
            Delete
          </button>
        </p>
      </div>
    </div>
  );
};

export default ItemBox;
