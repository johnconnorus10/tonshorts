import { useState } from 'react'

import './comments.scss'

import { IconContext } from "react-icons";
import { RiVideoChatFill } from "react-icons/ri";
import { SlArrowLeftCircle   } from "react-icons/sl";
import {  CiCircleChevLeft } from "react-icons/ci";

import {useNavigate} from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Comments() {
  const navigate = useNavigate();

  const [name, setName] = useState('')

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const back = () => navigate('/');

  const sendVideo = () => navigate('/');
  

  return (<div className='comments'>

    <IconContext.Provider value={{ size: 45 }}>
        <div className='top-buttons'>
          <div onClick={back}><CiCircleChevLeft /></div>
        </div>
    </IconContext.Provider>
<br />

    <h2>Comments</h2>

    <div className='form'>

    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>New comment</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>

      <Button variant="primary" onClick={sendVideo}>
            <RiVideoChatFill /> Send
      </Button>
    </Form>

    </div>


    <div className='comments-list'>
        <div className='comments-item'>
           <div className='name'>UQBw7...EAWbw</div>
           Место встречи: КОНФЕРЕНЦ-ЗАЛ ЯСНАЯ ПОЛЯНА. Санкт-Петербург, м. Петроградская / ул. Льва Толстого 1-3(вход со стороны ул. Льва Толстого).
           <div className='dt'>29.05.2024</div>
        </div>
        <div className='comments-item'>
            <div className='name'>UQBw7...EAWbw</div>
            Место встречи: КОНФЕРЕНЦ-ЗАЛ ЯСНАЯ ПОЛЯНА. Санкт-Петербург, м. Петроградская / ул. Льва Толстого 1-3(вход со стороны ул. Льва Толстого).
            <div className='dt'>29.05.2024</div>
        </div>
        <div className='comments-item'>
            <div className='name'>UQBw7...EAWbw</div>
            Место встречи: КОНФЕРЕНЦ-ЗАЛ ЯСНАЯ ПОЛЯНА. Санкт-Петербург, м. Петроградская / ул. Льва Толстого 1-3(вход со стороны ул. Льва Толстого).
            <div className='dt'>29.05.2024</div>
        </div>
    </div>

  </div>
  )
}

export default Comments