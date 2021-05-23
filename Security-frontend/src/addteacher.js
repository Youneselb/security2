import React, { useState } from "react";
import facade from "./apiFacade";

export default function AddTeacher(){

  
    const [isAdded, setIsAdded] = useState(false)

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const teacher = {name:name, email: email}

      function onSubmit(evt) {
          console.log(teacher)
          facade.postcourse(teacher).then(setIsAdded(true))
          evt.preventDefault()
      }
    

      
    return(
        <div>
         <h1>Add a new teacher to the list</h1>

         <form onSubmit={onSubmit}>
        <input placeholder="Name of teacher" id="name"  onChange={(evt) => setName(evt.target.value) } /> 
        <input placeholder="email" id="email" onChange={(evt) => setEmail(evt.target.value) } />
        
        <button> Add new teacher</button>
      </form>
      {isAdded && (<h2>Teacher added</h2>)}
      
        </div>
    ) 
 }