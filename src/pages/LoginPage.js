
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


import {registerUser,loginUser} from '../redux/UserSlice';
import { Grid, Paper, TextField, Button, Typography } from '@mui/material/'
import Avatar from '@mui/material/Avatar';
import validator from "validator";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import './loginPage.css'



const Loginpage = () => {

  const dispatch = useDispatch()

  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const [toggleRegister, setToggleRegister] = useState(true);
  
  const toggle_regis = () => {
    setEmail('');
    setPassword('');
    setToggleRegister(!toggleRegister)
  }

  const registeruser = () => {


    if (password.length > 5 && name.length > 3) {
      if (validator.isEmail(email)) {

        let registerData = {
          name,password,email
          
        }
        dispatch(registerUser(registerData))
        
      } else {
        toast.error('provide valid email address');
      }
    }
    else {
      toast.error('Fill all the spaces');
    }
  }

  const submitlogn = () => {
    let userdata = {email,password}
    dispatch(loginUser(userdata))
  }

  const avatarstyle = { backgroundColor: `#1bbd7e` }
  const btnstyle = { margin: '8px 0' }
  const paperstyle = { padding: 20, height: 'fit', width: 280, margin: "20px auto" }
  return (
    toggleRegister ? <Grid>
      <Paper elevation={10} style={paperstyle}>
        <Grid align='center' item spacing={3} >
          <Avatar style={avatarstyle} sx={{ my: 1 }}><LockOpenOutlinedIcon /></Avatar>
          <h2>Sign in</h2>
        </Grid>
        <TextField label="Email" placeholder='Enter Email' fullWidth required value={email} onChange={(newValue) => setEmail(newValue.target.value)} sx={{ my: 2 }} />
        {!email.length>0? '':    validator.isEmail(email)?'': <label className='errorlabel'>Enter Valid Email Address </label>}
        <TextField label="Password" type="password" placeholder='Enterpassword' fullWidth required value={password} onChange={(newValue) => setPassword(newValue.target.value)} />
        {!password.length>0? '':  password.length>5?'': <label className='errorlabel'> Must Contain atleast 5 digits </label> }
        <Button type="submit" onClick={() => submitlogn()} style={btnstyle} color="primary" varient="contained" fullWidth>
          Sign in
        </Button>
        <Typography> Do you have an account ?</Typography>
        <Button type="submit" onClick={() => toggle_regis()}>Sign up </Button>
      </Paper>

    </Grid>
      :  <Grid>

      <Paper elevation={10} style={paperstyle}>
        <Grid align='center' item spacing={3} >
          <Avatar style={avatarstyle} sx={{ my: 1 }}><HowToRegIcon /></Avatar>
          <h2>Sign up</h2>

        </Grid>
        <TextField label="Email" placeholder='Enter Email' fullWidth required value={email} onChange={(newValue) => setEmail(newValue.target.value)} sx={{ my: 0.2 }} />
        
        { !email.length>0? '':  validator.isEmail(email) ?'': <label className='errorlabel'>Enter Valid Email Address </label>}
        
        <TextField label="Username" placeholder=' Enter Username' fullWidth required value={name} onChange={(newValue) => setName(newValue.target.value)} sx={{ my: 1 }} />
        { !name.length>0? '': name.length>3?'': <label className='errorlabel'> Contain atleast 3 digits </label> }
        <TextField label="Password" type="password"  fullWidth required value={password} onChange={(newValue) => setPassword(newValue.target.value)}  sx={{ my: 1 }} />
        {!password.length>0? '':password.length>5?'': <label className='errorlabel'> Must Contain atleast 5 digits </label> }
        <Button type="submit" onClick={() => registeruser()} style={btnstyle} color="primary" varient="contained" fullWidth>
          Register
        </Button>

         <Typography> Already have account ? </Typography>
        <Button type="submit" onClick={() => toggle_regis()}>Login</Button>
         

       

      </Paper>
      

    </Grid>
  )
}

export default Loginpage