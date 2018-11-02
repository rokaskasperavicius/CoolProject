import { SEND_USER, CLEAR, SEND_TOKEN } from '../Constants/Action-Types';

const state = (state = { user: [], token: '' }, action) => {
  switch (action.type) {
    case SEND_USER:
      return { ...state, user: action.payload };
    case SEND_TOKEN:
      return { ...state, token: action.payload };
    case CLEAR:
      return { ...state, user: action.payload, token: action.payload };
    default:
      return state;
  }
};

export default state;