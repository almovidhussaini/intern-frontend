import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { createItem } from '../redux/TaskSlice'
import './AddList.css'
import { toast } from 'react-toastify';

const Addlist = () => {
  const userId = localStorage.getItem('userid')
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDiscription] = useState('');
  const [status, setStatus] = useState(false);
  const [imageForCloudinary, setImageForCloudinary] = useState('');
  const [inComingImgUrl, setInComingImgUrl] = useState('');

  const toggleCond = () => {
    setStatus(current => !status)
  }
  
  const submit = () => {
    if (title.length > 0 && description.length > 0 && inComingImgUrl.length>0 ) {
      const mydata = { title, description, status, userId,myImages:inComingImgUrl}

      new Promise((resolve, reject) => {
        resolve(dispatch(createItem(mydata)));
      }).then(() => navigate('/'))
      
    }
    else{
      toast.error('fill all the Spaces')
    }
  }
  
  const saveimg = async()  => {

   
      const data = new FormData()
      data.append("file", imageForCloudinary)
      data.append("upload_preset","pt9ttqv2");
      data.append("CLOUD_NAME","dcnkiho6c")
      await axios.post ("https://api.cloudinary.com/v1_1/dcnkiho6c/image/upload",data)
      .then((res) => 
      
      setInComingImgUrl(res.data.secure_url),
      toast.success('image saved', { autoClose: 60 })
     
      )
      .catch((err) =>{
        toast.error('error uploadind image')
      })

  }
  return (
    <div className="body">
      <h1>Add Goal</h1>
      <div className="input">
        <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder='description' value={description} onChange={(e) => setDiscription(e.target.value)} />
        <div className="imageUrl">
          <input type="file" onChange={(e) => setImageForCloudinary(e.target.files[0])} />
          
          <button className="imageButton" onClick={()=>saveimg()}> save Image </button>
        </div>
        <div className="submit">
          <span>Status</span>

          <input
            type="checkbox"
            checked={status}
            onChange={() => toggleCond()}
          />
        </div>
        <button className="submit-btn" onClick={() => submit()}> Submit</button>
      </div>
    </div>
  )
}
export default Addlist