import React, {useState, useContext} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UserContext from '../context/UserContext';
import ReactMarkdown from 'react-markdown';

const Courses = (props) => {
    let navigate = useNavigate();
    const {user} = useContext(UserContext);
    let {courses} = props;  

    //get the id path from the URL
    let {id} = useParams();
    const index = courses.findIndex(course => course.id === id);
    let course = courses[index];
    let updateCourseURL = `/courses/${id}/update`;
    let [posts, setPosts] = useState([]);

    console.log(courses);

// Delete with fetchAPI
   const handleDelete = async () => {
    let response = await fetch(
       `http://localhost:5000/api/courses/${id}`,
       {
          method: 'DELETE',
          headers: {
            "Authorization": 'Basic ' + btoa(`${user.emailAddress}:${user.password}`)
          },
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
            <button className="button" onClick={handleDelete}>Delete Course</button>
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
                
                    <p><ReactMarkdown children={course.description}  /> </p>
                        
                </div>
        
                <div>
                    <h3 className="course--detail--title">Estimated Time</h3>
                    <p>{course.estimatedTime} Hours</p>

                    <h3 className="course--detail--title">Materials Needed</h3>
                    <ul className="course--detail--list">
                       <ReactMarkdown children={course.materialsNeeded} />
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
                
                            <p><ReactMarkdown children={course.description}  /> </p>
                                
                        </div>
                
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime} Hours</p>
        
                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <ReactMarkdown children={course.materialsNeeded} />
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