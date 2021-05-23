import React, { useState } from "react";
import facade from "./apiFacade";

export default function AddCourse(){

  
    const [isAdded, setIsAdded] = useState(false)

    const [courseName, setCourseName] = useState()
    const [courseDescription, setCourseDescription] = useState()
    const course = {courseName:courseName, courseDescription: courseDescription}

      function onSubmit(evt) {
          console.log(course)
          facade.postcourse(course).then(setIsAdded(true))
          evt.preventDefault()
      }
    

      
    return(
        <div>
         <h1>Add a new course to the list</h1>

         <form onSubmit={onSubmit}>
        <input placeholder="Name of course" id="courseName"  onChange={(evt) => setCourseName(evt.target.value) } /> 
        <input placeholder="Description" id="courseDescription" onChange={(evt) => setCourseDescription(evt.target.value) } />
        
        <button> Add new Course</button>
      </form>
      {isAdded && (<h2>Course added</h2>)}
      
        </div>
    ) 
 }