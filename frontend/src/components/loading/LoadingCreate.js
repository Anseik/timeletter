import React from 'react'
import video1 from "./CreateLetter.mp4"
import "./LoadingCreate.css"
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert'

const LoadingCreate = () => {
  const history = useHistory()

  const endfunction = () => {
    swal("레터 생성완료.", "레터 생성 창이 초기화 됩니다.", "success")
    history.go()
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
