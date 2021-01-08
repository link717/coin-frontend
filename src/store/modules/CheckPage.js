const CURRENT_PAGE = "CheckPage/ADDCOIN";

export const setPage = (page) => ({
  type: CURRENT_PAGE,
  payload: page,
});

export default function setPageRedeucer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CURRENT_PAGE:
      return action.payload;
    default:
      return state;
  }
}

const INITIAL_STATE = 1;
