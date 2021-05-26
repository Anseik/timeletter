import React, { useEffect, useState } from "react"
import { BASE_URL, TOKEN } from "../../constants"
import { useHistory } from "react-router"
import { makeStyles } from '@material-ui/core/styles';
import { 
  Container, 
  Card, 
  CardContent, 
  Typography, 
  Avatar,
  Grid
} from "@material-ui/core"
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople"
import axios from "axios"
import spaceship from 'static/images/spaceship.gif'
import "./GroupItem.css"

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  }
}))

function GroupItem() {
  const history = useHistory()
  const classes = useStyles()

  const [clubs, setClubs] = useState([])

  useEffect(() => {
    axios.get(BASE_URL + "club/findMyClub", { headers: { Authorization: TOKEN } })
    .then(res => {
      console.log(res.data)
      setClubs(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])


  // 그룹이 있을 때
  const clubList = clubs.map(club => (
    <Card key={club.club_id} className="groupitem" onClick={() => history.push("/group/detail/" + club.club_id)} style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
      <CardContent>
        <Grid container alignItems="center">
          <Grid item xs={3}>
            <Avatar src={spaceship} className={classes.large} />
          </Grid>
          <Grid item xs={9}>
            <Typography gutterBottom variant="h5" style={{marginBottom: "0px"}}>
              <span style={{display: 'inlineBlock', marginLeft: 'auto'}}>
                <EmojiPeopleIcon  style={{marginLeft: 'auto', paddingTop: '7px'}}/>-{club.members}명
              </span> /
              {club.club_name}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  ))

  // 그룹이 없을 때
  const noGroup = <div className="nogroup">생성된 그룹이 없습니다.</div>

  return (
    <Container>
      {clubs.length !== 0 ? clubList : noGroup}
    </Container>
  )
}

export default GroupItem