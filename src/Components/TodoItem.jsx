import {React, useState }  from 'react';
import { CButton} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';






const TodoItem = ({ todo, onDelete, onComplete}) => {
  const { remainingTime, expired,task} = todo;
  return (
    <div className="todolist-container">
      <li>
        <h1>{task}</h1>
        <p>{remainingTime}</p> 
        <p>{expired}</p>
        <CButton className="buttons" size="sm" color="success" onClick={onComplete}>
          Done
        </CButton>
        <CButton className="buttons" size="sm" color="danger" onClick={onDelete}>
          Remove
        </CButton>  
      </li>
    </div>
  );
};

export default TodoItem;