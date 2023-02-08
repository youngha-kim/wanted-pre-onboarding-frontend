import React, { useState } from "react";
import axios from "axios";

export const SingleTodo = ({ element, TOKEN, reFetch, setRefetch }) => {
  const [edit, isEdit] = useState(false);
  const [newText, setNewText] = useState(element.todo);
  const [isChecked , setIsChecked] = useState(element.isCompleted)

  const handleEdit = async (e, id) => {
    if (e.target.textContent === "수정") {
      isEdit(true);
    }
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
        setRefetch(!reFetch)
      } catch (error) {
        alert(error);
      }
    }
  };

  const deleteTodo = async (e, id) => {
    if (e.target.textContent === "삭제") {
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
    } else if (e.target.textContent === "취소") {
      setNewText("");
      isEdit(false);
    }
  };

  const handleCheckBox = async (e, id) => {
  
    if(!edit){
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
        setIsChecked(() => !isChecked)
        isEdit(false);
        setRefetch(!reFetch)
        
      } catch (error) {
        alert(error);
      }
    } else {
      setIsChecked(!isChecked)
    }
  }



  return (
    <div key={element.id}>
      <label>
        <input type="checkbox" defaultChecked = {isChecked} onClick ={(e) => handleCheckBox(e, element.id)} />
        {edit ? (
          <input value={newText} onChange={(e) => setNewText(e.target.value)} />
        ) : (
          <span>{element.todo}</span>
        )}
      </label>

      <button id="modify-button" onClick={(e) => handleEdit(e, element.id)}>
        {edit ? "제출" : "수정"}
      </button>

      <button id="delete-button" onClick={(e) => deleteTodo(e, element.id)}>
        {edit ? "취소" : "삭제"}
      </button>
    </div>
  );
};
