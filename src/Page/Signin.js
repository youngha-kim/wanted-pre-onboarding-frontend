import React from "react";
import styled from "styled-components";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let naviagte = useNavigate();

  if(localStorage.getItem("access_Token")){
    window.location.replace('/todo')
  } 


  const handleLogin = async () => {
    let data = {
      email: email,
      password: password,
    };

    try {
      let response = await axios.post(
        `https://pre-onboarding-selection-task.shop/auth/signin`,
        data
      );
      localStorage.setItem("access_Token", response.data.access_token);
      alert("로그인을 성공하였습니다.");
      naviagte("/todo");
    } catch (error) {
      if (error.response.status === 404) {
        alert("해당 사용자가 존재하지 않습니다.");
      } else {
        alert(error.message);
      }
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <SingIn>
        <div className="signin-box">
          <div>SignIn</div>
          <input
            id="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            id="password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            disabled={
              email.includes("@") && password.length >= 8 ? false : true
            }
            id="signin-button"
            onClick={handleLogin}
          >
            로그인
          </button>
        </div>
      </SingIn>
    </>
  );
}
const SingIn = styled.div`
  .signin-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 20vh;
  }
`;


