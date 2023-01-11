import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import {updateItem} from '../redux/TaskSlice'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Edit.css';


const Edit = () => {
    const updateItemdata= useSelector((state) => state.task.updateItemdata)

    const [title, setTitle] =  useState(updateItemdata.payload.title)
    const [description, setDiscription] = useState(updateItemdata.payload.description)
    const [status, setStatus] = useState(updateItemdata.payload.status)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submit = () => {
        if(title.length > 0 ||description>0 ) { 
            var id = updateItemdata.payload._id
            var payload = {title,description,status,id}


        dispatch(updateItem(payload))
        navigate('/')

        }
        else{
            toast.warning('Fill all the spaces')

        }
        
    }

    return (
        <div className='editbody'>
            <div className='edit'>
                <span > Title</span> <input className="titleform" type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <span> Description</span><input className='discriptionform' type="text" placeholder='description' value={description} onChange={(e) => setDiscription(e.target.value)} />
                <span> Status  {status? <button onClick = {()=> setStatus(!status)}> completed </button>: <button onClick = {()=> setStatus(!status)} >Imcomplete </button> }  </span>
            </div>
            <button className='submitbtn' onClick={() => submit()}>Submit</button>
        </div>

    )
}
export default Edit