import isEmpty from "../../validation/is-empty";
import { GET_CURRENT_USER } from "../actions/types";
const initialState = {
  isAuthenticated: false,
  user: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
}
