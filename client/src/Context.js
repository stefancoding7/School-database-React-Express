import React, { Component } from 'react';
import Cookies from 'js-cookie';

import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  }

  constructor() {
    super();
    this.data = new Data();
  }

  
  
  render() {
    const { authenticatedUser } = this.state;

    const value = {
      authenticatedUser,
      data: this.data,
      actions: { // Add the 'actions' property and object
          signIn: this.signIn,
          signOut: this.signOut
      }
    }

    return(
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }
   /**
    * Sign in authenticed user and save user object into cookie
    * @param {string} username 
    * @param {string} password 
    * 
    */
  signIn = async (username, password) => {
      const user = await this.data.getUser(username, password);
      if (user !== null) {
        user.password = password;
        this.setState(() => {
          return {
            authenticatedUser: user,
          };
        });
        // Set cookie
        Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });

      }
  
      return user;
  }

  /***
   * Signout end remove cookie user object
   */
  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');

  }

}

export const Consumer = Context.Consumer;

export default function withContext(Component) {
    return function ContextComponent(props) {
      return (
        <Context.Consumer>
          {(context) => <Component {...props} context={context} />}
        </Context.Consumer>
      );
    };
}