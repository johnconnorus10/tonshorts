import { useState, useEffect } from 'react'

import { useResize } from '../../hooks/use-resize';
import { useVideo } from '../../hooks/use-video';

import './shorts.scss'

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
import { IoMdPlayCircle } from "react-icons/io";
import { CiPause1 } from "react-icons/ci";

import { GoUnmute } from "react-icons/go";
import { GoMute } from "react-icons/go";

import {useNavigate} from 'react-router-dom';

import { useSwipeable, UP, LEFT, RIGHT } from 'react-swipeable';

import WebApp from '@twa-dev/sdk'

import { useShortVideoContract } from "../../hooks/use-short-video-contract";

import { useTonConnect } from "../../hooks/use-tonconnect";
import { useUserBalance  } from  "../../hooks/use-user-balance";

import { usePlayer  } from  "../../hooks/use-player";
import { colorRank } from  "../../utils/utils";


import axios from "axios";


function Shorts() {
  const navigate = useNavigate();

  const back = () => navigate('/');
  const newShort = () => navigate('/new-short');
  const profile = (id) => navigate('/profile/'+id);
  const comments = () => navigate('/comments');
  //const publish = () => navigate('/publish');
  //const nftShort = () => navigate('/nft-short');
  const complaint = () => navigate('/complaint');

  const { width, height } = useResize();


const {name, url, user, nextVideo} = useShortVideoContract();
const { width: vw, height: vh, duration  } = useVideo("cvideo", url);

const {wallet} = useTonConnect();
const {points, updatePoints}  = useUserBalance(wallet);

const { is_play, shortPlay, shortPause, mute, switchOnMute, resTime }  = usePlayer("cvideo");


const [color, setColor]  = useState(colorRank(points));

const [sec, setSec] = useState(0);
const [score, setScore] = useState("");




useEffect(() => {
  setColor(colorRank(points));

}, [points]);



let nextShort = async() => {
  let srvScore = 0;

  if(duration >= 10) { 

    let api = await axios.get('https://asqi.ru/api.php', {
      params: {
        addr: wallet,
        sec: duration,
        submit: "submit"
      }
    });

    srvScore = api.data;

  } else {

    if(sec < 10)  {
      setSec(sec + duration);
    } else {

      let api = await axios.get('https://asqi.ru/api.php', {
        params: {
          addr: wallet,
          sec,
          submit: "submit"
        }
      });

      srvScore = api.data;

      setSec(0);
    }
  }

  if(!isNaN(srvScore) && srvScore > 0) {
      setScore(srvScore);
  }

  nextVideo("cvideo");

  updatePoints();

  setColor(colorRank(points));

};

// Swaped ----------
const handleSwiped = (eventData) => {

  if (eventData.dir === UP) {
      nextShort();
  } else if(eventData.dir === LEFT) {
     profile();

  } else if(eventData.dir === RIGHT) {
    back();

  }
   
};

const handlers = useSwipeable({
  onSwiped: handleSwiped,
  onTouchStartOrOnMouseDown: (({ event }) => event.preventDefault()),
  touchEventOptions: { passive: false },
  preventScrollOnSwipe: true,
  trackMouse: true
});

// \ Swaped --------
useEffect(() => {

        // start video
        setTimeout(() => {
          shortPlay(); 
      }, 500);
  

}, [duration]);



  return (<div className='shorts'>

        <IconContext.Provider value={{ size: 45 }}>
        <div className='top-buttons'>
          <div onClick={back}><CiCircleChevLeft /></div>
          <div>&nbsp;</div>
          <div onClick={newShort}><CiCirclePlus /></div>
        </div>
        </IconContext.Provider>

     <div className='video-content'
      {...handlers} 
      style={{"width":width+"px", "height": height+"px"}}
     >

      {url ==""?<img src="/img/loading.gif" style={{"width":width+"px"}}/>
      :<video id="cvideo" 
              style={{"width":width+"px", "height": height+"px"}}  
              loop
              width={width+"px"}  
              height={height+"px"}
              poster="/img/to_play.gif"
              src={url} 
              type="video/webm"
              >
        </video>}
       
        </div>
   

        <IconContext.Provider value={{ size: 34 }}>
        <div className='left-buttons'>
                  
                  
     {/*
          <div onClick={() => WebApp.showAlert("New like!")}><FaHeart /><FaHeartCircleCheck/></div>
          <div onClick={profile}><FaRegUserCircle /></div>
          <div onClick={comments}><BiCommentDetail /></div>

          <div onClick={publish}><RiSendPlaneFill /></div>
          <div onClick={nftShort}><RiNftFill /></div>
       

          <div onClick={complaint}><IoTrendingDown /></div>

          <div>&nbsp;</div>
             */}

          <div onClick={() => profile(user)}><FaRegUserCircle /></div>

          {!is_play?<div onClick={shortPlay}><IoMdPlayCircle /></div>:
          <div onClick={shortPause}><CiPause1 /></div>}

          {!mute?<div onClick={switchOnMute}><GoUnmute /></div>:
          <div onClick={switchOnMute}><GoMute /></div>}

        </div>
        </IconContext.Provider>

        <div className='main-button'>

          <div className="title"  onClick={() => WebApp.showAlert(name)}>
            <p>{name}</p>
            
            </div>

          <div className='info'>
            <div className='score'  onClick={() => navigate('/balance')}>
                <div className='score-plus'>{score > 0?<span>{"+"+score}</span>:<span>&nbsp;</span>}</div>
                <div className={'score-points '+color}>{points} points</div>
            </div>
            <div className='go'  onClick={nextShort}>
              <IconContext.Provider value={{ size: 38 }}>
                  <SlArrowDown />
              </IconContext.Provider>
              </div>
            <div className='time'>
           
              <div className='time-num'>
                   {resTime}
              </div>
              <div className={'time-rank '+color}>{color}</div>
            </div>
          </div>
        </div>
    

  </div>
  )
}

export default Shorts