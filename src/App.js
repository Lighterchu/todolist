import './App.css';
import React, { useState } from 'react';
import TodoList from './Components/TodoList';
import TodoProgress from './Components/TodoProgress';
import { CCarousel,CCarouselItem, CImage, CAlert } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import us from "./Assets/us.jpeg"
import love from "./Assets/love.jpeg"
import bear from "./Assets/bear.jpeg"

function App() {
  const [taskAmount, setTaskAmount] = useState(0);
  const [taskDone, setTaskDone] = useState(0)
  const [listenDoneTask, setListDoneTask] = useState(false)

  return (
    <div className="App">
      {(listenDoneTask ?
        <div className='alert-container'>
          <CAlert className='alert' color="success">Task Done</CAlert>
        </div>
        :
        <div></div>
      )}
      <TodoList amountTask={setTaskAmount} doneTaskAmount={setTaskDone} showAlert={setListDoneTask} />
      <CCarousel interval={5000}>
        <CCarouselItem>
          <CImage className="d-block w-100 carousel-image" src={us} alt="slide 1" />
        </CCarouselItem>
        <CCarouselItem>
          <CImage className="d-block w-100 carousel-image "  src={love} alt="slide 2" />
        </CCarouselItem>
        <CCarouselItem>
          <CImage className="d-block w-100 carousel-image" src={bear} alt="slide 3" />
        </CCarouselItem>
      </CCarousel>
      <TodoProgress progress={Math.round((taskDone / taskAmount) * 100 / 10) * 10} settingTaskAmount={taskAmount}/>  
    </div>
  );
}


export default App;
