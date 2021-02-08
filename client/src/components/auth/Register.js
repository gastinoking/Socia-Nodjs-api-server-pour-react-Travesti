import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../Redux/actions/authActions";

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

    this.onChangeinput = this.onChangeinput.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  onChangeinput(e) {
    console.log(e.target.name);
    console.log([e.target.name]);
    this.setState({ [e.target.name]: e.target.value });
  }
  onFormSubmit(e) {
    e.preventDefault();
    const newUser = this.state;
    delete newUser.errors;
    this.props.registerUser(newUser);
    // axios
    //   .post("/api/users/register", newUser)
    //   .then((res) => console.log(res.data))
    //   .catch((errors) => this.setState({ errors: errors.response.data }));
  }
  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;
    return (
      <div className="register">
        {user ? user.name : null}
        <div className="container">
          <div className="row">
            <div className="m-auto col-md-8">
              <h1 className="text-center display-4">Inscription</h1>
              <p className="text-center lead">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onFormSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control", {
                      " is-invalid": errors.name,
                    })}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChangeinput}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control", {
                      " is-invalid": errors.email,
                    })}
                    placeholder="Email Address"
                    value={this.state.email}
                    onChange={this.onChangeinput}
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
                      " is-invalid": errors.password,
                    })}
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChangeinput}
                    name="password"
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control", {
                      " is-invalid": errors.password2,
                    })}
                    placeholder="Confirm Password"
                    value={this.state.password2}
                    onChange={this.onChangeinput}
                    name="password2"
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { registerUser })(Register);
