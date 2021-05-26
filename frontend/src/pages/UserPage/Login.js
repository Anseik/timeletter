import React, { useState } from "react";
import "./css/Login.css";
import { Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../../constants";
import ScrollToTop from "components/Scroll/ScrollToTop";
import swal from 'sweetalert'


function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let body = {'email':Email, 'password':Password};
    axios.post(BASE_URL+"user/login",body)
      .then((res)=>{
        window.localStorage.setItem("email",Email);
        // console.log(res.data.token);
        window.localStorage.setItem("token",res.data.token);
        window.localStorage.setItem("user_id",res.data.userId);

        window.location.replace("/")
      
      })
      .catch(err => {
        console.log(err)
        // alert('로그인 실패')
        swal("로그인", "아이디 비밀번호를 확인해주세요", "error")
      })
  };

  return (
    <div className="login-wrap" >
      <ScrollToTop />
      <Paper className="papercs" style={{ marginTop: "80px" }}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <Grid container justify="center" className="paperinner">
            <Avatar style={{backgroundColor:"#2D0968"}}>
                <LockOutlinedIcon />
              </Avatar>
            </Grid>
            <Grid container justify="center" className="paperinner2">
              <Typography component="h1" variant="h5">
                Login
              </Typography>
            </Grid>

            <form noValidate onSubmit={onSubmitHandler} className="starfont">
              <TextField
                variant="outlined"
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
                className="starfont"
                style={{fontFamily: 'RIDIBatang'}}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{marginTop:"20px", backgroundColor:"#2D0968"}}
              >
                            <span style={{color:"white",fontSize:"20px"}}>Login</span>
              </Button>
              <Grid container style={{ marginTop: "20px" }}>
            
                <Grid item>
                <Link to="/signup">회원이 아니신가요? <span style={{marginLeft:"5px",fontWeight:"bold",fontSize:"15px"}} className="sratfont">{"회원가입"}</span></Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </Paper>
    </div>
  );
}

export default Login;
