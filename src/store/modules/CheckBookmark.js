const ADD_COIN = "CheckBookmark/add";
const DELETE_COIN = "CheckBookmark/delete";

export const addBookmark = (coin) => ({
  type: ADD_COIN,
  payload: coin,
});

export const deleteBookmark = (coin) => ({
  type: DELETE_COIN,
  payload: coin,
});

export default function setBookmarkDataRedeucer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_COIN:
      return [...state, action.payload];
    case DELETE_COIN:
      return [...action.payload];
    default:
      return state;
  }
}

const INITIAL_STATE = [];
