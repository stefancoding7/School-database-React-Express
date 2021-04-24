import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import axios from 'axios';

export default class CreateCourse extends Component {
    state = {
        title: "",
        author: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
        course: [],
        user: [],
        errors: [],
      };

      componentDidMount() {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        const course = this.props.match.params;
       // console.log(course.id);
        axios(`http://localhost:5000/api/courses/${course.id}`)
        .then(data => {
            
            this.setState({ 
              course: data.data,
              user: data.data.userOwner
            })
            
           if(this.state.user.id !== authUser.id) {
               this.props.history.push('/forbidden')
           }    
        })
        .catch((error) => {
            this.props.history.push('/notfound');
        })
        
        // .catch((error) => {
        //     console.log('Error: ', error);
            
        //     this.props.history.push('/error');
        // });
       
    
}
      
    
      render() {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        const userFullName = `${authUser.firstName} ${authUser.lastName}`
        const { course } = this.state; 
       
        const {
          title,
          author,
          description,
          estimatedTime,
          materialsNeeded,
          errors,
        } = this.state;
    

    return (
      <div className="wrap">
        
          <h2>Update Course</h2>
          <Form 
            cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Update Course"
          elements={() => (
            <React.Fragment>
            <div className="main--flex">
                <div>
                    <label htmlFor="courseTitle">Course Title</label>
                  <input
                    id="courseTitle"
                    name="title"
                    type="text"
                    value={course.title}
                    onChange={this.change}
                    placeholder="Title"
                  />
                  <label htmlFor="courseAuthor">Course Author</label>
                  <input
                    id="courseAuthor"
                    name="author"
                    type="text"
                    value={userFullName}
                    onChange={this.change}
                    placeholder=""
                  />
                  <label htmlFor="courseDescription">Course Description</label>
                  <textarea
                    id="courseDescription"
                    name="description"
                    onChange={this.change}
                    value={course.description}
                  ></textarea>
                    </div>
                <div>
                    <label htmlFor="estimatedTime">Estimated Time</label>
                    <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    value={course.estimatedTime}
                    onChange={this.change}
                  />
                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea
                    id="materialsNeeded"
                    name="materialsNeeded"
                    onChange={this.change}
                    value={course.materialsNeeded}
                  ></textarea>
                </div>
            </div>
             
              
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
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

  submit = () => {
      const { context } = this.props;
      const { history } = context;
      const userId = context.authenticatedUser.id;
      const  username  = context.authenticatedUser.emailAddress;
      const { password } = context.authenticatedUser;
      const {id}  = this.props.match.params;
      console.log(context);
      
      console.log(password);
      
      const { title, author, description, estimatedTime, materialsNeeded } = this.state;

    

      const course = {
        userId,
        title,
        author,
        description,
        estimatedTime,
        materialsNeeded
      };
      console.log(course);
      context.data.updateCourse(id, course, username, password)
      .then( errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          
          this.props.history.push("/")
           

        }
      })
      .catch( error => { 
        console.log(error);
        this.props.history.push('/error'); // push to history stack
      });  
     
 
  }

  cancel = () => {
    this.props.history.push('/');

  }
}