import React from 'react'

import { Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import "./css/Login.css";
import "./css/UserUpdate.css";
import ScrollToTop from 'components/Scroll/ScrollToTop';

function UserUpdate() {
    return (
      <div className="login-wrap" >
      <ScrollToTop />

      <Paper className="papercs" style={{ marginTop: "80px" }}>
        <Container maxWidth="xs" className="">
          <CssBaseline />
          <div>
            <Grid container justify="center" className="paperinner">
            <Avatar src="/broken-image.jpg" style={{backgroundColor:"#2D0968"}} />
            </Grid>

            <Grid container justify="center" className="paperinner2">
              <Typography component="h1" variant="h5">
              (name) 님 회원정보 수정
              </Typography>
            </Grid>

            <form noValidate>

              <TextField variant="outlined" margin="normal" required fullWidth name="password" label="변경할 비밀번호" type="password" id="password" autoComplete="current-password" />
              <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password check" type="password" id="password" autoComplete="current-password" />
              <TextField autoComplete="fname" margin="normal" name="" variant="outlined" required fullWidth id="" label="Phone Number"/>
              <Button type="submit" fullWidth variant="contained" style={{marginTop:"20px", backgroundColor:"#2D0968"}}>
              <span style={{color:"white",fontSize:"20px"}}>수정하기</span>
              </Button>
            </form>
          </div>
        </Container>
</Paper>
    </div>
    )
}

export default UserUpdate
