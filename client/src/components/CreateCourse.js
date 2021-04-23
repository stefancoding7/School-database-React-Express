import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class CreateCourse extends Component {
    state = {
        title: "",
        author: "",
        description: "",
        errors: [],
      };
    
      render() {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
      


        const {
          title,
          author,
          description,
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
                value={author}
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
      const userId = context.authenticatedUser.id;
      const  username  = context.authenticatedUser.emailAddress;
      const { password } = context.authenticatedUser;
      console.log(context);
      
      console.log(password);
      const { history } = context;
      const title = this.state.title;
      const author = context.authenticatedUser.firstName;
      const description = this.state.description;
     
      
    

      const course = {
        userId,
        title,
        author,
        description,

      };
      console.log(course);
      context.data.createCourse(course, username, password)
      .then( errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          
              history.push('/');    
           

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