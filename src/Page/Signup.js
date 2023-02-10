import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../axiosInstances/constants";

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
      await client.post(`/auth/signup`, data);
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
        <article className="signin-box">
          <h2>Signup</h2>
          <section>
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
          </section>
          <button
            disabled={
              email.includes("@") && password.length >= 8 ? false : true
            }
            data-testid="signup-button"
            onClick={handleLogin}
          >
            회원가입
          </button>
        </article>
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
    margin-top: 30vh;
  }
  section {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`;
