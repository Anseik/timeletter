import React,{ useEffect, useState } from "react"
import { BASE_URL,TOKEN } from "../../constants"
import { useParams } from "react-router-dom"
import { 
  Container, 
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@material-ui/core'
import GroupLetter from "components/group/GroupLetter"
import GroupMember from 'components/group/GroupMember'
import axios from 'axios'
import './GroupDetail.css'
import ScrollToTop from "components/Scroll/ScrollToTop"


function GroupDetail(props) {
  const { clubId } = useParams()
  // console.log(clubId)

  const [value, setValue] = useState(0)
  const [info, setInfo] = useState({})
  const [isDelete, setIsDelete] = useState(false)


  const handleOpen = () => {
    setIsDelete(true)
  }

  const handleClose = () => {
    setIsDelete(false)
  }

  const onDeleteClub = () => {
    axios.delete(BASE_URL + "club/delClub", {
      params: {
        id: clubId
      }
    })
    .then(res => {
      console.log(res)
      window.location.replace('/group/list')
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(()=>{
    axios.get(BASE_URL + "club/findDetail", {
      params: {
        id: clubId
      },
      headers: {
        Authorization: TOKEN
      }
    })
    .then(res => {
      console.log(res.data)
      setInfo(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  },[])

  return (
    <Container className="GroupDetail" style={{color:"white"}} className="grouplist" maxWidth="xs">
      <ScrollToTop />
      <div>
        <Typography variant="h6">그룹 상세 조회</Typography>
        <div className="GroupMember">
          <Typography className="GroupMember-title">{info.clubName}</Typography>
          {info.master 
            ? <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleOpen} style={{color:"white"}}>
                그룹삭제
              </Button>
            : null
          }
          <Dialog
            open={isDelete}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">"이 그룹을 삭제하시겠습니까?"</DialogTitle>
            <DialogActions>
              <Button onClick={handleClose} color="primary" style={{fontWeight:"bold"}}>
                취소
              </Button>
              <Button onClick={onDeleteClub} color="primary" style={{fontWeight:"bold"}}>
                확인
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Typography style={{overflowWrap: 'normal'}}>{info.clubDesc}</Typography>
        <GroupMember members={info.members} master={info.master}></GroupMember>
      </div>
      <GroupLetter></GroupLetter>
    </Container>
  )
}

export default GroupDetail
