const CURRENT_CURRENCY = "CheckCurrency/option";

export const setCurrency = (view) => ({
  type: CURRENT_CURRENCY,
  payload: view,
});

export default function setCurrencyRedeucer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CURRENT_CURRENCY:
      return action.payload;
    default:
      return state;
  }
}

const INITIAL_STATE = "krw";
