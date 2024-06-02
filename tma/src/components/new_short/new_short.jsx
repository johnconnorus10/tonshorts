import { useState } from 'react'

import './new_short.scss'

import { IconContext } from "react-icons";
import { RiVideoChatFill } from "react-icons/ri";
import { SlArrowLeftCircle   } from "react-icons/sl";

import {useNavigate} from 'react-router-dom';


function NewShort() {
  const navigate = useNavigate();

  const [name, setName] = useState('')

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const back = () => navigate('/');
  

  return (<div className='new-short'>

  <IconContext.Provider value={{ size: "30px" }}>

    <button type="button" className='back-button'  onClick={back}>
       <SlArrowLeftCircle /> назад
    </button>

    <div className='form'>

        <label>Ссылка на файл</label>
        <input             
              type="text"
              value={name}
              name="name"
              placeholder="https://{адрес_файла}"
              onChange={handleNameChange} />


        <button type="button" className='button'>
          <RiVideoChatFill />&nbsp; Добавить
        </button>

    </div>
   
  </IconContext.Provider>

  </div>
  )
}

export default NewShort