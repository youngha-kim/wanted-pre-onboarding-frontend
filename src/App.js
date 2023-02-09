import "./App.css";
import React from "react";
import Signin from "./Page/Signin";
import Signup from "./Page/Signup"
import Todo from "./Page/Todo";
import { Home } from "./Page/Home";
import { Routes, Route } from "react-router-dom";

export const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/todo" element={<Todo />} />
    </Routes>
  );
};

export default App;
