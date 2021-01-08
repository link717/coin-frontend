const CURRENT_DATA = "CheckCoinData/options";

export const setCoinData = (data) => ({
  type: CURRENT_DATA,
  payload: data,
});

export default function setCoinDataRedeucer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CURRENT_DATA:
      return action.payload;
    default:
      return state;
  }
}

const INITIAL_STATE = [];
