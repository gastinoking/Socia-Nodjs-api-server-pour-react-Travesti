import PropTypes from "prop-types";
import { connect } from "react-redux";
import React from "react";
import { getCurrentProfile } from "../../Redux/actions/profileActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, isLoading } = this.props.profile;
    let dashboardContent;

    if (profile === null || isLoading) {
      dashboardContent = <Spinner />;
    } else {
      //Check if logged user hase profile

      if (Object.keys(profile).length > 0) {
        dashboardContent = <h4>TODO : DISPLAY PROFILE</h4>;
      } else {
        // User is logged bet not have profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">BIENVENUE {user.name}</p>
            <p className="">
              Vous n'avez pas encor de profile . Merci d'ajouter des infos
            </p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              {"   Créer profile"}
            </Link>
          </div>
        );
      }
      // dashboardContent = (
      //   <div className="">
      //     <h1>Helloo</h1>
      //   </div>
      // );
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="display-4">{dashboardContent}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
