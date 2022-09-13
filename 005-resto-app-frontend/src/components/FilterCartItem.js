import React, { useState } from "react";
import styled from 'styled-components';

const Select = styled.select`
  background-color: #ff9933;
  color: white;
  border-radius: 5px;
  padding: 0.5rem;
  margin: 0.1rem;
  border: grey;
  cursor: pointer;
`;

const FilterCartItem = ({ categories, filterCategory }) => {
  const [category, setCategory] = useState("");

  const handleSelect = (event) => {
    setCategory(filterCategory(event.target.value));
  };

  const options = categories.map(category => {
    return  <option key={category} value={category}>{category}</option>
  });
  
  return (
    <div>
      <Select value={category} onChange={handleSelect}>
        <option value="">All</option>
        {options}
      </Select>
    </div>
  );
};

export default FilterCartItem;

