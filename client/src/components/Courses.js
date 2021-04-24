import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class Courses extends Component  {
    state = {
        courses: []
    }
    componentDidMount() {
            axios(`http://localhost:5000/api/courses`)
            .then(data => {
                if (data && Object.keys(data).length !== 0) {
                this.setState({ 
                  courses: data.data,
                })
                }
               
            })
            // .catch((error) => {
            //     console.log('Error: ', error);
                
            //     this.props.history.push('/error');
            // });
           
        
    }
    
    render() {
        const { courses } = this.state
        
        
        const mapedCourses = courses.map((course, index) => (
            <Link
                to={`course/${course.id}`}
                key={index}
                className="course--module course--link"
            >
                <h2 className="course--label">Course</h2>
                <h3 className="course--title">{ course.title }</h3>
            
            </Link>
        ))
        
        return (
           
            <React.Fragment>
                <main>
                    <div className="wrap main--grid">
                        
                        {mapedCourses}

                        <Link
                            to="courses/create"
                            className="course--module course--add--module"
                        >

                        
                        
                            <span className="course--add--title">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                                New Course
                            </span>
                        
                        </Link>
                    </div>
                </main>
            </React.Fragment>
            
        )
    }
}