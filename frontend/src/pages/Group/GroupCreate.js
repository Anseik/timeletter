import { Button, Container, Input,InputAdornment, Typography,Chip } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { BASE_URL, USER_ID,TOKEN } from "../../constants";
import TitleRoundedIcon from '@material-ui/icons/TitleRounded'
import Filter1Icon from '@material-ui/icons/Filter1';
import Filter2Icon from '@material-ui/icons/Filter2';
import Filter3Icon from '@material-ui/icons/Filter3';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import "./GroupCreate.css";
function GroupCreate() {
  const history = useHistory();
  const [name, setName] = useState([""]);
  const [email, setEmail] = useState([""]);
  const [description, setDescription] = useState([""]);
  const [groupMembers, setGroupMembers] = useState([]);

  const [members, setMembers] = useState([]);
  const [membersId, setMembersId] = useState([]);

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onDiscriptionHandler = (event) => {
    setDescription(event.currentTarget.value);
  };
  const onMemberControl = (member) => {
    setMembers(members=>[...members, member.name]);
    setMembersId(membersId=>[...membersId, member.user_id]);
    setEmail('');
  };

  const onSubmitHandler = (event) => {
    if (membersId.length===0) {
      alert('혼자서는 클럽을 생성할 수 없습니다.');
    } else {
      event.preventDefault();
      let body = {
        "clubName":name,
        "desc":description,
        'masterId':0,
        "membersId":membersId,
        "profile":"없음"
      };
      axios.post(BASE_URL+"club/insert",body,{headers:{"Authorization":TOKEN}})
        .then((res)=>{console.log(res.data); 
          // window.location.replace("/group/list");
          history.push("/group/list")
        })
        .catch((err)=>{console.log(err); alert("not create")})
      }
  }
  const member = members.map((target)=>(
    <div style={{marginBottom:"2px"}}>
        <Chip label={target} onDelete={() => {setMembers(members.filter(i=>i!==target)); setMembersId(members.filter(i=>i!==target))}} color="primary" />
    </div>
  ));
  const onGNameHandler = (e) => {
    console.log(e.target.value)
    if (e.target.value) {

      axios.get(BASE_URL+"club/findWord?word="+e.target.value)
      .then((res)=>{console.log(res.data); setGroupMembers(res.data); })
      .catch((err)=>console.log(err))
    } else { setGroupMembers([])}
  };
  const memberList = groupMembers.map((groupmember) => 
    <div key={groupmember.user_id}>{groupmember.name} {groupmember.email}
      <Button variant="outlined" style={{ marginLeft: "3px" }} onClick={()=>onMemberControl(groupmember)}>
            추가
          </Button>
    </div>
  );
  return (
    <Container className="groupcreate">
      <br />
      <Typography style={{color:"white"}}>/그룹생성/</Typography>
      <br />
      <div style={{padding:"10px",backgroundColor:"#e8eaf6",borderRadius:"10px"}}>
        <div>
          <Typography>그룹이름</Typography>

          <Input
            fullWidth
            required
            autoFocus
            placeholder="이름"
            onChange={onNameHandler}
            startAdornment={
              <InputAdornment position="start">
                <Filter1Icon />
              </InputAdornment>
            }
          />
        </div>
      </div>
      <br></br>
      <div style={{padding:"10px",backgroundColor:"#e8eaf6",borderRadius:"10px"}}>
        <div>
          <Typography>멤버추가</Typography>

          <Input
            id="member"
            style={{ width: "230px" }}
            required
            fullWidth
            placeholder="회원의 이름"
            autoComplete="off"
            onChange={onGNameHandler}
            startAdornment={
              <InputAdornment position="start">
                <Filter2Icon />
              </InputAdornment>
            }
          />
          <div>
            {memberList}
          </div>
          
        </div>
        {member}

      </div>
      <br></br>
      <div style={{padding:"10px",backgroundColor:"#e8eaf6",borderRadius:"10px"}}>
        <div>
          <Typography>그룹설명</Typography>
          <Input
            fullWidth
            required
            placeholder="내용"
            onChange={onDiscriptionHandler}
            startAdornment={
              <InputAdornment position="start">
                <Filter3Icon />
              </InputAdornment>
            }
          />
        </div>
        <br/>
        </div>
        <br></br>
        <div style={{textAlign:"center"}}>
            <Button variant="outlined" style={{backgroundColor:"white",marginTop: "3px" }} onClick={onSubmitHandler}>
            그룹 생성
            </Button>
        </div>
      
    </Container>
  );
}

export default GroupCreate;
