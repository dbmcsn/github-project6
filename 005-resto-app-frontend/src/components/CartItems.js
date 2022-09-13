import React from "react";
import styled from "styled-components";

const DecBtn = styled.button`
  margin-right: 5px;
  background-color: #b0c4de;
  border-radius: 5px;
  padding: 0.5rem;
  margin: 0.1rem;
  border: grey;
  color: white;
  cursor: pointer;
`;

const IncBtn = styled.button`
  background-color: #b0c4de;
  border-radius: 5px;
  padding: 0.5rem;
  margin: 0.1rem;
  border: grey;
  color: white;
  cursor: pointer;
`;

const DeleteBtn = styled.button`
  background-color: #cc6666;
  border-radius: 5px;
  padding: 0.5rem;
  margin: 0.1rem;
  border: grey;
  color: white;
  cursor: pointer;
`;

const CartItems = ({ name, price, image, quantity, dispatch, id }) => {
  return (
    <div className="Item">
      <div>
        <img src={image} alt="item" className="icons" />
      </div>
      <div>
        <strong>{name}</strong>
        <p>
          <small>Php {price}</small>
        </p>
        <p>
          <small>Quantity: {quantity}</small>
        </p>
        <div>
          <DecBtn
            onClick={() =>
              dispatch({
                type: "UPDATE_QUANTITY",
                payload: { method: "DECREMENT", id: id },
              })
            }
          >
            {" "}
            -{" "}
          </DecBtn>
          <IncBtn
            onClick={() =>
              dispatch({
                type: "UPDATE_QUANTITY",
                payload: { method: "INCREMENT", id: id },
              })
            }
          >
            {" "}
            +{" "}
          </IncBtn>
        </div>
        <p>
          <small>
            Subtotal:
            <br /> Php {price * quantity}
          </small>
        </p>
        <p>
          <DeleteBtn
            onClick={() =>
              dispatch({ type: "DELETE_CART_ITEM", payload: { id: id } })
            }
          >
            {" "}
            Delete Item{" "}
          </DeleteBtn>
        </p>
      </div>
    </div>
  );
};

export default CartItems;
