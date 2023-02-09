import React from "react";
import {Link} from "react-router-dom";
export const Home = () => {
  return (
    <>
      <div>Home</div>

      <Link to={"/signup"} className="link">
        <button>signup</button>
      </Link>

      <Link to={"/signin"} className="link">
        <button>signin</button>
      </Link>

      <Link to={"/todo"} className="link">
        <button>todo</button>
      </Link>
    </>
  );
};