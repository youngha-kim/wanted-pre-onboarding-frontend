import React, { useState } from "react";
import { client } from "../axiosInstances/constants";
export const SingleTodo = ({ element, TOKEN, reFetch, setRefetch }) => {
  const [editMode, isEditMode] = useState(false);
  const [newText, setNewText] = useState(element.todo);
  const [isChecked, setIsChecked] = useState(element.isCompleted);

  const handleEdit = () => {
    isEditMode(true);
  };

  const deleteTodo = async (id) => {
    try {
      await client.delete(`/todos/${id}`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      setNewText(() => "");
      setRefetch(!reFetch);
    } catch (error) {
      alert(error);
    }
  };

  const submitTodo = async (e, id) => {
    if (e.target.textContent === "제출") {
      let data = {
        todo: newText,
        isCompleted: isChecked,
      };
      try {
        await client.put(`/todos/${id}`, data, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });
        isEditMode(false);
        setRefetch(!reFetch);
      } catch (error) {
        alert(error);
      }
    }
  };

  const cancleTodo = (element) => {
    setNewText(element.todo);
    isEditMode(false);
  };

  const handleCheckBox = async (todo, id) => {
    if (!editMode) {
      let data = {
        todo: todo,
        isCompleted: !isChecked,
      };
      try {
        await client.put(`/todos/${id}`, data, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });
        setIsChecked(() => !isChecked);
        isEditMode(false);
        setRefetch(!reFetch);
      } catch (error) {
        alert(error);
      }
    } else {
      setIsChecked(!isChecked);
    }
  };

  return (
    <li key={element.id}>
      <label>
        <input
          data-testid="modify-input"
          type="checkbox"
          defaultChecked={isChecked}
          onClick={() => handleCheckBox(element.todo, element.id)}
        />
      </label>
      {editMode ? (
        <>
          <input value={newText} onChange={(e) => setNewText(e.target.value)} />
          <button
            data-testid="submit-button"
            onClick={(e) => submitTodo(e, element.id)}
          >
            제출
          </button>
          <button
            data-testid="cancel-button"
            onClick={() => cancleTodo(element)}
          >
            취소
          </button>
        </>
      ) : (
        <>
          <span>{element.todo}</span>
          <button data-testid="modify-button" onClick={() => handleEdit()}>
            수정
          </button>
          <button
            data-testid="delete-button"
            onClick={() => deleteTodo(element.id)}
          >
            삭제
          </button>
        </>
      )}
    </li>
  );
};
