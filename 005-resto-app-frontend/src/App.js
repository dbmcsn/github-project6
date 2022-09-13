import "./App.css";
import React, { useReducer, useEffect } from "react";
import ItemBox from "./components/ItemBox";
import FilterCartItem from "./components/FilterCartItem";
import NewItem from "./components/NewItem";
import { v4 as uuidv4 } from "uuid";
import EditItemForm from "./components/EditItemForm";
import CartItems from "./components/CartItems";
import axios from "axios";

const initialState = {
  items: [],
  cartItems: [],
  category: "",
  newItem: false,
  editItem: false,
  editItemDetail: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, category: action.payload.category };
    case "ADD_CART":
      let updatedCart = [];
      const targetItem = state.cartItems.filter(
        (item) => item.id === action.payload.id
      );
      if (targetItem.length > 0) {
        updatedCart = state.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        let newItem = state.items.filter(
          (item) => item.id === action.payload.id
        );
        newItem = Object.assign({}, ...newItem);

        const item = {
          ...newItem,
          quantity: 1,
        };
        updatedCart = [...state.cartItems, { ...item }];
      }
      return { ...state, cartItems: updatedCart };
    case "DELETE_LIST":
      const deleteList = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      const deleteList2 = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      return { ...state, items: deleteList, cartItems: deleteList2 };
    case "UPDATE_QUANTITY":
      let updatedCarts = [];
      if (action.payload.method === "INCREMENT") {
        updatedCarts = state.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else if (action.payload.method === "DECREMENT") {
        let removeFlag = false;
        updatedCarts = state.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            if (item.quantity - 1 > 0) {
              return { ...item, quantity: item.quantity - 1 };
            }
            removeFlag = true;
            return item;
          }
          return item;
        });
        if (removeFlag === true) {
          updatedCarts = updatedCarts.filter(
            (item) => item.id !== action.payload.id
          );
        }
      }
      return { ...state, cartItems: updatedCarts };
    case "DELETE_CART_ITEM":
      const deleteItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      return { ...state, cartItems: deleteItem };
    case "TOGGLE_NEW_ITEM":
      return { ...state, newItem: action.payload.flag };
    case "TOGGLE_EDIT_ITEM":
      return { ...state, editItem: action.payload.flag };
    case "ADD_NEW_ITEM":
      const item = {
        id: uuidv4(),
        ...action.payload.newItem,
      };
      return { ...state, items: [...state.items, item], newItem: false };
    case "EDIT_ITEM_DETAIL":
      const itemDetails = state.items.filter(
        (item) => item.id === action.payload.id
      );
      return {
        ...state,
        editItemDetail: itemDetails,
        editItem: action.payload.flag,
      };
    case "SAVE_CHANGES":
      const updatedDetail = state.items.map((item) => {
        if (item.id === action.payload.item.id) {
          return action.payload.item;
        }
        return item;
      });
      const updatedCartItems = state.cartItems.map((item) => {
        if (item.id === action.payload.item.id) {
          return { ...action.payload.item, quantity: item.quantity };
        }
        return item;
      });
      return {
        ...state,
        items: updatedDetail,
        editItem: false,
        cartItems: updatedCartItems,
      };
    case "LOAD_ITEMS": {
      return {
        ...state,
        items: action.payload,
      };
    }

    case "LOAD_CART_ITEMS": {
      return {
        ...state,
        cartItems: action.payload,
      };
    }

    default:
      throw Error("Invalid Action Type" + action.type);
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showEditItemForm = (status, id) => {
    dispatch({ type: "EDIT_ITEM_DETAIL", payload: { id: id, flag: status } });
  };

  const categories = state.items.reduce((categories, item) => {
    if (!categories.includes(item.category)) {
      categories.push(item.category);
    }
    return categories;
  }, []);

  const filterCategory = (category) => {
    dispatch({ type: "SET_CATEGORY", payload: { category: category } });
  };

  let filteredItems =
    state.category === ""
      ? state.items
      : state.items.filter((item) => {
          return item.category === state.category;
        });

  const listItems =
    filteredItems.length === 0 ? (
      <p>No item available.</p>
    ) : (
      filteredItems.map((item, index) => (
        //data transformation
        <ItemBox
          showEditItemForm={showEditItemForm}
          editItem={state.editItem}
          dispatch={dispatch}
          key={index}
          id={item.id}
          name={item.name}
          price={item.price}
          image={item.image}
          newItem={state.newItem}
        />
      ))
    );

  const listCartItems = state.cartItems.map((item, index) => (
    <CartItems
      dispatch={dispatch}
      key={index}
      id={item.id}
      name={item.name}
      price={item.price}
      image={item.image}
      quantity={item.quantity}
    />
  ));

  const showAddItemForm = () => {
    state.newItem
      ? dispatch({ type: "TOGGLE_NEW_ITEM", payload: { flag: false } })
      : dispatch({ type: "TOGGLE_NEW_ITEM", payload: { flag: true } });
  };

  const hideNewItemForm = (status) => {
    state.editItem
      ? dispatch({ type: "TOGGLE_NEW_ITEM", payload: { flag: status } })
      : dispatch({ type: "TOGGLE_NEW_ITEM", payload: { flag: status } });
  };

  const hideEditItemForm = (status) => {
    state.editItem
      ? dispatch({ type: "TOGGLE_EDIT_ITEM", payload: { flag: status } })
      : dispatch({ type: "TOGGLE_EDIT_ITEM", payload: { flag: status } });
  };

  const saveChanges = (i) => {
    dispatch({ type: "SAVE_CHANGES", payload: { item: i } });
  };

  const getCartTotal = () => {
    let cartTotal = 0;
    state.cartItems.map((item) => {
      cartTotal += item.price * item.quantity;
    });
    return cartTotal;
  };

  const totalAmount = getCartTotal();

  useEffect(() => {
    axios.get("http://localhost:8888/api/item").then((response) => {
      dispatch({
        type: "LOAD_ITEMS",
        payload: response.data.items,
      });
      dispatch({
        type: "LOAD_CART_ITEMS",
        payload: response.data.cart,
      });
    });
  }, []);

  return (
    <>
      <div>
        <img
          src={
            "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ff35ed23-263a-4826-bc0d-18f44343d35c/dcx0b6b-37f96ef0-7d78-4557-a377-f9a581d9354b.png/v1/fill/w_1280,h_342,strp/krusty_krab_pizza_logo_little_caesars_ver_by_cristiandarkradx2496_dcx0b6b-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzQyIiwicGF0aCI6IlwvZlwvZmYzNWVkMjMtMjYzYS00ODI2LWJjMGQtMThmNDQzNDNkMzVjXC9kY3gwYjZiLTM3Zjk2ZWYwLTdkNzgtNDU1Ny1hMzc3LWY5YTU4MWQ5MzU0Yi5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.fG_SOJfWZHC_KnGnTHCHmh2xjzhFcZJF6t3SOWaDrqs"
          }
          alt="Krusty Krab"
          className="KKrab"
        />{" "}
      </div>
      <div>
        {state.newItem && !state.editItem ? (
          <NewItem dispatch={dispatch} hideNewItemForm={hideNewItemForm} />
        ) : (
          !state.editItem && (
            <button className="addItemBtn" onClick={showAddItemForm}>
              Add Item
            </button>
          )
        )}
      </div>
      <div>
        {state.editItem ? (
          <EditItemForm
            details={state.editItemDetail[0]}
            saveChanges={saveChanges}
            hideEditItemForm={hideEditItemForm}
          />
        ) : (
          ""
        )}
      </div>
      <div>
        <FilterCartItem
          filterCategory={filterCategory}
          categories={categories}
        />
      </div>

      <div className="ItemList">{listItems}</div>
      <h1>
        Cart Total Amount: $ <u>{totalAmount}</u>
      </h1>
      <div className="ItemList">{listCartItems}</div>
    </>
  );
};

export default App;
