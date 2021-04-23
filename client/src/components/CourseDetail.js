import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';


export default class CourseDetail extends Component {

    state = {
        course: [],
        user: []
    }


    componentDidMount() {
        const course = this.props.match.params;
       // console.log(course.id);
        axios(`http://localhost:5000/api/courses/${course.id}`)
        .then(data => {
            
            this.setState({ 
              course: data.data,
              user: data.data.userOwner
            })
            
           
        })
        // .catch((error) => {
        //     console.log('Error: ', error);
            
        //     this.props.history.push('/error');
        // });
       
    
}

    render() {
    const { course } = this.state; 
    const { user } = this.state;
    const { authenticatedUser } = this.props.context;
    
  
        return(
            <React.Fragment>
           
                 <main>
            <div className="actions--bar">
                <div className="wrap">
                    { authenticatedUser && 
                        user.id === authenticatedUser.id ? (
                            <>
                            <a className="button" href="update-course.html">Update Course</a>
                            <a className="button" href="#">Delete Course</a>
                            <a className="button button-secondary" href="index.html">Return to List</a>
                            </>    
                        ) : (
                            <Link
                            to='/'
                            className='button button-secondary'
                            >
                            Return List
                            </Link>
                            
                        )

                       

                        

                        
                    }
                    
                    
                </div>
            </div>
            
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{ course.title }</h4>
                            <p>By { user.firstName + ' ' + user.lastName }</p>
                            <p> { course.description } </p>
                            
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <ReactMarkdown>{ course.estimatedTime } </ReactMarkdown>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                               <ReactMarkdown>{ course.materialsNeeded }</ReactMarkdown> 
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
        </React.Fragment>
           
        )
    }
}