import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class CreateCourse extends Component {
    state = {
        title: "",
        author: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
        errors: [],
      };
    
      render() {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        const userFullName = `${authUser.firstName} ${authUser.lastName}`


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
        
          <h2>Create Course</h2>
          <Form 
            cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Create Course"
          elements={() => (
            <React.Fragment>
            <div className="main--flex">
                <div>
                    <label htmlFor="courseTitle">Course Title</label>
                  <input
                    id="courseTitle"
                    name="title"
                    type="text"
                    value={title}
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
                    value={description}
                  ></textarea>
                    </div>
                <div>
                    <label htmlFor="estimatedTime">Estimated Time</label>
                    <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    value={estimatedTime}
                    onChange={this.change}
                  />
                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea
                    id="materialsNeeded"
                    name="materialsNeeded"
                    onChange={this.change}
                    value={materialsNeeded}
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
      context.data.createCourse(course, username, password)
      .then( errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          
          this.props.history.push("/")
           

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