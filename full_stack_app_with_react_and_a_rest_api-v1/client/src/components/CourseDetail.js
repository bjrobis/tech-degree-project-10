import React, {useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const Courses = (props) => {
    const {user} = useContext(UserContext);
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
    
    let updateCourseURL = `/courses/${id}/update`;
    
    let materialsList;
    materialsList = materialsArray.map(material => <li>{material}</li>);

    let navigate = useNavigate();

    let [posts, setPosts] = useState([]);

    console.log(course);

// Delete with fetchAPI
   const handleDelete = async () => {
    let response = await fetch(
       `http://localhost:5000/api/courses/${id}`,
       {
          method: 'DELETE',
       }
    );
    if (response.status === 200) {
       setPosts(
          posts.filter((post) => {
             return post.id !== id;
          })
       );
       navigate('/');
    } else {
       return;
    }
 };

    if (user !== null && user.id === course.userId) {
    return(
    <React.Fragment>
    <div className="actions--bar">
        <div className="wrap">
            <Link className="button" to={updateCourseURL}>Update Course</Link>
            <Link className="button" onClick={handleDelete}>Delete Course</Link>
            <Link className="button button-secondary" to="/">Return to List</Link>
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
    } else {
        return(
            <React.Fragment>
            <div className="actions--bar">
                <div className="wrap">
                    <Link className="button button-secondary" to="/">Return to List</Link>
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

    }
};
export default Courses;