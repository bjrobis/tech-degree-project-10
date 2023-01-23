import React, {useContext} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UserContext from '../context/UserContext';
import ReactMarkdown from 'react-markdown';

const Courses = (props) => {
    let navigate = useNavigate();
    
    const {user} = useContext(UserContext);
    let {courses} = props;


    //get the id path from the URL
    let {id} = useParams();
    //convert the id into an Integer
    let newID = parseInt(id);

    //find the index in the array of the ID
    const index = courses.findIndex(course => course.id === newID);
    let course = courses[index];
    let updateCourseURL = `/courses/${newID}/update`;

    //handle to delete a course 
    const deleteCourse = async () => {
    // DELETE request using fetch with error handling
    await fetch(`http://localhost:5000/api/courses/${newID}`, { 
        method: 'DELETE',
        headers: { 
            "Authorization": 'Basic ' + btoa(`${user.emailAddress}:${user.password}`)
        } })
        .then(res => {
            if(res.status  === 204) {
                console.log('Success')
            } else if (res.status === 401) {
               return res.json().then(data => {
                return console.log(data.errors);
               });
            } else {
                throw new Error('Error: There was a server error');
            }
        })
        .then(errors =>(errors ? console.log(errors) : navigate('/')))
        .catch((err) => {
            console.log('Error related to course creation', err) 
        }); 
  };

    const handleDelete = (e) => {
        e.preventDefault();
        deleteCourse();
        navigate('/');
      }


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
                    <p>{course.estimatedTime}</p>

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
                            <p>{course.estimatedTime}</p>
        
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