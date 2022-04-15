export const addCoin = (coinData) => {
  return {
    type: "ADD_COIN",
    payload: coinData,
  };
};

export const removeCoin = () => {
  return {
    type: "REMOVE_COIN",
  };
};
