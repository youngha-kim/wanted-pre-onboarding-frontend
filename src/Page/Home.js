import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Home = () => {
  return (
    <>
      <HomeStyle>
        <div className="home-box">
          Home
          <Link to={"/signup"} className="link">
            <button>signup</button>
          </Link>
          <Link to={"/signin"} className="link">
            <button>signin</button>
          </Link>
          <Link to={"/todo"} className="link">
            <button>todo</button>
          </Link>
        </div>
      </HomeStyle>
    </>
  );
};

const HomeStyle = styled.div`
  .home-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 20vh;
  }
`;
