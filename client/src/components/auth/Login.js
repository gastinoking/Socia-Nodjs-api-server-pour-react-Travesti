import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../Redux/actions/authActions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.onSubmitLogin = this.onSubmitLogin.bind(this);
    // this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboad");
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
    if (props.errors) {
      return {
        errors: props.errors,
      };
    }
  }

  onSubmitLogin(e) {
    e.preventDefault();
    this.props.loginUser(this.state);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.props;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="m-auto col-md-8">
              <h1 className="text-center display-4">Connexion</h1>
              <p className="text-center lead">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmitLogin}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control", {
                      " is-invalid": errors.email,
                    })}
                    placeholder="Email Address"
                    onChange={this.onChange}
                    value={this.state.email}
                    name="email"
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control", {
                      "is-invalid": errors.password,
                    })}
                    placeholder="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                    name="password"
                  />
                  {errors.password && (
                    <div className="invalid-feedback"> {errors.password}</div>
                  )}
                </div>
                <input type="submit" className="mt-4 btn btn-info btn-block" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.proptyps = {
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
});
export default connect(mapStateToProps, { loginUser })(Login);
