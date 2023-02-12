import { useState, useEffect, useRef } from "react";
import { client } from "../Utiles/constants";
import styled from "styled-components";
import { SingleTodo } from "../Component/SingleTodo";
import { getStoredToken } from "../Utiles/token-storage";

export default function Todo() {
  const TOKEN = getStoredToken();
  if (!TOKEN) {
    window.location.replace("/signin");
  }

  const [rended, setRended] = useState([]);
  const [reFetch, setRefetch] = useState(true);
  const todoInput = useRef("");

  useEffect(() => {
    const getTodo = async () => {
      try {
        const response = await client.get(`/todos`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });
        setRended(() => {return [...response.data] });
      } catch (error) {
        alert(error);
      }
      console.log("at mount", rended)
    };
    todoInput.current.focus();
    getTodo();
  }, [reFetch]);

  // console.log(rended);
  const createTodo = async () => {
    let data = {
      todo: todoInput.current.value,
    };
    try {
      await client.post("/todos", data, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      setRefetch(!reFetch);
      todoInput.current.value = "";
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <TodoStyle>
        <main className="todo-box">
          <article>
            <h1>Todo Lists</h1>
            <section>
              <input data-testid="new-todo-input" ref={todoInput} />
              <button data-testid="new-todo-add-button" onClick={createTodo}>
                추가
              </button>
            </section>
            <section>
              <ul>
                { rended?.map((el) => {
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
              </ul>
            </section>
          </article>
        </main>
      </TodoStyle>
    </>
  );
}

const TodoStyle = styled.div`
  article {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 30vh;
  }
`;
