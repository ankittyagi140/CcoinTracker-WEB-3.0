export const addCoin = (coinData) => {
  return {
    type: "ADD_COIN",
    payload: coinData,
  };
};

export const removeCoin = (removedCoin) => {
  return {
    type: "REMOVE_COIN",
    payload: removedCoin,
  };
};
