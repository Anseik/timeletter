import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Tabs, Tab } from "@material-ui/core";
import MyLetterItem from "./MyLetterItem";

// 스타일
const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '50vh',
    height: "100%",
    width: "100%",
    paddingBottom: "50px",
    color: "#ffcc80",
  },
}));


// 컴포넌트
const MyLetter = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  let letters = props.letterList
  console.log(letters)
  let phone = props.phone
  console.log(phone)

  const handleChange = (event, newValue) => {
    // console.log(newValue)
    setValue(newValue);
  };

  // 오픈여부에 따라 letter를 분류한다.
  const [openLetters, setOpenLetters] = useState([]);
  const [notOpenLetters, setNotOpenLetters] = useState([]);
  //   const letterList = props.letterlist;

  useEffect(() => {
    // console.log(letters)
    if (letters) {
      let tmpOpenLetters = [];
      let tmpNotOpenLetters = [];
      // console.log("letters 있음")
      // console.log(letters.length)
      for (let i = 0; i < letters.length; i++) {
        // console.log(i)
        // console.log(letters[i].targets)
        if (letters[i].targets.length > 0) {
          // console.log(letters[i].targets)
          if (letters[i].targets[0].phoneNumber !== phone) {
            if (letters[i].open === true) {
              tmpOpenLetters.push(letters[i]);
            } else if (letters[i].private === false) {
              tmpNotOpenLetters.push(letters[i]);
            }
          }
        }
      }
      setOpenLetters(tmpOpenLetters);
      setNotOpenLetters(tmpNotOpenLetters);
    }
  }, [letters]);
  console.log(openLetters,'오픈')
  console.log(notOpenLetters,'비오픈')



  return (
    <Container className={classes.container} maxWidth="xs">
      {/* 오픈, 비오픈 구분 탭 */}
      <Tabs
        value={value}
        indicatorColor="secondary"
        onChange={handleChange}
        aria-label="tabs"
        style={{ marginBottom: "15px", color: "bisque" }}
      >
        <Tab label="오픈된 레터" />
        <Tab label="비오픈된 레터" />
      </Tabs>

      {/* 오픈, 비오픈 지도 전환 */}
      {/* {value === 0 ? <MapList letters={openLetters} /> : <MapList letters={notOpenLetters} />} */}

      {/* 오픈, 비오픈레터 전환 */}
      {value === 0
        ? openLetters.map((openLetter, index) => {
            return <MyLetterItem key={index} letter={openLetter} />;
          })
        : notOpenLetters.map((notOpenLetter, index) => {
            return <MyLetterItem key={index} letter={notOpenLetter} />;
          })}
    </Container>
  );
};

export default MyLetter;
