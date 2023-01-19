import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';



const CreateCourse = (props) => {
    let navigate = useNavigate();
    
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
    
      let handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let res = await fetch("http://localhost:5000/api/courses", {
            method: "POST",
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
            <div class="main--flex">
                <div>
                    <label for="courseTitle">Course Title</label>
                    <input 
                        id="courseTitle" 
                        name="courseTitle" 
                        type="text" 
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)} />

                    <p>By Joe Smith</p>

                    <label for="courseDescription">Course Description</label>
                    <textarea 
                        id="courseDescription" 
                        name="courseDescription"
                        onChange={(e) => setCourseDescription(e.target.value)}>{courseDescription}</textarea>
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
                        onChange={(e) => setCourseMaterialsNeeded(e.target.value)}>{courseMaterialsNeeded}</textarea>
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