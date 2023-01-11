import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";
import {verifyUser} from '../redux/UserSlice'
import { Link } from 'react-router-dom'
import './VerificationPage.css'

const  VerificationPage=()=> {
  const dispatch = useDispatch()
  const { email } = useParams();
  

  const verify =()=>{
    
    dispatch(verifyUser({email}))
    
  }
  return (
    
    <div className="verificationPage">
        <h1>Verifiy Your Account</h1>
        <p>Conform Verification ?</p>
        <button onClick={()=>verify() }>Click ME</button>
        <p>Back to {<Link to ='/'>Login</Link> } </p>
        
    </div>
  )
}

export default VerificationPage