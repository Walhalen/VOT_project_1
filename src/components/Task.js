import React from 'react'
import {FaTimes} from 'react-icons/fa'

const Task = ({task, onDelete}) => {
  return (
    <div className="task">
       <h3>
            {task.name}
             {<FaTimes
              style = {{
                  color:"red",
                  cursor: 'pointer'
              }}
              onClick = {()=>{onDelete(task)}}
            />}
       </h3>
       <p>
        {task.day}
       </p>
    </div>
  )
}

export default Task
