import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
  state = {
    username: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      username,
      password,
      errors,
    } = this.state;

    return (
      
        <div className="form--centered">
          <h2>Sign In</h2>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input 
                  id="username" 
                  name="username" 
                  type="text"
                  value={username} 
                  onChange={this.change} 
                  placeholder="User Name" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />                
              </React.Fragment>
            )} />
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
          </p>
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

  /***
   * Submit signin form with authenticed user
   */
  submit = () => {
        const { context } = this.props;
        const { username, password } = this.state;
        const { from } = this.props.location.state || { from: { pathname: '/' } };

        context.actions.signIn(username, password)
            .then(user => {
                if (user === null) {
                    this.setState(() => {
                      return { errors: [ 'Sign-in was unsuccessful' ] };
                    });
                  } else {
                    this.props.history.push(from);
                    console.log(`SUCCESS! ${username} is now signed in!`);
                 }
            })
            .catch( err => {
                console.log(err);
                this.props.history.push('/error');
              })
        
  }

  cancel = () => {
    this.props.history.push('/');
  }
}


