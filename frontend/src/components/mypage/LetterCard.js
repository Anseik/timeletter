import React from "react";
import { Link } from 'react-router-dom';

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import closeletter from "./images/close.png";

import "./css/letter.scss";
import "./css/LetterCard.css";
import "../../pages/Group/GroupDetail.css"

function LetterCard() {
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
    <Card className="">
      <Grid container alignItems="center" className="letterbox">
        <Grid item className="lettercontent">
          <CardContent>
            <Typography variant="subtitle1" color="textSecondary">
              레터 이름
            </Typography>
            <Typography component="h5" variant="h5">
              오픈시각 d-day
            </Typography>
          </CardContent>
        </Grid>
        <Grid item style={{marginRight:"15px"}} >
          <img src={closeletter} style={{ height: "70px", width: "70px" }} className="tossing" />
        </Grid>
        <Grid item className="lettercontent" style={{marginLeft:"10px", marginBottom:"10px"}}>
          <Chip variant="outlined" size="small" icon={<FaceIcon />} label="From.조현섭" color="secondary" />
          {/* <Chip variant="outlined" size="small" icon={<FaceIcon />} label="To.조현섭" color="secondary" />
          <Chip variant="outlined" size="small" icon={<FaceIcon />} label="With.캐터피" color="secondary" /> */}
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

export default LetterCard;
