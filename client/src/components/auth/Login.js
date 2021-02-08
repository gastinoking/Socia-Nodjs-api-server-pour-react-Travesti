import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.onSubmitLogin = this.onSubmitLogin.bind(this);
    // this.onChange = this.onChange.bind(this);
  }

  onSubmitLogin(e) {
    e.preventDefault();
    console.log(this.state);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
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
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    onChange={this.onChange}
                    value={this.state.email}
                    name="email"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                    name="password"
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
