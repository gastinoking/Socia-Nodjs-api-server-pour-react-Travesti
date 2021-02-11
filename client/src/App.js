import "./App.css";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { Provider } from "react-redux";
import store from "./Redux/store";
import setAuthToken from "./utils/setAuthToken";
import { logoutUser, setCurrentUser } from "./Redux/actions/authActions";
if (window.localStorage.getItem("jwtToken")) {
  //Récupérer le token
  const token = window.localStorage.getItem("jwtToken");
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  //Vérifier l'expiration du tokenn
  if (decoded.exp < currentTime) {
    // logoutUser
    store.dispatch(logoutUser());
    // redirect user
    window.location.href = "/login";
  }
}
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route path="/" exact component={Landing} />
          <div className="container" style={{ height: "100vh" }}>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
