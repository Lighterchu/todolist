import React from 'react'
import {CProgress} from '@coreui/react';

const TodoProgress = ({progress, settingTaskAmount}) => {
  return (
    <div className="todoProgress-container">
        <div className="todoProgress">
            <h1>Total Progress</h1>
            <h2>Amount Done:</h2>
            {(
                settingTaskAmount >= 1 ? 
                <CProgress  color="success" variant="striped" value={progress} animated>{progress}%</CProgress>
                :
                <CProgress color="danger" variant="striped" value={100} animated>Nothing Tasked Yet</CProgress>
            )}
        </div>
    </div>
  )
}

export default TodoProgress