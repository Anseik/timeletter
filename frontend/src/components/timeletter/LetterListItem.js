import React, { useState } from 'react'
import {
  Chip,
  Dialog,
  Slide,
} from '@material-ui/core'
import FaceIcon from '@material-ui/icons/Face'
import './css/LetterListItem.css'
import LoadingOpen from 'components/loading/LoadingOpen'


const VideoTransition = React.forwardRef(function VideoTransition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})


const LetterListItem = (props) => {
  // const history = useHistory()

  let letter = props.letter

  const sender = 'From. ' + letter.userName

  const letterUrl = 'detail/' + letter.letterCode

  // video
  const [videoOpen, setVideoOpen] = useState(false)
  const handleVideoClose = () => {
    setVideoOpen(false)
  }

  const handleClick = () => {
    if (letter.open === true) {
      setVideoOpen(true)
      // alert('레터 상세조회로 이동합니다.')
      // history.push(letterUrl)
    } else {
      alert('비오픈 레터는 조회할 수 없습니다.')
    }
  }

  const [openInfo, setOpenInfo] = useState('오픈날짜 ' + letter.openDate)
  const [closeInfo, setCloseInfo] = useState('')

  

  // yyyy-mm-dd ==> Date객체
  const toDate = (date_str) => {
    let dDay = String(date_str)
    let sYear = dDay.substring(0, 4)
    let sMonth = dDay.substring(5, 7)
    let sDate = dDay.substring(8, 10)

    return new Date(Number(sYear), Number(sMonth) - 1, Number(sDate)).getTime()
  }

  const dDayCounter = () => {
    let dDay = toDate(letter.openDate)
    setInterval(function() {
			let now = new Date() //현재 날짜 가져오기
			let distance = dDay - now;
			let d = Math.floor(distance / (1000 * 60 * 60 * 24))
			let h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
			// let m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
			let s = Math.floor((distance % (1000 * 60)) / 1000)
			let view = ''
			if(s < 10){
				s = '0' + s
			}
			if (distance < 0) {
				setOpenInfo('오픈날짜 ' + letter.openDate)
			} else {
				if (d > 0) {
					view = view + d + '일 '
				}
				if (h > 0) {
					view = view + h + '시간 '
				}
				// if (m > 0) {
				// 	view = view + m + '분 '
				// }
        // if (s > 0) {
				// 	view = view + s + '초'
				// }
				setCloseInfo('오픈까지 ' + view)
			}
		}, 1000)
  }

  dDayCounter()

  // console.log(openInfo)
  // console.log(closeInfo)

  const getInfo = () => {
    if (letter.open) {
      return <div style={{fontSize:"20px", color: '#fff'}}> {openInfo}</div>
    } else {
      return <div style={{fontSize:"20px", color: '#fff'}}> {closeInfo}</div>
    }
  }

  return (
    <div onClick={handleClick}>
      <div className="trashnone">
        <div className="night2">
          <span className="moon"></span>
          <span className="spot1"></span>
          <span className="spot2"></span>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div>
            <div className="lettercontent2">
              <div className="lettercontent" style={{marginTop:"10px", marginBottom:"10px"}}>
                <Chip variant="outlined" size="medium" icon={<FaceIcon />} label={sender} color="primary" />
              </div>
              <div style={{fontSize:"20px", color: '#fff'}}>{letter.title}</div>
              {getInfo()}
            </div>
          </div>
        </div>          
      </div>
      <Dialog fullScreen open={videoOpen} onClose={handleVideoClose} TransitionComponent={VideoTransition}>
        <LoadingOpen letterUrl={letterUrl} />
      </Dialog>
    </div>
  );
};

export default LetterListItem;