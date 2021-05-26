import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { 
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel'
import openLetter from "../../static/images/openLetter2.png"
import notOpenLetter from "../../static/images/notOpenLetter.png"
import MapList from "../../components/timeletter/MapList"

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: '80px',
  },
  title: {
    marginTop: '16px',
  },
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#e8eaf6',
    padding: theme.spacing(0, 2),
  },
  category: {
    marginBottom: '10px',
  },
  media: {
    height: 200,
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}))

// 함수형 컴포넌트
const LetterList = () => {
  const classes = useStyles()
  const history = useHistory()
  const openCapsules = [
    {
      id: 1,
      title: 'letter1',
    },
    {
      id: 2,
      title: 'letter2',
    },
    {
      id: 3,
      title: 'letter3'
    },
    {
      id: 4,
      title: 'letter4'
    },
    {
      id: 5,
      title: 'letter5'
    },
    {
      id: 6,
      title: 'letter6'
    },
  ]

  const notOpenCapsules = [
    {
      id: 7,
      title: 'letter7',
      lat: 33.450705,
      lng: 126.570677,
    },
    {
      id: 8,
      title: 'letter8',
      lat: 33.450105,
      lng: 126.570223,
    },
    {
      id: 9,
      title: 'letter9',
      lat: 33.450465,
      lng: 126.570452,
    },
    {
      id: 10,
      title: 'letter10',
      lat: 33.450103,
      lng: 126.570546,
    },
    {
      id: 11,
      title: 'letter11',
      lat: 33.450456,
      lng: 126.570987,
    },
    {
      id: 12,
      title: 'letter12',
      lat: 33.450453,
      lng: 126.570741,
    },
  ]

  return (
    <Container className={classes.container} style={{marginTop:"50px"}} maxWidth="xs">
      <Typography className={classes.title} variant="h6">레터 조회</Typography>
      <div className={classes.paper}>

        {/* 오픈 레터 */}
        <div className={classes.category}>
          <Typography className={classes.title} variant="subtitle1">오픈 레터</Typography>
          <Carousel autoPlay={false}>
            {openCapsules.map(openCapsule => (
              <Card key={openCapsule.id} onClick={() => history.push('detail/' + openCapsule.id)}>
                <CardMedia
                  className={classes.media}
                  image={openLetter}
                />
                <CardContent style={{textAlign: 'center'}}>{openCapsule.title}</CardContent>
              </Card>
            ))}
          </Carousel>
        </div>

        {/* 비오픈 레터 */}
        <div className={classes.category}>
          <Typography className={classes.title} variant="subtitle1">비오픈 레터</Typography>
          <MapList capsules={notOpenCapsules} />
          <Carousel autoPlay={false}>
            {notOpenCapsules.map(notOpenCapsule => (
              <Card key={notOpenCapsule.id} onClick={() => history.push('detail/' + notOpenCapsule.id)}>
                <CardMedia
                  className={classes.media}
                  image={notOpenLetter}
                />
                <CardContent style={{textAlign: 'center'}}>{notOpenCapsule.title}</CardContent>
              </Card>
            ))}
          </Carousel>
        </div>
      </div>
    </Container>
  )
}

export default LetterList
