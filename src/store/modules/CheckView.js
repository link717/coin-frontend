const CURRENT_VIEW = "CheckView/option";

export const setView = (view) => ({ type: CURRENT_VIEW, payload: view });

export default function setViewRedeucer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CURRENT_VIEW:
      return action.payload;
    default:
      return state;
  }
}

const INITIAL_STATE = "all";
