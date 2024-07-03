import { useState, useEffect } from 'react';

export const useVideo = (videoId, url) => {
    const [vh, setVH] = useState(0);
    const [vw, setVW] = useState(0);
    const [vduration, setVDuration] = useState(0);

  useEffect(() => {
    const handleVideo = function(event) {
        setVW(this.videoWidth);
        setVH(this.videoHeight);
        setVDuration(this.duration); //длительность видео в секундах
    };

    let video = document.getElementById(videoId);
    video?.addEventListener('loadeddata', handleVideo);


    setTimeout(() => {
      let video = document.getElementById(videoId);
      video?.addEventListener('loadeddata', handleVideo);

    }, 2000);


    return () => {
        video?.removeEventListener('loadeddata', handleVideo);
    };
  }, [url]);

  return {
    width: vw,
    height: vh,
    duration: vduration
  };
};