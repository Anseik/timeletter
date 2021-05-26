import React from "react";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import './css/LetterCard.css';

function NewLetter() {
  const letters = useSelector(state => state.default.user.data.letters);
  console.log(letters,'dldldl');
  // useEffect(()=> {
  // },[letters])
  return (
      <div className="night2">
        <span className="moon"></span>
        <span className="spot1"></span>
        <span className="spot2"></span>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <Link to="/letter/detail">
        <div className="lettercontent2">
            <div style={{fontSize:"20px"}}>레터 이름</div>
            <div style={{fontSize:"35px"}}> 오픈시각 d-day</div>
            <div className="lettercontent" style={{marginTop:"10px", marginBottom:"10px"}}>
          <Chip variant="outlined" size="medium" icon={<FaceIcon />} label="From.조현섭" />
          {/* <Chip variant="outlined" size="small" icon={<FaceIcon />} label="To.조현섭" color="secondary" />
          <Chip variant="outlined" size="small" icon={<FaceIcon />} label="With.캐터피" color="secondary" /> */}
        </div>
        </div>
        </Link>
      </div>

 
  );
}

export default NewLetter;
