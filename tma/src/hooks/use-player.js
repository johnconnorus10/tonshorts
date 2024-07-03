import { useState, useEffect } from 'react';

import {  secToObj } from  "../utils/utils";

//import { useTimer } from 'react-timer-hook';

let timerID = null;

export const usePlayer = (videoId) => {

    const [is_play, setIsPlay] = useState(false);
    const [mute, setMute] = useState(false);
    const [sec, setSec] = useState(false);


    let cvideo =  document.getElementById(videoId);



    let duration = 0;


    const tick = () => {

        let tm = cvideo.currentTime;
        setSec(Math.floor(duration - tm));
    };

    const startTimer = () => {
        timerID = setInterval(() => tick(), 1000);
    };

    const stopTimer = () => {
        clearInterval(timerID);
    };

    const shortPlay = () => {

        if(cvideo?.play()) {

            duration = cvideo.duration;
            setIsPlay(true);

            stopTimer();
            startTimer();
        }
    };

    const shortPause = () => {

        cvideo?.pause();

        setIsPlay(false);

        stopTimer();
    };

    const switchOnMute = () => {

        cvideo.muted = !mute;

        setMute(!mute);
    };

    let {m, s} = secToObj(sec); 

    return {
        is_play,
        shortPlay,
        shortPause,
        mute, 
        switchOnMute,
        short_duration: duration,
        short_sec: sec,
        resTime: `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`,
        timerID
    };
};