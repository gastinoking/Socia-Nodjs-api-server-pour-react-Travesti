import { GET_ERRORS, GET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((errors) =>
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data,
      })
    );
};

// Login end Get User Token

export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      const { token } = res.data;
      //Save token to localstorage
      window.localStorage.setItem("jwtToken", token);
      //Set Token to Auth header
      setAuthToken(token);
      // Décode token to get user data
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((errors) =>
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data,
      })
    );
};

export const setCurrentUser = (decode) => {
  return {
    type: GET_CURRENT_USER,
    payload: decode,
  };
};

//Déconnecter k'utilisateur
export const logoutUser = () => (dispatch) => {
  //Supprimer le localstorage
  window.localStorage.removeItem("jwtToken");
  //Supprimer les infos du header
  setAuthToken(false);
  //supprimer les info de l'utilisateur
  dispatch(setCurrentUser({}));
};
