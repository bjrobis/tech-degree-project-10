import React from 'react';
import { Link } from 'react-router-dom';

const Courses = (props) => {
    let results = props.courses;    
    let courses;

    courses = results.map(course =>
        {
            let id = course.id;
            let url = `/courses/${id}`
            let title = course.title;
            let description = course.description;
        <Link className="course--module course--link" to={url}>
            <h2 className="course--label">{title}</h2>
            <h3 className="course--title">{description}</h3>
        </Link>
        }
    );
    
    
    
    return(
        <div className="wrap main--grid">
            
            {courses}
                
            <Link className="course--module course--add--module" to="create-course.html">
                <span class="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" class="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                </span>
            </Link>
        </div>

    );
};
export default Courses;
