import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateCourse = (props) => {
 

    let {courses} = props;
    let url =  window.location.href;
    let substring = url.substring(url.lastIndexOf('/courses/') +1);
    let subindex = substring.substr(8, 1);
    let id = subindex - 1;
    let course = courses[id];

    let navigate = useNavigate();

    const handleCancel = (event) => {
        event.preventDefault();
        navigate(-1);
      } 
    
    let putURL = `http://localhost:5000/api/courses/${id}`;

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
            body: JSON.stringify({
              title: courseTitle,
              description: courseDescription,
              estimatedTime: courseEstimatedTime,
              materialsNeeded: courseMaterialsNeeded,
            }),
          });
          let resJson = await res.json();
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
                            <label for="courseTitle">Course Title</label>
                            <input 
                                id="courseTitle" 
                                name="courseTitle" 
                                type="text" 
                                value={courseTitle} 
                                onChange={(e) => setCourseTitle(e.target.value)}/>

                            <p>{course.User.firstName} {course.User.lastName}</p>

                            <label for="courseDescription">Course Description</label>
                            <textarea 
                                id="courseDescription" 
                                name="courseDescription"
                                value={courseDescription}
                                onChange={(e) => setCourseDescription(e.target.value)}></textarea>
                        </div>
                        <div>
                            <label for="estimatedTime">Estimated Time</label>
                            <input 
                                id="estimatedTime" 
                                name="estimatedTime" 
                                type="text" 
                                value={courseEstimatedTime}
                                onChange={(e) => setEstimatedTime(e.target.value)} />

                            <label for="materialsNeeded">Materials Needed</label>
                            <textarea 
                                id="materialsNeeded" 
                                name="materialsNeeded"
                                value={courseMaterialsNeeded}
                                onChange={(e) => setCourseMaterialsNeeded(e.target.value)}></textarea>
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
