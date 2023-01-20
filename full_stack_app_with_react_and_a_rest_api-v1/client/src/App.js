import React, {useState, useEffect} from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';
import axios from 'axios';

//App Components
import Header from "./components/Header";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import Courses from './components/Courses';
import NotFound from './components/NotFound';
import UserSignOut from './components/UserSignOut';



function App() {
  //set state for variables
  let [courses, setCourses] = useState([]);


  //Pull in the course data
useEffect(() => {
 axios.get("http://localhost:5000/api/courses")
.then(response => {
  // handle success
  setCourses(response.data);
})
.catch(error => {
  // handle error
  console.log("Error fetching and parsing data", error);
});
},[]);



  return (
    <React.Fragment>
      <Header />
      
      <Routes>
        <Route path="/" element={<Courses courses={courses}/>} />
        <Route path="/courses/create" element={<CreateCourse />} />
        <Route path="/courses/:id/update" element={<UpdateCourse courses={courses}/>} />
        <Route path="/courses/:id" element={<CourseDetail courses={courses}/>} />
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/signout" element={<UserSignOut />} />
        <Route element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;