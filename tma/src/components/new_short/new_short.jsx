import { useState } from 'react'

import './new_short.scss'

import { RiVideoChatFill } from "react-icons/ri";

import {useNavigate} from 'react-router-dom';

import {TonConnect} from "../connect/TonConnect.jsx";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import WebApp from '@twa-dev/sdk'

import { useShortVideoContract } from "../../hooks/use-short-video-contract";

import { useTonConnect } from "../../hooks/use-tonconnect";
import { useUserBalance } from "../../hooks/use-user-balance";


function NewShort() {
  const navigate = useNavigate();

  const [url, setURL] = useState('')
  const [name, setName] = useState('')

  const {wallet} = useTonConnect();



  const { numVideos, newVideo } = useShortVideoContract();

  const handleURLChange = (event) => setURL(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);

  console.log("numVideos! "+numVideos);

  const {newClick}  = useUserBalance(wallet);




  const sendVideo = () => {

      let content = JSON.stringify({url, name});

      console.log(content);
      newVideo(content);

      newClick(10);
  };




  return (<div className='new-short'>

    <div className="new-short-tonconnect">
        <TonConnect/>
    </div>

    <h2>New video</h2>

    <div className='form'>

    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>File link</Form.Label>
        <Form.Control type="text" 
                      value={url} 
                      onChange={handleURLChange} 
                      placeholder="tonshorts://..." />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Text under the video</Form.Label>
        <Form.Control as="textarea" 
                      value={name} 
                      onChange={handleNameChange}
                      rows={3} />
      </Form.Group>

      <Button variant="primary" onClick={sendVideo}>
            <RiVideoChatFill /> Send
      </Button>
    </Form>

    </div>

  </div>
  )
}

export default NewShort