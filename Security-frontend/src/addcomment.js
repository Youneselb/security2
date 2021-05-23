import React, { useState } from "react";
import facade from "./apiFacade";

export default function AddComment(){

  
    const [isAdded, setIsAdded] = useState(false)

    const [comment, setCommen] = useState()
//    const course = {courseName:courseName, courseDescription: courseDescription}

      function onSubmit(evt) {
          console.log(comment)
          facade.postcomment(comment).then(setIsAdded(true))
          evt.preventDefault()
      }
    

      
    return(
        <div>
         <h1>Add a new comment to the list</h1>

         <form onSubmit={onSubmit}>
        <input placeholder="Comment" id="comment"  onChange={(evt) => setCourseName(evt.target.value) } /> 
        
        
        <button> Add new Comment</button>
      </form>
      {isAdded && (<h2>Comment added</h2>)}
      
        </div>
    ) 
 }