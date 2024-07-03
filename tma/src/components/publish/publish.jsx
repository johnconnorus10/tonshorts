import { useState } from 'react'

import './publish.scss'

import { IconContext } from "react-icons";
import { FaRegCopy } from "react-icons/fa";
import {  CiCircleChevLeft } from "react-icons/ci";

import {useNavigate} from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Publish() {
  const navigate = useNavigate();

  const [name, setName] = useState('https://t.me/tonshorts_bot/video/67576')

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const back = () => navigate('/');

  const sendVideo = () => navigate('/');
  

  return (<div className='publish'>

    <IconContext.Provider value={{ size: 45 }}>
        <div className='top-buttons'>
          <div onClick={back}><CiCircleChevLeft /></div>
        </div>
    </IconContext.Provider>
<br />

    <div className='form'>

    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>File link</Form.Label>
        <Form.Control type="text" 
                      value={name} 
                      onChange={handleNameChange} />
      </Form.Group>

      <Button variant="primary" onClick={sendVideo}>
            <FaRegCopy /> Copy
      </Button>
    </Form>

    </div>

  </div>
  )
}

export default Publish