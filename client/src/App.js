import React, { Component } from "react";
import { BrowserRouter,  Switch, Route } from 'react-router-dom';

import UserSignUp from './components/UserSignUp';

import withContext from './Context';

import Courses from './components/Courses';




const UserSignUpWithContext = withContext(UserSignUp);



/*
 * test connection to REST API
export default class App extends Component {
  
  state = {
    data: []
  }

    componentDidMount() {
      fetch('http://localhost:5000/api/courses')
        .then(response => response.json())
        .then(data => {
          this.setState({ data: JSON.stringify(data) })
        });  

        
    }

    render() {
      return <h3>{this.state.data}</h3>
    }
}
*/

class App extends Component {

  render(){
    return (
      <BrowserRouter>
      <div>
        <Route path="/api/courses" component={Courses} />
        <Route path="/signup" component={UserSignUpWithContext} />

      </div>
          
      </BrowserRouter>
    )
  }
    
}

export default App;
