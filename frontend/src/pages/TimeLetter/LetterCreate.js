import React, { useEffect, useState } from 'react'
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
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined'
import PhoneAndroidOutlinedIcon from '@material-ui/icons/PhoneAndroidOutlined'
import MapCreate from '../../components/timeletter/MapCreate'
import group from 'static/images/group.png'
import bgImage from 'pages/images/sky2.jpg'
import { BASE_URL, USER_ID, TOKEN } from 'constants/index.js'
import axios from 'axios'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'

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

// 컴포넌트
const LetterCreate = () => {
  // console.log('letter-create')
  const classes = useStyles()

  // 레터 제목
  const [title, setTitle] = useState('')
  // console.log(title)

  // 메세지
  const [message, setMessage] = useState(null)
  // console.log(message)

  // 첨부한 영상
  const [file, setFile] = useState(null)
  // console.log(file[0])

  // 비공개여부
  const [isPrivate, setIsPrivate] = useState('')
  // console.log(private)
  // ''는 공개, 'true'는 비공개

  // 오픈 날짜
  const getToday = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
  }
  const [openDate, setOpenDate] = useState(getToday())
  // console.log(openDate)

  // 오픈 장소(위경도)
  const [locOpen, setLocOpen] = useState(false)
  const [mapOpen, setMapOpen] = useState(false)
  const [selectLat, setSelectLat] = useState(null)
  const [selectLng, setSelectLng] = useState(null)
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)

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
    setLat(null)
    setLng(null)
    alert('설정된 장소를 삭제했습니다.')
  }
  const handleMapCancel = () => {
    setSelectLat(null)
    setSelectLng(null)
    setMapOpen(false)
  }
  const handleMapSave = () => {
    setLat(selectLat)
    setLng(selectLng)
    setSelectLat(null)
    setSelectLng(null)
    setMapOpen(false)
  }
  const deleteButton = <Button onClick={handleLocDelete} color="primary" style={{paddingLeft: '0px'}}>장소 삭제</Button>
  

  // 알림
  const [alarm, setAlarm] = useState('')
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
    alert('미래의 나에게 레터를 보냅니다.')
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
    for (let i = 0; i < phoneNumberList.length; i++) {
      if (phoneNumberList[i].phoneNumber !== "") {
        tmpNumber.push(phoneNumberList[i].phoneNumber)
      }
    }
    setPhoneNumbers(tmpNumber)
    setOtherOpen(false)
  }

  // 그룹에게
  const [clubOpen, setClubOpen] = useState(false)
  const [selectClubId, setSelectClubId] = useState(null)
  const [clubId, setClubId] = useState(null)
  const [clubList, setClubList] = useState(
    [
      {id: 1, name: 'club1', info: 'club1입니다'},
      {id: 2, name: 'club2', info: 'club2입니다'},
      {id: 3, name: 'club3', info: 'club3입니다'},
      {id: 4, name: 'club4', info: 'club4입니다'},
      {id: 5, name: 'club5', info: 'club5입니다'},
    ]
  )

  const handleTargetClub = () => {
    setTarget('2')
    setPhoneNumbers([])
    setPhoneNumberList([{ phoneNumber: ""}])
    setClubOpen(true)

    // 본인이 속한 그룹 목록을 받아오는 axios 요청
    // console.log(USER_ID)
    axios.get(BASE_URL + 'club/findMyClub', {
      params: {
        id: USER_ID,
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
    setSelectClubId(club.clubId)
    alert(club.clubName+'에 레터를 생성합니다.')
  }
  const handleClubClose = () => {
    setClubOpen(false)
  }
  const handleClubSave = () => {
    setClubId(selectClubId)
    setSelectClubId(null)
    setClubOpen(false)
  }


  // 비밀번호
  const [password, setPassword] = useState()
  

  useEffect(() => {

  }, [])


  // submit
  const onSubmit = (e) => {
    e.preventDefault()

    // 나에게, 타인에게 / 그룹에게로 분기
    // json axios를 먼저보내고 성공하면 file axios 보내기
    // formData 수정 필요
    let params = {
      userId: 1,
      title: title,
      message: message,
      file: file[0],
      private: Boolean(isPrivate),
      openDate: openDate,
      latitude: lat,
      longitude: lng,
      alert: Boolean(alarm),
      target: Number(target),
      password: password
    }

    console.log(params)

    let formData = new FormData()
    formData.append('userId', 1)
    formData.append('title', title)
    formData.append('message', message)
    formData.append(`file`, file[0])
    formData.append('private', Boolean(isPrivate))
    formData.append('openDate', openDate)
    formData.append('latitude', lat)
    formData.append('longitude', lng)
    formData.append('alert', Boolean(alarm))
    formData.append('target', Number(target))

    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
    }

    // for (let i =0; i < files.length; i++) {
    //   formData.append(`file[${i}]`, files[i])
    // }
    
  }

  return (
    <Container className={classes.container} maxWidth="xs">
      <Typography className={classes.title} variant="h6">레터생성</Typography>
      {/* 캡슐 정보 */}
      <div className={classes.paper}>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container direction="column">

            {/* 캡슐 이름 */}
            <Grid item>
              <FormControl className={classes.field}>
                <FormLabel>레터이름</FormLabel>
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
                />
              </FormControl>
            </Grid>

            {/* 파일 업로드 */}
            <Grid item>
              <FormControl className={classes.field}>
                <FormLabel>영상 업로드</FormLabel>
                <input 
                  onChange={(e) => setFile(e.target.files)}
                  type="file"
                  id="file"
                  required
                  variant="outlined"
                  style={{marginTop: '4px'}}
                  name="files"
                />
              </FormControl>
            </Grid>
            
            {/* 비공개설정 */}
            <Grid item>
              <FormControl className={classes.field}>
                <FormLabel>공개여부</FormLabel>
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
              <FormLabel>오픈조건</FormLabel>
              <Grid container>
                <Grid item>
                  <TextField
                    onChange={(e) => setOpenDate(e.target.value)}
                    id="openDate"
                    type="date"
                    defaultValue={openDate}
                    className={classes.field}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{paddingTop: '8px'}}
                  />
                </Grid>
                <Grid item>
                  <IconButton onClick={handleLocOpen} style={{marginLeft: '5px'}}>
                    <MapIcon />
                  </IconButton>

                  {lat == null ? null : deleteButton}

                  {/* 장소 등록 여부 확인 */}
                  <Dialog
                    open={locOpen}
                    onClose={handleLocCancel}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">레터 오픈 장소를 설정하시겠습니까?</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        오픈 장소를 설정하면 사용자의 위치를 GPS로 확인하여 해당 장소 부근에서만 레터를 열어볼 수 있습니다.
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
                          오픈 장소 설정
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
            <Grid item>
              <FormControl className={classes.field}>
                <FormLabel>알림설정</FormLabel>
                <RadioGroup value={alarm} onChange={(e) => setAlarm(e.target.value)}>
                  <Grid container spacing={2}>
                    <Grid item><FormControlLabel value='' control={<Radio />} label="일주일 전" /></Grid>
                    <Grid item><FormControlLabel value="true" control={<Radio />} label="한달 전" /></Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* 수신대상 */}
            
            <FormLabel>수신대상</FormLabel>
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
                            placeholder="010-0000-0000"
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
                          <ListItemText primary={club.clubName} secondary={club.clubDesc} />
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
            <Grid item style={{marginTop: '24px'}}>
              <FormControl className={classes.field}>
                <FormLabel>키 설정</FormLabel>
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
            </Grid>
            
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
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default LetterCreate;