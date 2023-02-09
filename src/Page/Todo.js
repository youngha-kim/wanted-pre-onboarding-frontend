import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { SingleTodo } from "../Component/SingleTodo";

export default function Todo() {
  let TOKEN = "";
  if (!localStorage.getItem("access_Token")) {
    window.location.replace("/signin");
  } else {
    TOKEN = localStorage.getItem("access_Token");
  }

  const [todo, setTodo] = useState("");
  const [rended, setRended] = useState([]);
  const [reFetch, setRefetch] = useState(true);

  useEffect(() => {
    const getTodo = async () => {
      try {
        const response = await axios.get(
          `https://pre-onboarding-selection-task.shop/todos`,
          { headers: { Authorization: `Bearer ${TOKEN}` } }
        );

        setRended([...response.data]);
      } catch (error) {
        alert(error);
      }
    };

    getTodo();
  }, [reFetch]);

  const createTodo = async () => {
    let data = {
      todo: todo,
    };
    try {
      await axios.post(
        "https://pre-onboarding-selection-task.shop/todos",
        data,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      setRefetch(!reFetch);
      setTodo("");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <TodoStyle>
        <div className="todo-box">
          <div>Todo</div>
          <div>
            <input
              data-testid="new-todo-input"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <button data-testid="new-todo-add-button" onClick={createTodo}>
              추가
            </button>
          </div>

          <div>
            {rended?.map((el) => {
              return (
                <SingleTodo
                  key={el.id}
                  element={el}
                  TOKEN={TOKEN}
                  reFetch={reFetch}
                  setRefetch={setRefetch}
                />
              );
            })}
          </div>
        </div>
      </TodoStyle>
    </>
  );
}

const TodoStyle = styled.div`
  .todo-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 20vh;
  }
`;
