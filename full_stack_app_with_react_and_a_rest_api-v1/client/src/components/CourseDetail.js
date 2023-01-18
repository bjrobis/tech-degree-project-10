import React from 'react';
import { Link } from 'react-router-dom';

const Courses = (props) => {
    let {courses} = props;  
    let url =  window.location.href;
    let id = url.substring(url.lastIndexOf('/') +1);
    let index = id - 1;
    let course = courses[index];
    let materials = course.materialsNeeded;
    let materialsArray = [];
    if (materials !== null) {
        materialsArray = materials.split('*');
    }
 
    
    let materialsList;
    materialsList = materialsArray.map(material => <li>{material}</li>);

    console.log(materialsArray);

    

  
    
   
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
                    <p>By: {course.User.firstName} {course.User.lastName}</p>

                    <p>{course.description} </p>
                        
                </div>
        
                <div>
                    <h3 className="course--detail--title">Estimated Time</h3>
                    <p>{course.estimatedTime} Hours</p>

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