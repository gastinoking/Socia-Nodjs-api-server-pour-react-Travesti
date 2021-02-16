import { combineReducers } from "redux";

import authReducers from "./authReducers";
import errorsReducers from "./errorsReducers";
import profileReducers from "./profileReducers";

export default combineReducers({
  auth: authReducers,
  errors: errorsReducers,
  profile: profileReducers,
});
