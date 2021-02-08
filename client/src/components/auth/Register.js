import React, { Component } from "react";

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
    console.log(newUser);
  }
  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="m-auto col-md-8">
              <h1 className="text-center display-4">Sign Up</h1>
              <p className="text-center lead">
                Create your DevConnector account
              </p>
              <form onSubmit={this.onFormSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChangeinput}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    value={this.state.email}
                    onChange={this.onChangeinput}
                    name="email"
                  />
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChangeinput}
                    name="password"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    value={this.state.password2}
                    onChange={this.onChangeinput}
                    name="password2"
                  />
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

export default Register;
