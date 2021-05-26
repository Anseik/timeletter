import './App.css';
import { Route, Switch,Redirect } from 'react-router-dom';
import { createMuiTheme, ThemeProvider, Container } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import UpperBar from './components/bar/UpperBar';
import BottomBar from './components/bar/BottomBar';
import LoadingCreate from './components/loading/LoadingCreate';
import LoadingOpen from './components/loading/LoadingOpen';
import * as All from './pages';
import { BrowserView, MobileView } from "react-device-detect";
import qrcode from "static/images/큐알코드.jpg"
import { TOKEN } from './constants';

const theme = createMuiTheme({
  typography: {
    // fontFamily: 'Cute+Font'
    // fontFamily: 'Jua',
    fontFamily: 'Cafe24Oneprettynight',

  }
})

function App() {
  return (
    <div className='app'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserView> 
        <Container style={{width: "100%", height: "100%",textAlign: "center", marginRight: "0px"}}>
          <div className="sentences" style={{display:"flex",justifyContent:"center",fontSize:"2rem",}}>
            <p className="character-1" style={{color:"purple", marginTop: '10px', marginBottom: '0px'}}>타</p>
            <p className="character-2" style={{color:"purple", marginTop: '10px', marginBottom: '0px'}}>임</p>
            <p className="character-3" style={{color:"purple", marginTop: '10px', marginBottom: '0px'}}>레</p>
            <p className="character-4" style={{color:"purple", marginTop: '10px', marginBottom: '0px'}}>터</p>
            <p className="character-5" style={{color:"purple", marginTop: '10px', marginBottom: '0px'}}>페</p>
            <p className="character-6" style={{color:"purple", marginTop: '10px', marginBottom: '0px'}}>이</p>
            <p className="character-7" style={{color:"purple", marginTop: '10px', marginBottom: '0px'}}>지</p>
          </div>
          <div style={{}}>
            <img style={{width:"100px",height:"100px"}} src={qrcode} alt="qrcode"></img>
            <p style={{fontSize:"1rem", marginTop: '0px', marginBottom: '0px'}}>모바일에서 접속해주세요.</p>
            <p style={{fontSize:"0.5rem", marginTop: '0px', paddingBottom: '10px'}}> * 아이폰 사파리 브라우저는 지도 기능을 지원하지 않습니다.</p>
          </div>
        </Container>
        </BrowserView>

        <MobileView>
          <UpperBar></UpperBar>
          <Switch>
            <Route path="/" exact={true} component={All.Main} />

            <Route path="/signup" exact={true} component={All.Signup} />
            <Route path="/login" exact={true} component={All.Login} />

            <Route exact path="/mypage">  {TOKEN ? <All.Mypage /> : <Redirect to="/login" />}</Route>
            <Route exact path="/userupdate">  {TOKEN ? <All.UserUpdate /> : <Redirect to="/login" />}</Route>

            <Route exact path="/loading/create">  {TOKEN ? <LoadingCreate /> : <Redirect to="/login" />}</Route>
            <Route exact path="/loading/open">  {TOKEN ? <LoadingOpen /> : <Redirect to="/login" />}</Route>
            <Route exact path="/letter/create">  {TOKEN ? <All.LetterCreate /> : <Redirect to="/login" />}</Route>
            <Route exact path="/letter/list">  {TOKEN ? <All.LetterList /> : <Redirect to="/login" />}</Route>

            <Route exact path="/group/create">  {TOKEN ? <All.GroupCreate /> : <Redirect to="/login" />}</Route>
            <Route exact path="/group/detail/:clubId">  {TOKEN ? <All.GroupDetail /> : <Redirect to="/login" />}</Route>
            <Route exact path="/group/list">  {TOKEN ? <All.GroupList /> : <Redirect to="/login" />}</Route>

            <Route path="/letter/detail/:code" exact={true} component={All.LetterDetail} />

            <Route component={All.NotFound} />
          </Switch>
          <BottomBar></BottomBar>
        </MobileView>

      </ThemeProvider>
    </div>
  );
}

export default App;
