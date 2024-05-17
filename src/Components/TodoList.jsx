import React, { useState, useEffect, useRef} from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ amountTask, doneTaskAmount, showAlert }) => {
  const [userInput, setUserInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [time, setTime] = useState('00:00:00');
  const [taskAmountDone, setTaskAmountDone] = useState(0);
  const [taskAmount, setTaskAmount] = useState(0);
  const Time = useRef(null);
  const maxTask = 10;

  useEffect(() => {
    amountTask(taskAmount);
  }, [taskAmount, amountTask]);

  useEffect(() => {
    doneTaskAmount(taskAmountDone);
  }, [taskAmountDone, doneTaskAmount]);

  const checkingTime  = () => {
    const selectedTime = Time.current.value;
    const currentTime = new Date();
    const selectedDate = new Date(currentTime.toDateString() + ' ' + selectedTime);
    
    // Check if the selected time is in the past
    if (selectedDate < currentTime) {
      // If it's in the past, don't update the state
      // or you can provide feedback to the user
      alert("Please select a time in the future.");
      return false;
    } else {
      // Otherwise, update the state with the selected time
      setTime(selectedTime);
      return true;
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskAmount < maxTask) {
      if (!userInput.trim()) return;
      if( checkingTime() ) {
        setTodos((prevTodos) => [...prevTodos, { task: userInput, time }]);
        setTaskAmount((prevTaskAmount) => prevTaskAmount + 1);
      }
        setUserInput('');
        setTime('00:00:00');
    }
  };







  const handleChangeText = (e) => {
    setUserInput(e.target.value);
  };

  const handleChangeDate = (e) => {
    setTime(e.target.value);
  };

  const checkingDoneAllTasks  = () => {
    if(todos.length <= 1 ){
        setTaskAmountDone(0)
        setTaskAmount(0)
    }
  }

  const handleComplete = (index) => {
    setTodos((prevTodos) => {
      const newTodos = [...prevTodos];
      newTodos.splice(index, 1);
      return newTodos;
    });
    setTaskAmountDone((prevDone) => prevDone + 1);
    showAlert(true);
    checkingDoneAllTasks()
    const interval = setInterval(() => {
      showAlert(false);
    }, 3000); // Change the interval as needed (in milliseconds)
    return () => clearInterval(interval);
    
  };

  const handleDelete = (index) => {
    setTodos((prevTodos) => {
      const newTodos = [...prevTodos];
      newTodos.splice(index, 1);
      return newTodos;
    });
    setTaskAmount((prevTaskAmount) => prevTaskAmount - 1);
  };

  useEffect(() =>  {
    // Calculate remaining time for each todo item
    calculateRemainingTime();
    
    // Set interval to recalculate remaining time periodically
    const intervalId = setInterval(calculateRemainingTime, 1000);

    // Cleanup function to clear interval
    return () =>  clearInterval(intervalId);
  }, [todos]); // Re-run effect when todos change

  function calculateRemainingTime() {
    const currentTime = new Date();
    const updatedTodos = todos.map((todo) => {
      const [todoHours, todoMinutes] = todo.time.split(":").map(Number);
      const taskTime = new Date();
      taskTime.setHours(todoHours);
      taskTime.setMinutes(todoMinutes);
      taskTime.setSeconds(0);

      const remainingTime = taskTime.getTime() - currentTime.getTime();
      const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
      const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      const remainingTimeText = remainingTime <= 0 ?
        "Task has expired" :
        `Task expires in ${remainingHours} hours, ${remainingMinutes} minutes, ${remainingSeconds} seconds`;

      return {
        ...todo,
        remainingTime: remainingTimeText,
        expired: remainingTime >= 0,
      };
    });

    // Update todos state with the updated todo items
    setTodos(updatedTodos);
  }

  return (
    <div className="main-container">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input-container"
          type="text"
          value={userInput}
          onChange={handleChangeText}
          placeholder="Add a new todo"
        />
        <br></br>
        <input
          className="input-container"
          aria-label="Time"
          type="time"
          value={time}
          ref={Time}
          onChange={handleChangeDate}
        />
        <br></br>
        <button className="input-container" type="submit">
          Add
        </button>
      </form>
    <div className="todo-list-container">
        <div className="todo-list">
          <ul>
            {todos.map((todo, index) => (
              <TodoItem
                className="todoItem-container"
                key={index}
                todo={todo}
                onDelete={() => handleDelete(index)}
                onComplete={() => handleComplete(index)}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
