import { useState } from 'react'

import './shorts.scss'

import { IconContext } from "react-icons";
import { SlArrowUp , SlArrowDown, SlArrowLeftCircle   } from "react-icons/sl";

import {useNavigate} from 'react-router-dom';

function Shorts() {
  const navigate = useNavigate();

  const back = () => navigate('/');
  

  return (<div className='shorts'>

  <IconContext.Provider value={{ size: "30px" }}>
  <div className="video-content">

    <button type="button" className='back-button'  onClick={back}>
       <SlArrowLeftCircle /> назад
    </button>

    <video  src="testv.webm"   type="video/webm" controls>
    </video>

  
    <button type="button" className='button'>
        <SlArrowUp />
    </button>

    <br />  <br />
    <button type="button" className='button'>
       <SlArrowDown />
    </button>

  </div>
  </IconContext.Provider>

  </div>
  )
}

export default Shorts