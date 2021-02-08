import "./App.css";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route path="/" exact component={Landing} />
        <div className="container">
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
