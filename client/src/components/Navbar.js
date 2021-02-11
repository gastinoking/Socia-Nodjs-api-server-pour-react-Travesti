import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { logoutUser } from "../Redux/actions/authActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }
  render() {
    const { user, isAuthenticated } = this.props.auth;
    const authLink = (
      <ul className="ml-auto navbar-nav">
        <li className="nav-item">
          <img
            src={user.avatar}
            style={{ width: "30px", marginRight: "10px", borderRadius: "30px" }}
            alt=""
          />
          <a
            className="navbar-brand"
            href="/"
            onClick={this.onLogoutClick.bind(this)}
          >
            Déconnexion
          </a>
        </li>
      </ul>
    );

    const guestLink = (
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
    );

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
                  Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLink : guestLink}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.proptyps = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Navbar);
