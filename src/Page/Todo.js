import { useState, useEffect } from "react";
import { client } from "../Utiles/constants";
import styled from "styled-components";
import { SingleTodo } from "../Component/SingleTodo";
import { getStoredToken } from "../Utiles/token-storage";
export default function Todo() {
  const TOKEN = getStoredToken();
  if (!TOKEN) {
    window.location.replace("/signin");
  }

  const [todo, setTodo] = useState("");
  const [rended, setRended] = useState([]);
  const [reFetch, setRefetch] = useState(true);

  useEffect(() => {
    const getTodo = async () => {
      try {
        const response = await client.get(`/todos`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });
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
      await client.post("/todos", data, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      setRefetch(!reFetch);
      setTodo("");
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
              <input
                data-testid="new-todo-input"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
              />
              <button data-testid="new-todo-add-button" onClick={createTodo}>
                추가
              </button>
            </section>
            <section>
              <ul>
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
