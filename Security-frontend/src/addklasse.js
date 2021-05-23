import React, { useState } from "react";
import facade from "./apiFacade";

export default function AddKlasse(){

  
    const [isAdded, setIsAdded] = useState(false)

    const [semester, setSemesterName] = useState()
    const [numberOfStudents, setNumberOfStudents] = useState()
    const klasse = {semester:semester, numberOfStudents: numberOfStudents}

      function onSubmit(evt) {
          console.log(klasse)
          facade.postklasse(klasse).then(setIsAdded(true))
          evt.preventDefault()
      }
    

      
    return(
        <div>
         <h1>Add a new class to a specific course</h1>

         <form onSubmit={onSubmit}>
        <input placeholder="Semester" id="semester"  onChange={(evt) => setSemesterName(evt.target.value) } /> 
        <input placeholder="Number of students in class" id="numberOfStudents" onChange={(evt) => setNumberOfStudents(evt.target.value) } />
        <button> Add a new class!</button>
      </form>
      {isAdded && (<h2>Class added</h2>)}
      
        </div>
    ) 
 }