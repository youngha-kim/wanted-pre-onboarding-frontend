import React from 'react'
import { useEffect } from 'react'

export default function Todo() {
  useEffect(()=>{
    if(!localStorage.getItem("access_Token")){
      console.log("todo")
      window.location.replace('/signin')
     } 
  },[])

  return (
    <div>Todo</div>
  )
}
