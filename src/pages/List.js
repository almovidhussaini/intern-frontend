import React, {  useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { itemBeforeUpdate } from '../redux/TaskSlice'
import { useNavigate } from 'react-router-dom';

import { AiFillDelete } from 'react-icons/ai';
import { RiEdit2Line } from 'react-icons/ri';

import { getItem, deleteItem } from '../redux/TaskSlice'

import './List.css'

const List = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userdata = useSelector((state) => state.task.userdata)
  const isLoading = useSelector((state) => state.task.isLoading)

  useEffect(() => {
    dispatch(getItem())
  },[])
  const deleteitem = (_id) => {

    dispatch(deleteItem(_id))

  }
  const editfile = (task) => {
    console.log(task,'inside editFile')
 
    dispatch(itemBeforeUpdate(task))
    navigate('./Edit')
  }
  return (
    <div className="mygoal">
      <h1>Goals</h1>
      <div className="fullbody">
        <table>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Images</th>
            <th>Remove</th>
            <th>Edit</th>
          </tr>

          {isLoading ? <div className="loader"></div> : userdata && userdata.map((task, index) => {
            // let myimages = task.images
            return (
              <tr>
                <td>{task.title}</td>
                <td>{task.description} </td>
                <td>  {task.status ? <span>Completed</span> : <span>Incomplete</span>} </td>
                <td> {<img src={task.images} width={70} height={70} alt='myImage'/>} </td>
                <td> <AiFillDelete onClick={() => deleteitem(task._id)} size={'25px'} />  </td>
                <td> <RiEdit2Line onClick={() => editfile(task)} size={'25px'} /> </td>

              </tr>
            )
          })}
          {!userdata && (
            <tr>
              <td>No Data to show</td>
            </tr>
          )
          }
        </table>
      </div>
    </div>
  )
}

export default List