import { Link } from "react-router-dom";
import { BsArrow90DegLeft } from "react-icons/bs";
import React from 'react'

const Backbutton = ({destination = '/'}) => {
  return (
    <div className="flex">
        <Link to={destination} className="bg-sky-800 text-white px-4 py-1 rounded-lg w-fit">
            <BsArrow90DegLeft/>
        </Link>
    </div>
  )
}

export default Backbutton