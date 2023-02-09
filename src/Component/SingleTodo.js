import React, { useState } from "react";
import axios from "axios";

export const SingleTodo = ({ element, TOKEN, reFetch, setRefetch }) => {
  const [edit, isEdit] = useState(false);
  const [newText, setNewText] = useState(element.todo);
  const [isChecked, setIsChecked] = useState(element.isCompleted);

  const handleEdit = () => {
    isEdit(true);
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(
        `https://pre-onboarding-selection-task.shop/todos/${id}`,
        { headers: { Authorization: `Bearer ${TOKEN}` } }
      );
      setNewText("");
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
        await axios.put(
          `https://pre-onboarding-selection-task.shop/todos/${id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
        isEdit(false);
        setRefetch(!reFetch);
      } catch (error) {
        alert(error);
      }
    }
  };

  const cancleTodo = (element) => {
    setNewText(element.todo);
    isEdit(false);
  };

  const handleCheckBox = async (e, id) => {
    if (!edit) {
      let data = {
        todo: element.todo,
        isCompleted: !isChecked,
      };
      try {
        await axios.put(
          `https://pre-onboarding-selection-task.shop/todos/${id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
        setIsChecked(() => !isChecked);
        isEdit(false);
        setRefetch(!reFetch);
      } catch (error) {
        alert(error);
      }
    } else {
      setIsChecked(!isChecked);
    }
  };

  return (
    <div key={element.id}>
      <label>
        <input
          data-testid="modify-input"
          type="checkbox"
          defaultChecked={isChecked}
          onClick={(e) => handleCheckBox(e, element.id)}
        />
      </label>
      {edit ? (
        <>
          <input value={newText} onChange={(e) => setNewText(e.target.value)} />
          <button
            data-testid="submit-button"
            onClick={(e) => submitTodo(e, element.id)}
          >
            제출
          </button>
          <button data-testid="cancel-button" onClick={() => cancleTodo(element)}>
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
    </div>
  );
};
