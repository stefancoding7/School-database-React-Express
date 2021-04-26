import React, { Component } from "react";
import { BrowserRouter,  Switch, Route } from 'react-router-dom';

import Header from './components/Header';

//for authenticate
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import Authenticated from './components/Authenticate';

// context and private route
import withContext from './Context';
import PrivateRoute from './PrivateRoute';

// all course componnents
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';

//error components
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
import NotFound from './components/NotFound';

// componenets with context
const HeaderWithContext = withContext(Header);
const AuthWithContext = withContext(Authenticated);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CoursesWithContext = withContext(Courses);
const DetailedCoursesWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);


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
      <div>
      <BrowserRouter>
      <HeaderWithContext />
      
      
      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
        <PrivateRoute path="/settings" component={AuthWithContext} />
        <PrivateRoute exact path="/course/:id/update"component={UpdateCourseWithContext} />
        <Route exact path="/course/:id" component={DetailedCoursesWithContext} />
        
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        
        <Route path="/notfound" component={NotFound} />
        <Route path="/forbidden" component={Forbidden} />
        <Route path="/error" component={UnhandledError} />
        <Route component={NotFound} />
      </Switch>
       

     
          
      </BrowserRouter>
      </div>
    )
  }
    
}

export default App;
