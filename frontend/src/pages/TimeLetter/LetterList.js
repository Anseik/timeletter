import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Container,
  Tabs, 
  Tab,
  Typography,
} from '@material-ui/core'

import bgImage from 'pages/images/sky2.jpg'
import LetterListItem from 'components/timeletter/LetterListItem'
import { BASE_URL, TOKEN } from 'constants/index.js'
import axios from 'axios'
import ScrollToTop from 'components/Scroll/ScrollToTop'


// 스타일
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: `url(${bgImage})`,
    minHeight: '100vh',
    height: '100%',
    width: '100%',
    paddingTop: '70px',
    paddingBottom: '140px',
    color: '#ffcc80'
  },
}))


// 컴포넌트
const LetterList = () => {
  const classes = useStyles()

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    // console.log(newValue)
    setValue(newValue);
  };


  // 오픈여부에 따라 letter를 분류한다.
  const [openLetters, setOpenLetters] = useState([])
  const [notOpenLetters, setNotOpenLetters] = useState([])

  useEffect(() => {
    axios.get(BASE_URL + 'letter/retrieve', {
      headers: {
        Authorization: TOKEN
      }
    })
    .then(res => {
      console.log(res.data)
      const letterList = res.data
      let tmpOpenLetters = []
      let tmpNotOpenLetters = []
      // console.log(letterList.length)
      for (let i = 0; i < letterList.length; i ++) {
        if (letterList[i].open === true) {
          tmpOpenLetters.push(letterList[i])
          // console.log(letterList[i][key])
        } else if (letterList[i].private === false) {
          tmpNotOpenLetters.push(letterList[i])
        }
      }
      setOpenLetters(tmpOpenLetters)
      setNotOpenLetters(tmpNotOpenLetters)
    })
    .catch(err => {
    console.log(err)
    })
  }, [])

  return (
    <Container className={classes.container} maxWidth="xs">
      <ScrollToTop />
      {/* 오픈, 비오픈 구분 탭 */}
      <Tabs
        value={value}
        indicatorColor="secondary"
        onChange={handleChange}
        aria-label="tabs"
        style={{marginBottom:"15px", color:"bisque"}}
      >
        <Tab label="오픈된 레터" />
        <Tab label="비오픈된 레터" />
      </Tabs>

      {/* 오픈, 비오픈 지도 전환 */}
      {/* {value === 0 ? <MapList letters={openLetters} /> : <MapList letters={notOpenLetters} />} */}

      {/* 오픈, 비오픈레터 전환 */}
      {value === 0
        ? openLetters.length > 0 
          ? openLetters.map((openLetter, index) => {
              return <LetterListItem key={index} letter={openLetter} /> 
            })
          : <Typography variant="h5" style={{textAlign: "center", marginTop: '100px'}}>조회 가능한 레터가 없습니다.</Typography>
          
        : notOpenLetters.length > 0
          ? notOpenLetters.map((notOpenLetter, index) => {
            return <LetterListItem key={index} letter={notOpenLetter} />
          })
          : <Typography variant="h5" style={{textAlign: "center", marginTop: '100px'}}>조회 가능한 레터가 없습니다.</Typography>
      }
    </Container>
  );
};

export default LetterList;