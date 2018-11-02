import { SEND_USER, CLEAR, SEND_TOKEN } from "../Constants/Action-Types";

export const sendUser = user => ({ type: SEND_USER, payload: user });
export const sendToken = token => ({ type: SEND_TOKEN, payload: token });
export const clear = () => ({ type: CLEAR, payload: [] });