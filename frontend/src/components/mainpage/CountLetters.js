import axios from "axios";
import { BASE_URL,TOKEN } from "../../constants";
import React, { useEffect, useState } from "react";
import { RiMailSendLine } from "react-icons/ri";

const CountLetters = () => {
  const [num, setNum] = useState(333);
  // const numRef = useRef(0);
  
  useEffect(() => {
    axios.get(BASE_URL+"letter/count",{headers:{Authorization:TOKEN}})
    .then((res)=>{setNum(res.data);})
    .catch((err)=>console.log(err))

    // setInterval(() => {
    //   setNum((numRef.current += 1));
    // }, 1000);
  }, []);

  return (
    <div>
      <div style={{ color: "white", paddingTop: "35vh", fontSize: "1.7rem", fontWeight: "" }}>이동중인 타임 레터</div>
      <div style={{ color: "white", fontSize: "2rem" }}>
        {" "}
        <RiMailSendLine /> <span style={{ fontSize: "3rem" }}>{num}</span>
      </div>
    </div>
  );
};

export default CountLetters;