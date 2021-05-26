import React from "react";
import SearchBar from "../components/mainpage/SearchBar";
import img1 from "./UserPage/images/종이비행기.gif";
import { IoIosArrowDown } from "react-icons/all";
import { Link } from "react-router-dom";
import "./css/main.css";
import "./css/main.scss";
import Grid from "@material-ui/core/Grid";
import { BsPencil } from 'react-icons/bs'; 
import { HiOutlineBookOpen } from 'react-icons/hi';
import CountLetters from 'components/mainpage/CountLetters'
import Carousel from 'react-material-ui-carousel'
import main1 from 'static/images/main1.jpg'
import main2 from 'static/images/main2.jpg'
import main3 from 'static/images/main3.jpg'
import main4 from 'static/images/main4.jpg'
import { TOKEN } from "../constants";
import ScrollToTop from "components/Scroll/ScrollToTop";


function Main() {
  const scrolling = () => {
    window.scrollTo({ top: "2000", behavior: "smooth" });
    // console.log("눌림");
  };

  return (
    <div className="main-wrap">
      <ScrollToTop />
      <div className="main-html carousel-wrapper ">
        <div className="section section-1">
          {/* 별똥별 */}
          <div className="night">
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
            <div className="shooting_star"></div>
          </div>
          <div>
            <CountLetters />
            <div onClick={() => window.scrollTo({ top: "680", behavior: "smooth" })}>
              <button className="fill" style={{ width: "170px", height: "40px", borderRadius: "20px", paddingBottom: "10px", marginTop:"15px" }}>
                레터 찾으러가기
              </button>
            </div>
          </div>

          <div className="arrowstyle" onClick={scrolling}>
            <div>사이트 이용법 보기</div>
            <IoIosArrowDown className="floating" />
          </div>
        </div>

        {/* 두번째 메인 */}

        <div className="section section-2">
          <div style={{ color: "white", fontSize:"30px" }}>기분 좋은,</div>
          <div style={{ color: "white" , fontSize:"30px", marginLeft:"70px" }}>설레임 <span style={{fontSize:"15px"}}>with timeletter</span></div>
          <SearchBar></SearchBar>
          <div className="child"></div>
          <Grid container justify="center" alignItems="center" spacing={3}>
            <Grid item xs={5}>
              {TOKEN ? 
              <Link to="/letter/create">
                <div style={{ color: "white", textAlign: "center", fontSize: "20px" }}>
                  <BsPencil />
                </div>
                <div style={{ color: "white", textAlign: "center", fontSize: "17px" }}>답장하기</div>
              </Link>
              :<Link to="/login">
                <div style={{ color: "white", textAlign: "center", fontSize: "20px" }}>
                  <BsPencil />
                </div>
                <div style={{ color: "white", textAlign: "center", fontSize: "17px" }}>답장하기</div>
              </Link>
              }
            </Grid>
            <div className="updown"></div>
            <Grid item xs={5} onClick={scrolling}>
              <div style={{ color: "white", textAlign: "center", fontSize: "20px" }}>
                <HiOutlineBookOpen />
              </div>
              <div style={{ color: "white", textAlign: "center", fontSize: "17px" }}>
                사이트 둘러보기
              </div>
            </Grid>
          </Grid>
        </div>

        {/* 세번째 메인 */}
        <div>
          <Carousel autoPlay={false} animation="slide">
            <div className="section section-3" style={{fontSize: '20px', paddingLeft: '20px', paddingRight: '20px'}}>
              <img src={img1}></img><br/>
              사이트 이용 방법을 확인하시려면<br/>
              좌우로 스와이프하세요
            </div>
            <div><img src={main1} style={{width: '100%', height: '90vh'}} alt="main1" /></div>
            <div><img src={main2} style={{width: '100%', height: '90vh'}} alt="main2" /></div>
            <div><img src={main3} style={{width: '100%', height: '90vh'}} alt="main3" /></div>
            <div><img src={main4} style={{width: '100%', height: '90vh'}} alt="main4" /></div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Main;
