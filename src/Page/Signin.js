import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../Utiles/constants";
import { MINIMUM_LEN, REQUIRED_VAL } from "../Utiles/constants";
import { setStoredToken , getStoredToken} from "../Utiles/token-storage";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let naviagte = useNavigate();

  if (getStoredToken()) {
    window.location.replace("/todo");
  }

  const handleLogin = async () => {
    let data = {
      email: email,
      password: password,
    };

    try {
      let response = await client.post(`/auth/signin`, data);
      setStoredToken(response.data.access_token) ;
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
        <article className="signin-box">
          <h2>SignIn</h2>
          <section>
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
          </section>
          <button
            disabled={
              email.includes(REQUIRED_VAL) && password.length >= MINIMUM_LEN
                ? false
                : true
            }
            id="signin-button"
            onClick={handleLogin}
          >
            로그인
          </button>
        </article>
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
  section {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`;
