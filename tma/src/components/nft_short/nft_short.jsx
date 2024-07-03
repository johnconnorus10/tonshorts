import { useState } from 'react'

import './nft_short.scss'

import { IconContext } from "react-icons";
import {  CiCircleChevLeft } from "react-icons/ci";
import { RiNftFill } from "react-icons/ri";

import {useNavigate} from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import WebApp from '@twa-dev/sdk'

function NFTShort() {
  const navigate = useNavigate();

  const [name, setName] = useState('')

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const back = () => navigate('/');

  const sendNFT = () => navigate('/');


  const addr = "UQBw7DzE0AwYBVOe_kR6GPj0Wsvp22SBymUYjpiDGSVEAWbw";

  return (<div className='nft-short'>

    
        <div className='top-buttons'>
          <div onClick={back}>
            <IconContext.Provider value={{ size: 45 }}>
              <CiCircleChevLeft />
            </IconContext.Provider></div>
        </div>
    

    <IconContext.Provider value={{ size: 70 }}>
        <div className='avatar'>
          <RiNftFill />
        </div>
    </IconContext.Provider>


    <div className='user-name' onClick={() => WebApp.showAlert(addr)}>
      NFT address: <br />
    UQBw7...EAWbw
    </div>

    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" 
                      value={name} 
                      onChange={handleNameChange} 
                      placeholder="address"
                      />
      </Form.Group>

      <Button variant="primary" onClick={sendNFT}>
            Send
      </Button>
    </Form>


  </div>
  )
}

export default NFTShort