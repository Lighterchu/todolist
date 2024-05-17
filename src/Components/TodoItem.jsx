import {React, useState }  from 'react';
import { CButton} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';






const TodoItem = ({ todo, onDelete, onComplete, onUpdate}) => {

  const [timeExpiry, setTimeExpiry] = useState("")
  


  function calculateRemainingTime() {
    // Get the current time
    const currentTime = new Date();

    // Get the task time
    const [todoHours, todoMinutes] = todo.time.split(":").map(Number);
    const taskTime = new Date();
    taskTime.setHours(todoHours);
    taskTime.setMinutes(todoMinutes);
    taskTime.setSeconds(todoMinutes);

    // Calculate the difference between the task time and the current time
    const remainingTime = taskTime.getTime() - currentTime.getTime();

    // Convert remaining time from milliseconds to hours, minutes, and seconds
    let remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
    let remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    let remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    let remainingTimeText = `Task expires in ${remainingHours} hours, ${remainingMinutes} minutes, ${remainingSeconds} seconds`
    
   


    // Display the remaining time
   
   
    
    setTimeExpiry(remainingTimeText)
  }
  setInterval(calculateRemainingTime, 1000);





  function convertToDigitalTime(militaryTime) {
    // Extract hours and minutes
    const [hours, minutes] = militaryTime.split(':').map(Number);

    // Convert to 12-hour format
    let hourIn12Format = hours % 12;
    hourIn12Format = hourIn12Format === 0 ? 12 : hourIn12Format;

    // Determine AM or PM
    const period = hours >= 12 ? 'PM' : 'AM';

    // Format minutes with leading zero if necessary
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Combine hour, minutes, and period
    const digitalTime = `${hourIn12Format}:${formattedMinutes} ${period}`;

    return digitalTime;
  }
  const digitalTime = convertToDigitalTime(todo.time); 

  return (
    <div className="todolist-container">
      <li>
        <h1>{todo.task}</h1>
        <p>Time: {digitalTime}</p> 
        <p>{timeExpiry}</p>
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