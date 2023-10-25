import React, {useEffect,useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios"
import Backbutton from '../components/Backbutton'
import Spinner from '../components/Spinner'


const DeleteBook = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {id} = useParams()

 const handleDeleteBook = ()=>{
  setLoading(true)
  axios.delete(`http://localhost:8080/books/${id}`).then(()=>{
    setLoading(false)
    navigate('/')
  }).catch((err)=>{
    console.log(err)
  })
 }

  return (
    <div>DeleteBook</div>
  )
}

export default DeleteBook