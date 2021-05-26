import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./GroupMember.css";
import { Chip } from "@material-ui/core";
import axios from "axios";
import { BASE_URL, TOKEN } from "../../constants";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert'


function GroupMember(props) {
  const { clubId } = useParams();
  const [isAdd, setIsAdd] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [tmpUserId, setTmpUserId] = useState(0);
  const [groupMembers, setGroupMembers] = useState([]);
  const [isMember, setIsMember] = useState([true]);


  const handleDelete = (userId) => {
    // alert("그룹 멤버를 삭제 하시겠습니까?");
    if (props.master) {
      setIsDelete(true);
      setTmpUserId(userId);
    } else {
      swal("삭제 오류", "멤버 삭제는 그룹장만 가능합니다.", "error")
    }
  }

  const addMember = () => {
      setIsAdd(true);
  }

  const handleClose = () => {
      setIsAdd(false);
  }

  const deleteOk = () => {
    console.log(tmpUserId, clubId);
    let body = { clubId: clubId, userId: tmpUserId };
    if (props.members.length > 1) {
      axios.delete(BASE_URL + "club/delMember", {
        data: body,
        headers: {
          Authorization: TOKEN
        }
      })
      .then(res => {
        console.log(res.data, "성공")
        window.location.reload()
      })
      .catch(err => {
        console.log(err)
        swal("멤버 삭제 불가", "그룹장은 자신을 삭제할 수 없습니다.", "error")
      })
      setIsDelete(false);
    } else {
      swal("멤버 삭제 불가", "그룹원이 1명일때는 멤버삭제를 할 수 없습니다.", "error")
      setIsDelete(false);
    }
  }
  const deleteNo = () => {
    setIsDelete(false);
  }
  const onEnter = (e) => {
    // e.preventDefault();
    if(e.key == 'Enter'){
        axios.get(BASE_URL+"club/findWord?word="+e.target.value)
        .then((res)=>{
          if (res.data.length===0) {
            console.log('길이가 0')
            setIsMember(false);
          } else {
            console.log(res.data); setGroupMembers(res.data);
            setIsMember(true);
          }
        
        })
        .catch((err)=>{console.log(err); setGroupMembers([])})
    }
  }
  const onNameHandler = (e) => {
    console.log(e.target.value)
    if (e.target.value) {
      axios.get(BASE_URL+"club/findWord?word="+e.target.value)
      .then((res)=>{
        if (res.data.length===0) {
          console.log('길이가 0')
          setIsMember(false);
          } else {
            console.log(res.data); setGroupMembers(res.data);
            setIsMember(true);
          }})
      .catch((err)=>{console.log(err); setGroupMembers([])})
    } else { 
      setGroupMembers([])
    }
  }

  let member = null;
  if (props.members) {
    member = props.members.map((groupMember) => (
      <div
        className="item"
        key={groupMember.user_id}
        style={{ marginTop: "10px" }}
      >
        {props.master
          ? <Chip
              className="member-chip"
              size="medium"
              label={groupMember.name}
              onDelete={() => handleDelete(groupMember.user_id)}
            />
          : <Chip
              className="member-chip"
              size="medium"
              label={groupMember.name}
            />
        }
      </div>
    ));
  };

  const nameChange = (target) => {
      document.getElementById("name").value = target.name;
      setTmpUserId(target.user_id);
      setGroupMembers([]);
  }

  const onAddMember = () => {
    let body = {
      clubId: Number(clubId),
      userId: tmpUserId,
    }
    console.log(body)
    axios.post(BASE_URL + "club/join", body, {
      headers: {
        Authorizaton: TOKEN
      }
    })
    .then(res => {
      console.log(res.data)
      window.location.reload()
    })
    .catch(err => {
      console.log(err)
      alert("이미 그룹에 속한 멤버입니다.")
    })
      
  }
  const addMemberList = groupMembers.map((gmember) => (
      <div key={gmember.user_id} 
      style={{margin:"5px",fontSize:"1rem",fontWeight:"bold"}} 
      onClick={()=>nameChange(gmember)} 
      >★ {gmember.name} ({gmember.email})
      <hr></hr>
      </div>
  ));

  const memberDeleteModal = (
    <Dialog
      open={isDelete}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">{"멤버를 삭제하시겠습니까?"}</DialogTitle>
    <DialogActions>
      <Button onClick={deleteNo} color="primary" style={{fontWeight:"bold"}}>
        아니오
      </Button>
      <Button onClick={deleteOk} color="primary" style={{fontWeight:"bold"}}>
        예
      </Button>
    </DialogActions>
  </Dialog>
  )
  const memberModal = (
    <Dialog
    open={isAdd}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle style={{fontWeight:"bold"}} id="alert-dialog-title">{"추가할 멤버 이름을 검색해보세요"}</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        id="name"
        label="이름"
        type="text"
        fullWidth
        onKeyPress={onEnter}
        onChange={onNameHandler}
        autoComplete="off"
      />
      <div style={{marginTop:"2px",paddingTop:"2px",position:"relative",backgroundColor:"rgba(0,0,0,0.1)",opacity:"0.8",width:"100%",color:"black",borderRadius:"4px"}}>
      {isMember ? addMemberList : <div style={{fontSize:"1rem", fontWeight:"bold"}}>찾으시는 회원이 없습니다.</div>}
      </div>
    </DialogContent>
    <DialogActions>
      <Button onClick={onAddMember} color="primary" style={{fontWeight:"bold"}}>
        제출하기
      </Button>
    </DialogActions>
  </Dialog>
  )
  return (
    <div className="member">
      {member}
      {props.master 
        ? <div className="item" style={{ marginTop: "10px" }}>
            <Chip className="member-chip" label="+" onClick={addMember}/>
          </div>
        : null 
      }
      {isDelete ? memberDeleteModal : null}
      {isAdd ? memberModal : null}
    </div>
  );
}

export default GroupMember;
