import {
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  PROFILE_NOT_FOUND,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
      };

    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
      };

    default:
      return state;
  }
}
