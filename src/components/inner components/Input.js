import React, { useState } from 'react';

export default function Input() {

  const [comment, setComment] =useState("")
 

  function addComment () {
    setComment ()
    console.log ("klicked")
  }





  return (
    
    <div className="Input"><input></input><button onClick={addComment}>Commit</button></div>
  )
}