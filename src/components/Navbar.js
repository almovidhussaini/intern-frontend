import React,{useState} from 'react'
import { Link } from "react-router-dom";
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/UserSlice';
import { useNavigate } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [logoutbtn, setLogoutbtn] = useState(false);
  const logoutfunction = () =>{
    dispatch(logout());
    navigate('/')
    console.log('logout');

    
  }
  return (
    <div className='header'>     

        <Link className='link' to="Add">Add</Link>
        <Link className='link' to="/" >List</Link>
        <div className='logoutbtn'>
             
             <AiOutlineUserAdd size={30} onClick={()=>  setLogoutbtn(!logoutbtn)}/>
             {logoutbtn?<button className='logoutmainbtn' onClick={()=>logoutfunction() }> logout </button>:'' }
             
        </div>
        

    </div>

  )
}
export default Navbar