import React, { Component } from "react";
import { BrowserRouter,  Switch, Route } from 'react-router-dom';

import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/SignIn';
import Header from './components/Header';
import NotFound from './components/NotFound';

import withContext from './Context';
import PrivateRoute from './PrivateRoute';

import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';

import Authenticated from './components/Authenticate';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';

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
      <BrowserRouter>
      <HeaderWithContext />
      <div>
      
      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
        <PrivateRoute path="/settings" component={AuthWithContext} />
        <PrivateRoute path="/course/:id/update"component={UpdateCourseWithContext} />
        <Route path="/course/:id" component={DetailedCoursesWithContext} />
        
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route component={NotFound} />
      </Switch>
       

      </div>
          
      </BrowserRouter>
    )
  }
    
}

export default App;
