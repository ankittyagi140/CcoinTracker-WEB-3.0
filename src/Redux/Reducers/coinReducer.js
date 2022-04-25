export const coinReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_COIN": {
      if (state.some((coin) => coin.id === action.payload.id)) {
        alert(`${action.payload.name} already added`);
        return state;
      } else {
        alert(`${action.payload.name} added to your portfolio`);
        const newState = { ...action.payload };
        state = [...state, newState];
        return state;
      }
    }
    case "REMOVE_COIN": {
      const newState = state.filter(
        (coin) =>
          !coin?.symbol
            ?.toLowerCase()
            .includes(action.payload.symbol.toLowerCase())
      );
      state = newState;
    }
    default:
      return state;
  }
};

export const interSectionObserver = (state = Boolean, action) => {
  switch (action.type) {
    case "HEADER_OBSERVER": {
      const newState = action.payload;
      state = newState;
      return state;
    }
    default:
      return state;
  }
};
