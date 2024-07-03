import { useState } from 'react'

import './profile.scss'

import { IconContext } from "react-icons";
import { FaRegUserCircle } from "react-icons/fa";
import {  CiCircleChevLeft } from "react-icons/ci";
import { RiSendPlaneFill } from "react-icons/ri";

import {useNavigate, useParams} from 'react-router-dom';


import { useUserShortsContract } from "../../hooks/use-user-shorts-contract";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import WebApp from '@twa-dev/sdk'

function Profile() {
  const navigate = useNavigate();

  let { id } = useParams()

  const [name, setName] = useState('')

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const back = () => navigate(-1);
  const publish = () => navigate('/publish');

  const userShorts = () => navigate('/user-shorts');


  const {counter, details}  = useUserShortsContract(id);

  console.log(details);

  const im = "test/im1.jpg";
  const im2 = "test/im2.jpg";
  const addr = id.substr(0,10)+"..."+id.substr(-10);


  return (<div className='profile'>

    <IconContext.Provider value={{ size: 70 }}>
        <div className='avatar'>
          <FaRegUserCircle />
        </div>
    </IconContext.Provider>


    <div className='user-name' onClick={() => {navigator.clipboard.writeText(id);WebApp.showAlert("Address '"+id+"' is copied to the clipboard!");}}>
    {addr}
    </div>

  

{/*
  <p>{counter} shorts</p>

    <Container>
      <Row>
        <Col><div onClick={userShorts} className='image-container' style={{backgroundImage: 'url('+im+')'}}></div></Col>
        <Col><div onClick={userShorts} className='image-container' style={{backgroundImage: 'url('+im2+')'}}></div></Col>
        <Col><div onClick={userShorts} className='image-container' style={{backgroundImage: 'url('+im2+')'}}></div></Col>
      </Row>
      <Row>
        <Col><div onClick={userShorts} className='image-container' style={{backgroundImage: 'url('+im+')'}}></div></Col>
        <Col><div onClick={userShorts} className='image-container' style={{backgroundImage: 'url('+im2+')'}}></div></Col>
      </Row>
    </Container>
    */}


  </div>
  )
}

export default Profile