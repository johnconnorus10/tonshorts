import { useState } from 'react'

import './complaint.scss'

import { IconContext } from "react-icons";
import {  CiCircleChevLeft } from "react-icons/ci";

import {useNavigate} from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Complaint() {
  const navigate = useNavigate();

  const save = () => navigate('/');
  

  return (<div className='complaint'>
    <h2>Don't show me this video</h2>

    <div className='form'>

    <Form>
      <Button variant="primary" onClick={save}>
            Save
      </Button>
    </Form>

    </div>

  </div>
  )
}

export default Complaint