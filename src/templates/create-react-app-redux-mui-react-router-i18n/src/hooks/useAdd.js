import React from "react";

const useAdd = (initialValue = 0) => {
  const [value, setValue] = React.useState(initialValue);

  const add = (amount = 1) => {
    setValue(value + amount);
  };

  return [value, add];
};
