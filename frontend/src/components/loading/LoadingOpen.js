import React from 'react';
import video1 from "./OpenLetter.mp4";
import "./LoadingCreate.css";
import { useHistory } from 'react-router-dom';

function LoadingCreate(props) {
  const history = useHistory()

  const endfunction = () => {
    history.push(props.letterUrl)
  }

  return (
    <video
      className="createLoading" 
      src={video1} 
      muted="muted" 
      autoPlay="autoplay"
      onEnded={endfunction}
    ></video>
  )
}

export default LoadingCreate