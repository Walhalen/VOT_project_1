import React from 'react'
import Task from './Task'

const Tasks = ({tasks}) => {
  return (
    <>
        {
          tasks.map((task) =>{
              // {console.log(task.name)}
              return(
                <Task task = {task} />
              )
            }
          )
        }
    </>
  )
}

export default Tasks
