import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { 
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Input,
  InputAdornment,
  ButtonGroup,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core'
import TitleRoundedIcon from '@material-ui/icons/TitleRounded'
import CloseIcon from '@material-ui/icons/Close'
import MapIcon from '@material-ui/icons/Map'
import PhoneAndroidOutlinedIcon from '@material-ui/icons/PhoneAndroidOutlined'
import MapCreate from '../../components/timeletter/MapCreate'
import group from 'static/images/group.png'
import bgImage from 'pages/images/sky2.jpg'
import { BASE_URL, TOKEN } from 'constants/index.js'
import axios from 'axios'
import { createMuiTheme } from '@material-ui/core'
import LoadingCreate from 'components/loading/LoadingCreate'
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined'
import './css/lettercreate.css'
import ScrollToTop from 'components/Scroll/ScrollToTop'
import swal from 'sweetalert'


// 테마
const theme = createMuiTheme({
  // palette: {
  //   primary: {
  //     main: '#fff'
  //   }
  // }
})


// 스타일
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: `url(${bgImage})`,
    height: '100%',
    width: '100%',
    paddingTop: '20px',
    paddingBottom: '80px',
    // color: '#fff !important',
  },
  title: {
    marginTop: '40px',
    color: 'white',
  },
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#e8eaf6',
    padding: theme.spacing(0, 2),
    borderRadius:"10px"
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  field: {
    marginBottom: '24px',
    width: '100%',
  },
  upload: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  appBar: {
    position: 'fixed',
  },
  barTitle: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}))

const MapTransition = React.forwardRef(function MapTransition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VideoTransition = React.forwardRef(function VideoTransition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// 컴포넌트
const LetterCreate = () => {
  // console.log('letter-create')
  const classes = useStyles()

  // OS 확인 : ios이면 true, 나머지 os는 false
  function getMobileOperatingSystem() {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
      if (/windows phone/i.test(userAgent)) {
          return false
      }
  
      if (/android/i.test(userAgent)) {
          return false
      }
  
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          return true
      }
  
      return false
  }
  // console.log(getMobileOperatingSystem())

  // 레터 제목
  const [title, setTitle] = useState('')
  // console.log(title)

  // 메세지
  const [message, setMessage] = useState('')
  // console.log(message)

  // 첨부한 영상
  const [file, setFile] = useState(null)
  // console.log(file[0])

  const removeFile = () => {
    // console.log('파일제거')
    setFile(null)
  }

  const handleFile = (e) => {
    // console.log('파일 변경')
    let len = e.target.files[0].name.length
    let extension = e.target.files[0].name.substring(len - 4, len)
    // console.log(e.target.files[0].name.substring(len - 4, len))
    if (e.target.files && e.target.files[0].size > (500 * 1024 * 1024)) {
      alert('파일첨부는 최대 500MB까지 가능합니다.')
    } else if (extension === '.mp4' || extension === '.MOV') {
      setFile(e.target.files)
    } else if (e.target.files.length > 0) {
      alert('.mp4 또는 .mov 파일만 첨부 가능합니다.')
    }
  }

  const showFileName = () => {
    if (file !== null) {
      return <div style={{marginLeft: '0px'}} onClick={removeFile}>{file[0].name}&nbsp;&nbsp;&nbsp;삭제</div>
    }
  }


  // 비공개여부
  const [isPrivate, setIsPrivate] = useState('')
  // console.log(private)
  // ''는 공개, 'true'는 비공개


  // 오픈 날짜
  const getDefaultDay = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + (date.getDate())).slice(-2);
    return year + "-" + month + "-" + day;
  }
  const [openDate, setOpenDate] = useState(getDefaultDay())
  // console.log(openDate)

  // yyyy-mm-dd
  const toDate = (date_str) => {
    let dDay = String(date_str)
    let sYear = dDay.substring(0, 4)
    let sMonth = dDay.substring(5, 7)
    let sDate = dDay.substring(8, 10)

    return new Date(Number(sYear), Number(sMonth) - 1, Number(sDate)).getTime()
  }

  const handleOpenDate = (e) => {
    // console.log(e.target.value)
    let dDay = toDate(e.target.value)
    console.log(dDay)
    let today = new Date()
    console.log(today)
    let distance = dDay - today
    console.log(distance)
    if (distance < -86400000) {
      alert('지난 날은 오픈 조건으로 설정할 수 없습니다.')
    } else {
      setOpenDate(e.target.value)
    }
  }


  // 오픈 장소(위경도)
  const [locOpen, setLocOpen] = useState(false)
  const [mapOpen, setMapOpen] = useState(false)
  const [selectLat, setSelectLat] = useState(null)
  const [selectLng, setSelectLng] = useState(null)
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)

  const handleLocOpen = () => {
    setLocOpen(true)
  }
  const handleLocAgree = () => {
    setLocOpen(false)
    setMapOpen(true)
  }
  const handleLocCancel = () => {
    setLocOpen(false)
  }
  const handleLocDelete = () => {
    setLat(0)
    setLng(0)
    alert('설정된 장소를 삭제했습니다.')
  }
  const handleMapCancel = () => {
    setSelectLat(null)
    setSelectLng(null)
    setMapOpen(false)
  }
  const handleMapSave = () => {
    if (isNaN(selectLat)) {
      setLat(0)
    } else {
      setLat(selectLat)
    }
    if (isNaN(selectLng)) {
      setLng(0)
    } else {
      setLng(selectLng)
    }
    setSelectLat(null)
    setSelectLng(null)
    setMapOpen(false)
  }
  const deleteButton = <Button onClick={handleLocDelete} color="primary" style={{paddingLeft: '0px'}}>장소 삭제</Button>
  

  // 알림
  // const [alarm, setAlarm] = useState('')
  // ''는 일주일 전, 'true'는 한달 전


  // 타겟 설정
  const [target, setTarget] = useState('0')
  // 0은 나에게, 1은 타인에게, 2는 그룹에게
  // console.log(target)

  // 나에게
  const handleTargetMe = () => {
    setTarget('0')
    setPhoneNumbers([])
    setPhoneNumberList([{ phoneNumber: ""}])
    setClubId(null)
    // alert('미래의 나에게 레터를 보냅니다.')
    swal("나에게", "미래의 나에게 레터를 보냅니다", "success")
  }

  // 타인에게
  const [otherOpen, setOtherOpen] = useState(false)
  const [phoneNumbers, setPhoneNumbers] = useState([])
  const [phoneNumberList, setPhoneNumberList] = useState([{ phoneNumber: ""}])

  const handleTargetOther = () => {
    setTarget('1')
    setClubId(null)
    setOtherOpen(true)
  }
  const handleOtherClose = () => {
    setOtherOpen(false)
  }
  // 타인 핸드폰 번호 입력 변경
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...phoneNumberList];
    list[index][name] = value;
    setPhoneNumberList(list);
  };
  // 삭제 클릭시
  const handleRemoveClick = index => {
    const list = [...phoneNumberList];
    list.splice(index, 1);
    setPhoneNumberList(list);
  };
  // 추가 클릭시
  const handleAddClick = () => {
    setPhoneNumberList([...phoneNumberList, { phoneNumber: "" }]);
  };
  // 타인에게 보내기 저장버튼 클릭시
  const handleSaveClick = () => {
    let tmpNumber = []
    let valid = true
    const regex = /^[0-9]{11}$/;
    for (let i = 0; i < phoneNumberList.length; i++) {
      if (regex.test(phoneNumberList[i].phoneNumber)) {
        tmpNumber.push(phoneNumberList[i].phoneNumber)
      } else if (phoneNumberList[i].phoneNumber === "") {

      } else {
        valid = false
      }
    }
    if (valid === true) {
      setPhoneNumbers(tmpNumber)
      setOtherOpen(false)
      swal("타인에게", "입력한 전화번호로 레터를 보냅니다.", "success")
    } else {
      alert('01012345678 형태로 번호를 입력해주세요')
    }
  }

  // 그룹에게
  const [clubOpen, setClubOpen] = useState(false)
  const [selectClubId, setSelectClubId] = useState(null)
  const [clubId, setClubId] = useState(null)
  const [clubList, setClubList] = useState([])

  const handleTargetClub = () => {
    setTarget('2')
    setPhoneNumbers([])
    setPhoneNumberList([{ phoneNumber: ""}])
    setClubOpen(true)

    // 본인이 속한 그룹 목록을 받아오는 axios 요청
    axios.get(BASE_URL + 'club/findMyClub', {
      headers: {
        Authorization: TOKEN,
      }
    })
      .then(res => {
        console.log(res.data)
        setClubList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const handleClubId = (club, e) => {
    setClubId(club.club_id)
    // setSelectClubId(club.club_id)
    // alert(club.club_name+'에 레터를 생성합니다.')
    swal("그룹에게", club.club_name+"에 레터를 생성합니다.", "success")
    setClubOpen(false)
  }
  const handleClubClose = () => {
    setClubOpen(false)
  }
  const handleClubSave = () => {
    // setClubId(selectClubId)
    // setSelectClubId(null)
    setClubOpen(false)
  }


  // 비밀번호
  // const [password, setPassword] = useState()


  // axios 요청 함수
  const sendAxios = () => {
    // formData 생성
        
    let formData = new FormData()
    formData.append(`file`, file[0])

    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
    }


    // NaN 처리
    if (isNaN(lat)) {
      setLat(0)
    }
    if (isNaN(lng)) {
      setLng(0)
    }

    // json axios를 먼저보내고 성공하면 file axios 보내기
    // 나에게, 타인에게 / 그룹에게로 분기
    if (target !== '2') {
      // 나에게, 타인에게
      let body = {
        // userId: 1,
        title: title,
        message: message,
        private: Boolean(isPrivate),
        openDate: openDate,
        latitude: String(lat),
        longitude: String(lng),
        // alert: Boolean(alarm),
        phoneNumber: phoneNumbers,
        clubId: 0,
      }

      console.log(body)
      
      axios.post(BASE_URL + 'letter/create', body, {
        headers: {
          Authorization: TOKEN
        }
      })
      .then(res => {
        console.log(res)
        // 파일 업로드
        // 생성된 letterId를 받아서 요청 주소에 넣는다.
        setVideoOpen(true)
        axios.post(BASE_URL + `letter/save/${res.data}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          params: {
            os: getMobileOperatingSystem(),
          }
        })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      })
      .catch(err => {
        console.log(err)
        swal("오류", "safari 브라우저에서는 지도를 사용할 수 없습니다. 장소를 삭제해주세요", 'error')
      })
    } else {
      // 그룹에게
      let body = {
        // userId: 1,
        title: title,
        message: message,
        private: Boolean(isPrivate),
        openDate: openDate,
        latitude: String(lat),
        longitude: String(lng),
        // alert: Boolean(alarm),
        clubId: clubId,
      }

      console.log(body)

      axios.post(BASE_URL + 'letter/create', body, {
        headers: {
          Authorization: TOKEN
        }
      })
      .then(res => {
        console.log(res)
        // 파일 업로드
        // 생성된 letterId를 받아서 요청 주소에 넣는다.
        setVideoOpen(true)
        axios.post(BASE_URL + `letter/save/${res.data}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          params: {
            os: getMobileOperatingSystem(),
          }
        })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
          alert('해당 영상은 업로드 할 수 없습니다.')
        })
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  // submit
  function onSubmit (e) {
    e.preventDefault()

    // 필수 요소가 모두 입력되었는지 확인하는 로직 필요
    if (title !== '' && message !== '' && file !== null) {
      // swal("레터를 생성합니다.", "잠시만 기다려 주세요", "success")
      sendAxios()
    } else {
      alert('필수 요소를 모두 입력해주세요')
    }
  }

  // video
  const [videoOpen, setVideoOpen] = useState(false)

  const handleVideoClose = () => {
    setVideoOpen(false)
  }


  // ************** return ****************
  return (
    <Container className={classes.container} maxWidth="xs">
      <ScrollToTop />
      <Typography className={classes.title} variant="h6">레터생성</Typography>
      {/* 캡슐 정보 */}
      <div className={classes.paper}>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container direction="column">

            {/* 캡슐 이름 */}
            <Grid item>
              <FormControl className={classes.field}>
                <FormLabel>레터이름*</FormLabel>
                <Input
                  onChange={(e) => setTitle(e.target.value)}
                  id="title"
                  placeholder="이름을 입력해주세요"
                  fullWidth
                  required
                  startAdornment={
                    <InputAdornment position="start">
                      <TitleRoundedIcon />
                    </InputAdornment>
                  }
                  style={{marginTop: '4px'}}
                />
              </FormControl>
            </Grid>

            {/* 메모 */}
            <Grid item>
              <FormControl className={classes.field}>
                <TextField
                  onChange={(e) => setMessage(e.target.value)}
                  id="message"
                  label="메세지"
                  multiline
                  rows={4}
                  variant="outlined"
                  defaultValue={message}
                  placeholder="메세지를 남겨보세요"
                  required
                />
              </FormControl>
            </Grid>

            {/* 파일 업로드 */}
            <Grid item>
              <FormControl className={classes.field}>
                <FormLabel>영상 업로드*</FormLabel>
                <div className={classes.upload}>
                  <label className="custom-file-upload" style={{minWidth: '90px'}}>
                    <input
                      onChange={handleFile}
                      type="file"
                      id="file-upload"
                      required
                      variant="outlined"
                      style={{marginTop: '4px'}}
                      name="file-upload"
                      accept="video/mp4"
                    />
                    <CloudUploadOutlinedIcon size="large" style={{marginRight: '10px'}} /> 업로드
                  </label>
                  {showFileName()}
                </div>
              </FormControl>
            </Grid>

            {/* 파일 업로드 */}
            {/* <Grid item>
              <FormControl className={classes.field}>
                <FormLabel>영상 업로드*</FormLabel>
                <input 
                  onChange={(e) => setFile(e.target.files)}
                  type="file"
                  id="file"
                  required
                  variant="outlined"
                  style={{marginTop: '4px'}}
                  name="file"
                  accept="video/mp4"
                />
              </FormControl>
            </Grid> */}

            {/* 비공개설정 */}
            <Grid item>
              <FormControl className={classes.field}>
                <FormLabel>공개여부*</FormLabel>
                <RadioGroup value={isPrivate} onChange={(e) => setIsPrivate(e.target.value)}>
                  <Grid container spacing={2}>
                    <Grid item><FormControlLabel value='' control={<Radio />} label="공개" /></Grid>
                    <Grid item><FormControlLabel value="true" control={<Radio />} label="비공개" /></Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* 오픈조건 설정 */}
            <Grid item>
              <FormLabel>오픈조건*</FormLabel>
              <Grid container>
                <Grid item>
                  <TextField
                    onChange={handleOpenDate}
                    id="openDate"
                    type="date"
                    defaultValue={openDate}
                    className={classes.field}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{paddingTop: '8px'}}
                    inputProps={{ 
                      min: getDefaultDay()
                    }}
                  />
                </Grid>
                <Grid item>
                  <IconButton onClick={handleLocOpen} style={{marginLeft: '5px'}}>
                    <MapIcon />
                  </IconButton>

                  {lat === 0 ? null : deleteButton}

                  {/* 장소 등록 여부 확인 */}
                  <Dialog
                    open={locOpen}
                    onClose={handleLocCancel}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    {/* 오픈 장소 설정 ver */}
                    {/* <DialogTitle id="alert-dialog-title">레터 오픈 장소를 설정하시겠습니까?</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        오픈 장소를 설정하면 사용자의 위치를 GPS로 확인하여 해당 장소 부근에서만 레터를 열어볼 수 있습니다.
                      </DialogContentText>
                    </DialogContent> */}

                    {/* 추억의 장소 저장 ver */}
                    <DialogTitle id="alert-dialog-title">추억의 장소를 저장하시겠습니까?</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        <div>추억의 장소를 저장하시면 레터 조회 시 해당 위치가 지도에 표시됩니다.</div>
                        <div>* safari 브라우저는 지원하지 않습니다.</div>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleLocCancel} color="primary">
                        취소
                      </Button>
                      <Button onClick={handleLocAgree} color="primary" autoFocus>
                        설정
                      </Button>
                    </DialogActions>
                  </Dialog>                                    

                  {/* 위치 설정 창 */}
                  <Dialog fullScreen open={mapOpen} onClose={handleMapCancel} TransitionComponent={MapTransition}>
                    <AppBar className={classes.appBar}>
                      <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleMapCancel} aria-label="close">
                          <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.barTitle}>
                          추억의 장소
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleMapSave}>
                          저장
                        </Button>
                      </Toolbar>
                    </AppBar>
                    <MapCreate
                      onChangeLat = {(selectLat) => setSelectLat(selectLat)}
                      onChangeLng = {(selectLng) => setSelectLng(selectLng)}
                    />
                  </Dialog>
                </Grid>
              </Grid>
            </Grid>

            {/* 알림 설정 */}
            {/* <Grid item>
              <FormControl className={classes.field}>
                <FormLabel>알림설정*</FormLabel>
                <RadioGroup value={alarm} onChange={(e) => setAlarm(e.target.value)}>
                  <Grid container spacing={2}>
                    <Grid item><FormControlLabel value='' control={<Radio />} label="일주일 전" /></Grid>
                    <Grid item><FormControlLabel value="true" control={<Radio />} label="한달 전" /></Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid> */}

            {/* 수신대상 */}
            <FormLabel>수신대상*</FormLabel>
            <ButtonGroup variant="outlined" color="primary" fullWidth style={{marginTop: '8px'}}>
              <Button onClick={handleTargetMe}>나에게</Button>
              <Button onClick={handleTargetOther}>타인에게</Button>
              <Button onClick={handleTargetClub}>그룹에게</Button>
            </ButtonGroup>

            {/* 타인 핸드폰 번호 입력창 */}
            <Dialog
              open={otherOpen}
              onClose={handleOtherClose}
              aria-labelledby="other-dialog-title"
              aria-describedby="other-dialog-description"
            >
              <DialogTitle id="other-dialog-title">핸드폰 번호를 입력하세요</DialogTitle>
              <DialogContent>
                <DialogContentText id="other-dialog-description">
                  오픈 시간이 임박하면 레터 수신자에게 문자 알림이 전송됩니다.
                </DialogContentText>
                <div className="phoneBox">
                  {phoneNumberList.map((x, i) => {
                    return (
                      <Grid container key={i}>
                        <Grid item xs={8}>
                          <Input
                            name="phoneNumber"
                            value={x.phoneNumber}
                            onChange={(e) => handleInputChange(e, i)}
                            id="phonenumber"
                            placeholder="01012345678"
                            autoFocus
                            startAdornment={
                              <InputAdornment position="start">
                                <PhoneAndroidOutlinedIcon />
                              </InputAdornment>
                            }
                          />
                        </Grid>
                        <Grid item xs={2}>
                          {phoneNumberList.length !== 1 && <Button onClick={() => handleRemoveClick(i)}>삭제</Button>}
                        </Grid>
                        <Grid item xs={2}>
                          {phoneNumberList.length - 1 === i && <Button onClick={() => handleAddClick()}>추가</Button>}
                        </Grid>
                      </Grid>
                    )
                  })}
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleOtherClose} color="primary">
                  취소
                </Button>
                <Button onClick={handleSaveClick} color="primary" autoFocus>
                  저장
                </Button>
              </DialogActions>
            </Dialog>

            {/* 그룹 선택창 */}
            <Dialog
              open={clubOpen}
              onClose={handleClubClose}
              aria-labelledby="club-dialog-title"
              aria-describedby="club-dialog-description"
            >
              <DialogTitle id="club-dialog-title">그룹을 선택하세요</DialogTitle>
              <DialogContent>
                <DialogContentText id="club-dialog-description">
                  그룹이 공유하는 레터를 생성할 수 있습니다. 그룹 레터를 오픈하려면 그룹원의 동의가 필요합니다.
                </DialogContentText>
                <div className="clubBox">
                  <List>
                    {clubList.map((club, index) => {
                      // console.log('클럽')
                      return (
                        <ListItem key={index} alignItems="flex-start" onClick={(e) => handleClubId(club, e)}>
                          <ListItemAvatar>
                            <Avatar alt="clubimage" src={group} />
                          </ListItemAvatar>
                          <ListItemText primary={club.club_name} secondary={club.club_desc} />
                        </ListItem>
                      )
                    })}
                  </List>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClubClose} color="primary">
                  취소
                </Button>
                <Button onClick={handleClubSave} color="primary" autoFocus>
                  저장
                </Button>
              </DialogActions>
            </Dialog>

            {/* 비밀번호 입력 */}
            {/* <Grid item style={{marginTop: '24px'}}>
              <FormControl className={classes.field}>
                <FormLabel>키 설정*</FormLabel>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  color="secondary"
                  placeholder="오픈 키를 입력해주세요"
                  fullWidth
                  required
                  startAdornment={
                    <InputAdornment position="start">
                      <VpnKeyOutlinedIcon />
                    </InputAdornment>
                  }
                  style={{marginTop: '4px'}}
                />
              </FormControl>
            </Grid> */}
            
            {/* submit */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{backgroundColor: '#2D0968'}}
            >
              레터 생성
            </Button>

            <Dialog fullScreen open={videoOpen} onClose={handleVideoClose} TransitionComponent={VideoTransition}>
              <LoadingCreate />
            </Dialog>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default LetterCreate;