import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../Redux/actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboad");
    }
  }

  static getDerivedStateFromProps(props, stat) {
    if (props.errors) {
      return {
        errors: props.errors,
      };
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onFormSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="m-auto col-md-8">
              <h1 className="text-center display-4">Inscription</h1>
              <p className="text-center lead">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onFormSubmit}>
                <TextFieldGroup
                  type="text"
                  placeholder="Nom"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  errors={errors.name}
                />

                <TextFieldGroup
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  errors={errors.email}
                  info="Ce site utilise Gravatar,Si vs voulez une image de profil utilisez Gravatar"
                />

                <TextFieldGroup
                  type="password"
                  placeholder="Mot de passe "
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  errors={errors.password}
                />

                <TextFieldGroup
                  type="password"
                  placeholder="Mot de passe "
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                  errors={errors.password2}
                />

                <input type="submit" className="mt-4 btn btn-info btn-block" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Register.propType = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
