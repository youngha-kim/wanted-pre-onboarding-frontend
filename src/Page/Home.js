import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Home = () => {
  return (
    <>
      <HomeStyle>
        <article className="home-box">
          <h2>Home</h2>
          <nav className="navigation-box">
            <Link to={"/signup"} className="link">
              <button>signup</button>
            </Link>
            <Link to={"/signin"} className="link">
              <button>signin</button>
            </Link>
            <Link to={"/todo"} className="link">
              <button>todo</button>
            </Link>
          </nav>
        </article>
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
    margin-top: 30vh;
  }
  nav{
    display: flex;
    flex-direction: column;
    align-items:center;
  }
`;
