import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import { BASE_URL, TOKEN } from "../../constants";
import sound1 from "pages/sounds/음악1.mp3";
import ReactHowler from "react-howler";
import axios from 'axios'
import "./UpperBar.css";
import {
  Container,
  AppBar,
  Toolbar,
  Grid,
  Button,
  Badge,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  mycolor: {
    backgroundColor: "black !important",
  },
}));

export default function UpperBar() {
  const classes = useStyles()
  const history = useHistory()

  const updateScroll = () => {
    setBarStyle(window.scrollY);
  };
 
  // 로그인 여부를 확인하기 위한 state
  const [isLogin, setIsLogin] = useState(false);

  // 음악 재생 state
  const [isPlay, setIsPlay] = useState(false);

  // 스타일
  const [barStyle, setBarStyle] = useState(null);

  // if (scrollY > 1 && barStyle === null) {
  //   setBarStyle({ backgroundColor: "white !important" });
  // } else if (scrollY === 0 && barStyle !== null) {
  //   setBarStyle(null);
  // }

  // console.log(barStyle)


  // 알림
  const [alarmList, setAlarmList] = useState([])

  const [alarmOpen, setAlarmOpen] = useState(false)

  // 알림 목록 요청
  const getAlarmAxios = () => {
    axios.get(BASE_URL + 'alarm/letters', {
      headers: {
        Authorization: TOKEN
      }
    })
    .then(res => {
      // console.log(res)
      setAlarmList(res.data)
      // setAlarmOpen(!alarmOpen)
    })
    .catch(err => {
      console.log(err)
    })
  }

  // 확인한 알림 삭제
  const deleteAlarmAxios = (alarm) => {
    axios.delete(BASE_URL + 'alarm/letter', {
      headers: {
        Authorization: TOKEN
      },
      params: {
        id: alarm.letter_id
      }
    })
    .then(res => {
      // console.log(res)
      getAlarmAxios()
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleDialogClose = () => {
    setAlarmOpen(false);
  }

  const handleDialogOpen = () => {
    setAlarmOpen(true);
  }

  const handleClickAlarm = (alarm, e) => {
    setAlarmOpen(false);
    // console.log(location)
    deleteAlarmAxios(alarm)
    history.push('/letter/detail/' + alarm.letter_code)
  }


  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  })

  useEffect(() => {
    if (TOKEN) {
      setIsLogin(true);
    }
  }, []);

  useEffect(() => {
    if (TOKEN) {
      getAlarmAxios()
    }
  }, [alarmOpen])


  // 로그인한 유저일 경우 보여줄 상단바
  const userBar = (
    <Grid item xs={6}>
    {/* 알람 버튼 */}
      <Grid container>
        <Grid item xs={3}>
          <IconButton color="inherit" aria-label="notification" onClick={handleDialogOpen}>
            <Badge badgeContent={alarmList.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Dialog
            open={alarmOpen}
            onClose={handleDialogClose}
            aria-labelledby="alarm-dialog-title"
            aria-describedby="alarm-dialog-description"
            fullWidth
          >
            <DialogTitle id="alarm-dialog-title">알림 조회</DialogTitle>
            <DialogContent>
              <DialogContentText id="alarm-dialog-description">
                알림 온 레터 목록
              </DialogContentText>
              <div>
                {alarmList.length > 0
                  ? <List>
                      {alarmList.map((alarm, index) => {
                        return (
                          // <Link to={'letter/detail/' + alarm.letterCode}>
                            <ListItem key={index} alignItems="flex-start" onClick={(e) => handleClickAlarm(alarm, e)}>
                              <ListItemIcon>
                                <MailOutlineOutlinedIcon />
                              </ListItemIcon>
                              <ListItemText primary={'From. ' + alarm.name} secondary={'제목 : ' + alarm.title} />
                            </ListItem>
                          // </Link>
                        )
                      })}
                    </List>
                  : <Typography>확인하지 않은 레터가 없습니다.</Typography>
                }
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary" autoFocus>
                닫기
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        
        {/* 마이페이지 버튼 */}
        <Grid item xs={3}>
          <IconButton color="inherit" aria-label="mypage" onClick={() => history.push("/mypage")}>
            <AccountCircle />
          </IconButton>
        </Grid>
        
        {/* 로그아웃 */}
        <Grid item xs={6}>
          <Button
            color="inherit"
            onClick={() => {
              setIsLogin(false);
              window.localStorage.clear();
              window.location.replace("/");
            }}
            style={{ fontSize: "18px" }}
          >
            로그아웃
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );

  // 로그인하지 않은 게스트일 경우 보여줄 상단바
  const guestBar = (
    <Grid item xs={6}>
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Button color="inherit" onClick={() => history.push("/login")} style={{ fontSize: "18px", marginLeft: 'auto !important' }}>
            로그인
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <Container maxWidth="xs">
    <AppBar position="fixed" className={barStyle > 1 ? "bgnav" : null}>
      <Toolbar>
        <Grid container style={{alignItems: 'center'}}>
          <Grid item xs={3}>
            <Typography className={classes.title} variant="h6" noWrap onClick={() => history.push("/")}>
              TimeLetter
            </Typography>
          </Grid>
          <Grid item xs={3} style={{paddingLeft: '10px'}}>
            <div>
              <ReactHowler src={sound1} playing={isPlay} />
              {isPlay ? (
                <div onClick={() => setIsPlay(false)} style={{ fontSize: "18px" }}>
                  "감성OFF"
                </div>
              ) : (
                <div onClick={() => setIsPlay(true)} style={{ fontSize: "18px" }}>
                  "감성ON"
                </div>
              )}
            </div>
          </Grid>
          {isLogin ? userBar : guestBar}
        </Grid>
      </Toolbar>
    </AppBar>
    </Container>
  );
}
