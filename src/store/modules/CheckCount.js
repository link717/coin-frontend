const CURRENT_COUNT = "CheckCount/option";

export const setCount = (view) => ({ type: CURRENT_COUNT, payload: view });

export default function setCountRedeucer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CURRENT_COUNT:
      return action.payload;
    default:
      return state;
  }
}

const INITIAL_STATE = 50;
