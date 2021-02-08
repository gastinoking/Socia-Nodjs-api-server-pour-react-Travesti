import React from "react";
import { Link } from "react-router-dom";

class Landing extends React.Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="text-center col-md-12">
                <h1 className="mb-4 display-3">Developer Connector</h1>
                <p className="lead">
                  {" "}
                  Create a developer profile/portfolio, share posts and get help
                  from other developers
                </p>
                <hr />
                <Link to="/register" className="mr-2 btn btn-lg btn-info">
                  Inscription
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Connexion
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
