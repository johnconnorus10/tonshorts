import { useState, useEffect } from 'react'

import { useResize } from '../../hooks/use-resize';
import { useVideo } from '../../hooks/use-video';

import './user_shorts.scss'

import { IconContext } from "react-icons";
import { SlArrowDown  } from "react-icons/sl";
import { CiCirclePlus, CiCircleChevLeft } from "react-icons/ci";
import { BiCommentDetail } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";
import { IoTrendingDown } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { RiNftFill } from "react-icons/ri";

import {useNavigate} from 'react-router-dom';

import WebApp from '@twa-dev/sdk'

function UserShorts() {
  const navigate = useNavigate();

  const back = () => navigate('/');
  const newShort = () => navigate('/new-short');
  const profile = () => navigate('/profile');
  const comments = () => navigate('/comments');
  const publish = () => navigate('/publish');
  const nftShort = () => navigate('/nft-short');
  const complaint = () => navigate('/complaint');

  const { width: vw, height: vh, duration  } = useVideo("cvideo");
  const { width, height } = useResize();

  const text = "";

  return (<div className='user-shorts'>

        <IconContext.Provider value={{ size: 45 }}>
        <div className='top-buttons'>
          <div onClick={back}><CiCircleChevLeft /></div>
          <div>UQBw7...EAWbw<br />31 мая 2024</div>
          <div onClick={newShort}><CiCirclePlus /></div>
        </div>
        </IconContext.Provider>

        <div className='video-content' style={{"width":width+"px", "height": height+"px"}}>
          <video  src="https://466462c4806b.vps.myjino.ru/files/BAACAgIAAxkBAAIUg2ZllWN5xrWC22pGOiqgHBFS5YCcAAJnSQACxjAoS-Peez69dlhZNQQ.webm"
                  id="cvideo"   
                  type="video/webm" 
                  autoPlay 
                  loop
                  controls
                  width={width+"px"}  
                  height={height+"px"}>
          </video>
        </div>

        <IconContext.Provider value={{ size: 34 }}>
        <div className='left-buttons'>
          <div onClick={() => WebApp.showAlert("New like!")}>{/*<FaHeart />*/}<FaHeartCircleCheck/></div>
          <div onClick={profile}><FaRegUserCircle /></div>
          <div onClick={comments}><BiCommentDetail /></div>
                    {/*
          <div onClick={publish}><RiSendPlaneFill /></div>
          <div onClick={nftShort}><RiNftFill /></div>
          <div onClick={complaint}><IoTrendingDown /></div>
          */}
        </div>
        </IconContext.Provider>

        <div className='main-button'>

          <div className="title"  onClick={() => WebApp.showAlert(text)}><p>{text}</p></div>

          <div className='info'>
            <div className='data'>{vw+'x'+vh}</div>
            <div className='go'  onClick={() => WebApp.showAlert("Next video!")}>
              <IconContext.Provider value={{ size: 38 }}>
                  <SlArrowDown />
              </IconContext.Provider>
              </div>
            <div className='time'>{Math.round(duration)} с</div>
          </div>
        </div>
    

  </div>
  )
}

export default UserShorts