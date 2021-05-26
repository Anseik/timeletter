import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { BASE_URL, TOKEN } from 'constants/index.js'
import axios from 'axios'
import 'components/mainpage/SearchBar.css'
import swal from 'sweetalert'

function SearchBar() {
  // console.log('서치바 생성')
  const history = useHistory()

  //비밀번호 입력 창 open state
  // const [open, setOpen] = useState(false);

  // 비밀번호 입력 모달 오픈,클로즈
  // const handleOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  const [letterCode, setLetterCode] = useState('')

  // 엔터키 이벤트
  const handleEnter = (e) => {
    // e.preventDefault()
    if(e.key == 'Enter') {
      // console.log('엔터 입력')
      // console.log(letterCode)
      axios.get(BASE_URL + `letter/retrieve/${letterCode}`, {
        headers: {
          Authorization: TOKEN
        }
      })
      .then(res => {
        // console.log(res.data)
        if (res.data == []) {
          // alert('해당 레터번호에 대한 정보가 없습니다.')
          swal("오류", "해당 레터번호에 대한 정보가 없습니다.", "error")
        } else {
          history.push('letter/detail/' + letterCode)
        }
      })
    } 
  }

  // 돋보기 클릭 이벤트
  const handleClick = (e) => {
    e.preventDefault()
    // console.log('돋보기 클릭')
    // console.log(letterCode)
    axios.get(BASE_URL + `letter/retrieve/${letterCode}`, {
      headers: {
        Authorization: TOKEN
      }
    })
    .then(res => {
      // console.log(res.data)
      if (res.data == []) {
        // alert('해당 레터번호에 대한 정보가 없습니다.')
        swal("오류", "해당 레터번호에 대한 정보가 없습니다.", "error")
      } else {
        history.push('letter/detail/' + letterCode)
      }
    })
  }


  return (
    <div style={{marginTop:"50px", marginBottom:"80px"}}>
      <Paper component="form" className="searchbar">
        <InputBase onChange={(e) => setLetterCode(e.target.value)} className="searchinput" placeholder="레터 번호를 입력하세요." onKeyPress={handleEnter} />
        <input type="text" style={{display:"none"}}/> 
        <IconButton className="" type="button" aria-label="search" onClick={handleClick}>
          <SearchIcon />
        </IconButton>
      </Paper>
      <div style={{color:"white",fontSize:"15px",marginTop:"10px"}}>전송 받은 레터 번호를 입력해주세요.</div>
      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"레터 암호를 입력해주세요!"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Password"
            type="text"
            fullWidth
          />
          <DialogContentText id="alert-dialog-description">
            <Link to="/signup" style={{color:"#000080", fontWeight:"bold"}}>회원가입</Link>하고 답장을 보내보세요 :)
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" style={{fontWeight:"bold"}}>
            제출하기
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
}

export default SearchBar;
