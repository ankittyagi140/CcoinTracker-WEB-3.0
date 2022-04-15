const initialState = {
  coinData: [
    {
      name: "ankit",
    },
  ],
};

export const coinReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_COIN": {
      return state;
    }
    default:
      return state;
  }
};
