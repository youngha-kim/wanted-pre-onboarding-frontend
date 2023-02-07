import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

export default function Todo() {
  let TOKEN = "";
  if (!localStorage.getItem("access_Token")) {
    console.log("todo");
    window.location.replace("/signin");
  } else {
    TOKEN = localStorage.getItem("access_Token");
  }

  const [todo, setTodo] = useState("");
  const [rended, setRended] = useState([]);
  const [reFetch, setRefetch] = useState(true)
  const [edit, isEdit] = useState(false)

  useEffect(() => {
    const getTodo = async () => {
      try {
        const response = await axios.get(
          `https://pre-onboarding-selection-task.shop/todos`,
          { headers: { 'Authorization': `Bearer ${TOKEN}` } }
        );

        setRended([...response.data]);
      } catch (error) {
        alert(error);
      }
    };

    getTodo(); // 이거 없어도 돼요
  }, [reFetch]);

  const createTodo = async () => {
    let data ={
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
      setRefetch(!reFetch)
    } catch (error) {
      alert(error);
    }
  };


  const deleteTodo = async (id) => {
    try {
      await axios.delete(
        `https://pre-onboarding-selection-task.shop/todos/${id}`,
        { headers: { 'Authorization': `Bearer ${TOKEN}` } }
      );
      setRefetch(!reFetch)
    } catch (error) {
      alert(error);
    }
  }

  const handleEditMode = () => {

  }

  
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
                  <div key={el.id}>
                    <label >
                      <input type="checkbox" />
                      <span>{el.todo}</span> 
                    </label>
                    <button id="modify-button" onClick={handleEditMode}>수정</button> {/**제출 */}
                    <button id="delete-button"  onClick={() => deleteTodo(el.id)}>삭제</button> {/**취소*/}
                  </div>
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
