import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="mb-4 navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="mr-auto navbar-nav">
              <li className="nav-item">
                <Link className="navbar-brand" to="/profile">
                  {" "}
                  Developers
                </Link>
              </li>
            </ul>

            <ul className="ml-auto navbar-nav">
              <li className="nav-item">
                <Link className="navbar-brand" to="/register">
                  Inscription
                </Link>
              </li>
              <li className="nav-item">
                <Link className="navbar-brand" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
export default Navbar;
