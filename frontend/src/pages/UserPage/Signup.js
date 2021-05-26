import React, { useState } from "react";
// import { useDispatch } from "react-redux";

import { Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "./css/Login.css";
import "./css/Signup.css";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { useHistory } from "react-router";
import ScrollToTop from '../../components/Scroll/ScrollToTop';
import swal from "sweetalert"

// import { Link } from "react-router-dom";
// const { signUp } = require("../../_actions/user");

function Signup() {
  // const dispatch = useDispatch();
  const history = useHistory();
  const [Email, setEmail] = useState("");
  // const [EmailCheck, setEmailCheck] = useState(false);
  const [Password, setPassword] = useState("");
  const [CheckPassword, setCheckPassword] = useState("");
  const [Name, setName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  // const [EmailOk, setEmailOk] = useState(false);
  const [formState, setFormState] = useState(false);
  const [phoneError, setPhoneError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const onEmailHandler = event => {
    setEmail(event.currentTarget.value);
    // console.log(Email);
    const emailVal = document.getElementById("email").value;
    if (emailVal.match(regExp) != null) {
      // setEmailOk(true);
      setFormState(false);
    } else {
      // setEmailOk(false);
      setFormState(true);
    }
  };

  const onPasswordHandler = event => {
    setPassword(event.target.value);
  };

  const onPasswordCheckHandler = async (event) => {
    await setCheckPassword(event.target.value);
    // console.log(Password, CheckPassword)
    // if (Password !== CheckPassword) {
    //   setPasswordError(true)
    // } else {
    //   setPasswordError(false)
    // }
  };
  const onNameHandler = event => {
    setName(event.currentTarget.value);
  };
  const onPhoneNumberHandler = event => {
    setPhoneNumber(event.currentTarget.value);
    const phoneRegex = /^[0-9]{10}$/;
    if (phoneRegex.test(PhoneNumber)) {
      setPhoneError(false)
    } else {
      setPhoneError(true)
    }
  };

  const onSubmitHandler = event => {
    event.preventDefault();
    if (!Email) {
      return swal("이메일 미입력", "이메일을 입력하세요.", "error")
    } else if (!regExp.test(Email)) {
      return swal("이메일 양식 오류", "이메일 양식을 확인하세요.", "error")
    }
    if (!Name) {
      return swal("이름 미입력", "이름을 입력하세요.", "error")
    }
    if (!PhoneNumber) {
      return swal("휴대폰 번호 미입력", "휴대폰 번호를 입력하세요.", "error")
    } else if (PhoneNumber.length !== 11) {
      return swal("휴대폰 번호 양식 오류", "11자리 휴대폰 번호를 입력하세요. ex) 01012345678", "error")
    }
    // if (!EmailCheck) {
    //   return alert('이메일 인증을 하세요')
    // }
    if (!Password) {
      return swal("비밀번호 미입력", "비밀번호를 입력하세요.", "error")
    }
    if (!CheckPassword) {
      return swal("비밀번호 확인 미입력", "비밀번호 확인을 입력하세요.", "error")
    }
    if (Password !== CheckPassword) {
      return swal("비밀번호 미일치", "비밀번호를 확인하세요", "error")
    }

    let body = {
      email: Email,
      name: Name,
      password: Password,
      phoneNumber: PhoneNumber
    };
    // console.log(body, "!!!!!!");
    axios.post(BASE_URL+"user/join",body)
      .then(res => {
        console.log(res)
        swal("회원가입 성공", "로그인 페이지로 이동", 'success')
        history.push("/login")
      })
      .catch(err => {
        console.log(err)
        swal("아이디 중복", "중복된 아이디 입니다.", "error")
      })
  };

  // let emailCheckForm = null;

  // if (EmailCheck) {
  //   emailCheckForm = (
  //     <>
  //       <Grid item xs={12} sm={6}>
  //         <TextField variant="outlined" margin="normal" required fullWidth label="인증번호 입력" autoFocus type="text" onChange={setEmailCheck} />
  //       </Grid>
  //       <Grid item xs={12} sm={6}>
          
  //         <Button fullWidth variant="contained" color="primary" style={{backgroundColor:"#2D0968"}}>
  //         <span style={{color:"white",fontSize:"17px"}}>확인</span>
  //         </Button>
  //       </Grid>
  //     </>
  //   );
  // }

  return (
    <div className="signupwrap">
      <div className="signup-html">
      <ScrollToTop />
      <Paper className="papercs2" style={{ marginTop: "80px" }}>
        <Container maxWidth="xs" className="">
          <CssBaseline />
          {/* <div> */}
            <Grid container justify="center" className="paperinner">
              <Avatar style={{backgroundColor:"#2D0968"}}>
                <LockOutlinedIcon />
              </Avatar>
            </Grid>

            <Grid container justify="center" className="paperinner2">
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
            </Grid>

            <form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    error={formState}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    type="email"
                    onChange={onEmailHandler}
                  />  
                  {/* {EmailOk ? <></> : <p>이메일 형식을 입력해주세요</p>} */}
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (EmailOk) {
                      setEmailCheck(true);
                      swal("Good job!", "이메일을 사용할 수 있습니다.", "success");}
                      else {
                        swal('warn you','중복된 이메일입니다.',"error")
                      }
                    }}
                    style={{backgroundColor:"#2D0968"}}
                  >
                    <span style={{color:"white",fontSize:"17px"}}>중복 확인</span>
                  </Button>
                </Grid> */}
              </Grid>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onPasswordHandler}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="passwordConfirm"
                label="Password check"
                type="password"
                id="passwordConfirm"
                error={passwordError}
                value={CheckPassword}
                // autoComplete="current-password"
                onChange={onPasswordCheckHandler}
              />

              <TextField autoComplete="fname" margin="normal" name="Name" variant="outlined" required fullWidth id="Name" label="Name" onChange={onNameHandler} />
              <TextField error={phoneError} autoComplete="fname" margin="normal" name="" variant="outlined" required fullWidth id="" label="Phone Number" onChange={onPhoneNumberHandler} placeholder="ex) 01012345678" />
              <Button type="button" fullWidth variant="contained" color="primary" style={{ marginTop: "20px",backgroundColor:"#2D0968" }} onClick={onSubmitHandler}>
              <span style={{color:"white",fontSize:"17px"}}>SIGN UP</span>
              </Button>
            </form>
          {/* </div> */}
        </Container>
        </Paper>
      </div>
    </div>
  );
}

export default Signup;
