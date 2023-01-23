import React from 'react';
import { Link } from 'react-router-dom';

const CourseList = (props) => (
       
        <Link className="course--module course--link" to={props.url}>
        <h2 className="course--label">Course</h2>
        <h3 className="course--title">{props.title}</h3>
        </Link>

);

export default CourseList;