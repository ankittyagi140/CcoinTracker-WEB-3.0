export const coinReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_COIN": {
      const newState = {...action.payload}
      return [...state,newState]
    }
    default:
      return state;
  }
};
