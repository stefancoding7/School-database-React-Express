import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class CreateCourse extends Component {
    
    state = {
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
        errors: [],
      };
      
      render() {
        const fullName = `${this.props.context.authenticatedUser.firstName} ${this.props.context.authenticatedUser.lastName}` 
        const {
          title,
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
                    value={fullName}
                    onChange={this.change}
                    placeholder=""
                    disabled
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
          
       
      </div>
    );
  }

  /***
   * Change event for inputs
   */
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
   * Submit createCourse than send to API
   */
  submit = () => {
      const { context } = this.props;
      const userId = context.authenticatedUser.id;
      const  username  = context.authenticatedUser.emailAddress;
      const { password } = context.authenticatedUser;
      console.log(context);
      
      console.log(password);
      
      const { title, description, estimatedTime, materialsNeeded } = this.state;

    

      const course = {
        userId,
        title,
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

  /***
   * Cancel button to push history to '/'
   */
  cancel = () => {
    this.props.history.push('/');

  }
}