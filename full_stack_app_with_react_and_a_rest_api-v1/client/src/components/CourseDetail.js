import React from 'react';
import { Link } from 'react-router-dom';

const Courses = (props) => {
    let course = props.course;    
    let materials = course.materialsNeeded;
    let materialsList;

    materialsList = materials.map(material =>
        <li>{material}</li>
    );

   return(
    <React.Fragment>
    <div className="actions--bar">
        <div className="wrap">
            <Link className="button" to="update-course.html">Update Course</Link>
            <Link className="button" to="#">Delete Course</Link>
            <Link className="button button-secondary" to="index.html">Return to List</Link>
        </div>
    </div>

    <div className="wrap">
        <h2>Course Detail</h2>
        <form>
            <div className="main--flex">
                <div>
                    <h3 className="course--detail--title">Course</h3>
                    <h4 className="course--name">{course.title}</h4>
                    <p>{course.userId}</p>

                    <p>{course.description} </p>
                        
                </div>
        
                <div>
                    <h3 className="course--detail--title">Estimated Time</h3>
                    <p>{course.estimatedTime}</p>

                    <h3 className="course--detail--title">Materials Needed</h3>
                    <ul className="course--detail--list">
                        {materialsList}
                    </ul>
                </div>
            </div>
        </form>
    </div>
    </React.Fragment>
    
    );
};
export default Courses;