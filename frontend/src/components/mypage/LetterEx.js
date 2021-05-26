import React from "react";
import { Link } from 'react-router-dom';

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import closeletter from "./images/open.png";

import "./css/letter.scss";
import "./css/LetterCard.css";

function LetterEx() {
  return (
    //     <div class="letter-image">
    // 	<div class="animated-mail">
    // 		<div class="back-fold"></div>
    // 		<div class="letter">
    // 			<div class="letter-border"></div>
    // 			<div class="letter-title"></div>
    // 			<div class="letter-context"></div>
    // 			<div class="letter-stamp">
    // 				<div class="letter-stamp-inner"></div>
    // 			</div>
    // 		</div>
    // 		<div class="top-fold"></div>
    // 		<div class="body"></div>
    // 		<div class="left-fold"></div>
    // 	</div>
    // 	<div class="shadow"></div>
    // </div>
    <Link to="/letter/detail">
    <Card>
      <Grid container alignItems="center">
        <Grid item sm={9} md={9} square spacing={8}>
          <CardContent>
            <Typography variant="subtitle1" color="textSecondary">
              캡슐 이름 (열린레터 예시)
            </Typography>
            <Typography component="h5" variant="h5">
              오픈시각
            </Typography>
          </CardContent>
        </Grid>
        <Grid>
          <img src={closeletter} style={{ height: "70px", width: "110px" }}/>
        </Grid>
        <Grid item xs={9} style={{ marginLeft: "10px" }}>
          <Chip variant="outlined" size="small" icon={<FaceIcon />} label="From.조현섭" color="secondary" />
          <Chip variant="outlined" size="small" icon={<FaceIcon />} label="To.조현섭" color="secondary" />
          <Chip variant="outlined" size="small" icon={<FaceIcon />} label="With.캐터피" color="secondary" />
        </Grid>
        <Grid item>
          <IconButton aria-label="delete" className="groupletter">
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
    </Link>
  );
}

export default LetterEx;
