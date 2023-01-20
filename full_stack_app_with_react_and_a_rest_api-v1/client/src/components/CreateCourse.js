import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';



const CreateCourse = () => {
    let navigate = useNavigate();
    const {user} = useContext(UserContext);
    
    //Set State
    let [courseTitle, setCourseTitle] = useState("");
    let [courseDescription, setCourseDescription] = useState("");
    let [courseEstimatedTime, setEstimatedTime] = useState("");
    let [courseMaterialsNeeded, setCourseMaterialsNeeded] = useState("");
    let [message, setMessage] = useState("");

    const handleCancel = (event) => {
        event.preventDefault();
        navigate(-1);
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let res = await fetch("http://localhost:5000/api/courses", {
            method: "POST",
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
            <h2>Create Course</h2>
            <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul>
                    <li>Please provide a value for "Title"</li>
                    <li>Please provide a value for "Description"</li>
                </ul>
            </div>
    
        <form
            onSubmit={handleSubmit}>
            <div className="main--flex">
                <div>
                    <label>Course Title
                    <input 
                        id="courseTitle" 
                        name="courseTitle" 
                        type="text" 
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)} />
                    </label>

                    <p>By Joe Smith</p>

                    <label>Course Description
                    <textarea 
                        id="courseDescription" 
                        name="courseDescription"
                        onChange={(e) => setCourseDescription(e.target.value)}>{courseDescription}</textarea>
                    </label>
                </div>
                
                <div>
                    <label >Estimated Time
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
                        onChange={(e) => setCourseMaterialsNeeded(e.target.value)}>{courseMaterialsNeeded}</textarea>
                    </label>
                </div>
            </div>
            <button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
</div>
</React.Fragment>
    
    );
};
export default CreateCourse;