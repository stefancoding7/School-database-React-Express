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
        courseUser: [],
        errors: [],
      };


    componentDidMount() {
        const { context, history } = this.props;
        const courseId = this.props.match.params.id;
        const authUser = context.authenticatedUser;
       // console.log(course.id);
        axios(`http://localhost:5000/api/courses/${courseId}`)
            .then(data => {
                
                this.setState({ 
                title: data.data.title,
                author: data.data.userOwner.firstName + ' ' + data.data.userOwner.lastName,
                description: data.data.description,
                estimatedTime: data.data.estimatedTime,
                materialsNeeded: data.data.materialsNeeded,
                course: data.data,
                courseUser: data.data.userOwner
                })
                

                const { courseUser } = this.state;
            
                if(authUser.id !== courseUser.id) {
                    history.push('/forebidden')
                }
            
            })
    }

    
      render() {
        const { context } = this.props;
        const { history } = this.props;
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
        
          <h2>Update Course</h2>
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
      const { context, history } = this.props;
      
      const userId = context.authenticatedUser.id;
      const  username  = context.authenticatedUser.emailAddress;
      const { password } = context.authenticatedUser;
      const id = this.props.match.params.id;
      const { courseUser } = this.state;
      
      const { title, author, description, estimatedTime, materialsNeeded } = this.state;

    

      const course = {
        userId,
        title,
        author,
        description,
        estimatedTime,
        materialsNeeded
      };
     

      try {
            if(userId === courseUser.id) {
                context.data.updateCourse(id, course, username, password)
                .then( errors => {
                if (errors.length) {
                    this.setState({ errors });
                } else {
                    
                    this.props.history.push(`/course/${id}/update`)

                }
                })
                .catch( err => { 
                console.log(err);
                this.props.history.push('/error'); // push to history stack
                });  
        } else {
            this.props.history.push('/forebidden'); // push to history stack
        }
      } catch(error){
            this.props.history.push('/forebidden'); // push to history stack
      }
     
      
     
 
  }

  cancel = () => {
    this.props.history.push('/');

  }
}