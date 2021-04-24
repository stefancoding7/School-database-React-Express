import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';



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
    const { id } = this.props.match.params;
    
  
        return(
            <React.Fragment>
           
                 <main>
            <div className="actions--bar">
                <div className="wrap">
                    { authenticatedUser && 
                        user.id === authenticatedUser.id ? (
                            <>
                            <Link
                            to={`/course/${id}/update/`}
                            className='button button-secondary'
                            >
                            Update Course
                            </Link>
                            <button className="button" onClick={this.deleteCourse}>Delte Course</button>
                            <Link
                            to='/'
                            className='button button-secondary'
                            >
                            Return List
                            </Link>
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
                             { course.description } 
                            
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{ course.estimatedTime } </p>
                                
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

    deleteCourse = () => {
        const { context } = this.props;
        const { history } = this.props; 
        const id = this.state.course.id;
        const username = context.authenticatedUser.emailAddress;
        const { password } = context.authenticatedUser;
        console.log('username:' + username);
       context.data.deleteC(id, username, password)
            .then(() => this.props.history.push('/'))  
            .catch(err => {
                console.log(err);
                this.props.history.push('/error')
            })                                                             //////
        
    }
}