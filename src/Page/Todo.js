import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { SingleTodo } from "../Component/SingleTodo";

export default function Todo() {
  window.addEventListener('unload', (event) => {
    // 명세에 따라 preventDefault는 호출해야하며, 기본 동작을 방지합니다.
    event.preventDefault();
    
    // 문자열 반환
    return alert("sd");
  });

  let TOKEN = "";
  if (!localStorage.getItem("access_Token")) {
    console.log("todo");
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
        console.log(response.data)
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
            <input value={todo} onChange={(e) => setTodo(e.target.value)} />
            <button onClick={createTodo}>추가</button>
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
