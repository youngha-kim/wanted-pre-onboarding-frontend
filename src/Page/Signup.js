import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let naviagte = useNavigate();

  if (localStorage.getItem("access_Token")) {
    window.location.replace("/todo");
  }

  const handleLogin = async () => {
    let data = {
      email: email,
      password: password,
    };

    try {
      await axios.post(
        `https://pre-onboarding-selection-task.shop/auth/signup`,
        data
      );
      alert("로그인 페이지로 이동합니다");
      naviagte("/signin");
    } catch (error) {
      if (error.response.status === 400) {
        alert("동일한 이메일이 이미 존재합니다.");
      } else {
        alert(error.message);
      }
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <SignUp>
        <div className="signin-box">
          <div>Signup</div>
          <input
            data-testid="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            data-testid="password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            disabled={
              email.includes("@") && password.length >= 8 ? false : true
            }
            data-testid="signup-button"
            onClick={handleLogin}
          >
            회원가입
          </button>
        </div>
      </SignUp>
    </>
  );
}
const SignUp = styled.div`
  .signin-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 20vh;
  }
`;
