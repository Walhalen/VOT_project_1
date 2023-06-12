import React from 'react'

const Task = ({task}) => {
  return (
    <div>
       <h3>
            {task.name}

       </h3>
       <p>
        {task.day}
       </p>
    </div>
  )
}

export default Task
