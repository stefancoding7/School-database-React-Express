import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
    state = {
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
        confirmedPassword: "",
        errors: [],
      };
    
      render() {
        const {
          firstName,
          lastName,
          emailAddress,
          password,
          confirmedPassword,
          errors,
        } = this.state;
    

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Sign Up"
          elements={() => (
            <React.Fragment>
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={firstName}
                onChange={this.change}
                placeholder="Name"
              />
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={lastName}
                onChange={this.change}
                placeholder="Name"
              />
              <label htmlFor="emailAddress">Email Address</label>
              <input
                id="emailAddress"
                name="emailAddress"
                type="email"
                value={emailAddress}
                onChange={this.change}
                placeholder="User Name"
              />
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={this.change}
                placeholder="Password"
              />
              <label htmlFor="confirmedPassword">Confirm Password</label>
              <input
                id="confirmedPassword"
                name="confirmedPassword"
                type="password"
                value={confirmedPassword}
                onChange={this.change}
                placeholder="Confirm Password"
              />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    
      const { context } = this.props;
      const { firstName, lastName, emailAddress, password } = this.state;
      
    

      const user = {
        firstName,
        lastName,
        emailAddress,
        password,
      };

      context.data.createUser(user)
      .then( errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          context.actions.signIn(emailAddress, password)
            .then(() => {
              this.props.history.push('/authenticated');    
            })

        }
      })
      .catch( err => { 
        console.log(err);
        this.props.history.push('/error'); // push to history stack
      });  
     
 
  }

  cancel = () => {
    this.props.history.push('/');

  }
}
