import React, {useState, useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from '../context/UserContext';

const UpdateCourse = (props) => {
 
  const {user} = useContext(UserContext);
    let {courses} = props;

    //get the id path from the URL
    let {id} = useParams();
    let newID = parseInt(id);

    //find the index in the array of the ID
    const index = courses.findIndex(course => course.id === newID);

    let course = courses[index];

    let navigate = useNavigate();

    const handleCancel = (event) => {
        event.preventDefault();
        navigate(-1);
      } 
    
    let putURL = `http://localhost:5000/api/courses/${newID}`;

    //Set State
    let [courseTitle, setCourseTitle] = useState(course.title);
    let [courseDescription, setCourseDescription] = useState(course.description);
    let [courseEstimatedTime, setEstimatedTime] = useState(course.estimatedTime);
    let [courseMaterialsNeeded, setCourseMaterialsNeeded] = useState(course.materialsNeeded);
    let [message, setMessage] = useState("");

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let res = await fetch(putURL, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Authorization": 'Basic ' + btoa(`${user.emailAddress}:${user.password}`)
            },
            body: JSON.stringify({
              title: courseTitle,
              description: courseDescription,
              estimatedTime: courseEstimatedTime,
              materialsNeeded: courseMaterialsNeeded,
            }),
          });
          if (res.status === 200) {
            navigate("/");
          } else {
            setMessage("An error occured");
          }
        } catch (err) {
          console.log(err);
        }
      };

    return(
        <React.Fragment>
            <div className="wrap">
                <h2>Update Course</h2>
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label >Course Title
                            <input 
                                id="courseTitle" 
                                name="courseTitle" 
                                type="text" 
                                value={courseTitle} 
                                onChange={(e) => setCourseTitle(e.target.value)}/>
                            </label>

                            <p>{course.User.firstName} {course.User.lastName}</p>

                            <label >Course Description
                            <textarea 
                                id="courseDescription" 
                                name="courseDescription"
                                value={courseDescription}
                                onChange={(e) => setCourseDescription(e.target.value)}></textarea>
                            </label>
                        </div>
                        <div>
                            <label>Estimated Time
                            <input 
                                id="estimatedTime" 
                                name="estimatedTime" 
                                type="text" 
                                value={courseEstimatedTime}
                                onChange={(e) => setEstimatedTime(e.target.value)} />
                            </label>

                            <label>Materials Needed
                            <textarea 
                                id="materialsNeeded" 
                                name="materialsNeeded"
                                value={courseMaterialsNeeded}
                                onChange={(e) => setCourseMaterialsNeeded(e.target.value)}></textarea>
                            </label>
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                    <div className="message">{message ? <p>{message}</p> : null}</div>
                </form>
            </div>
        </React.Fragment>
    );
};
export default UpdateCourse;
