import React from 'react'
import Task from './Task'

const Tasks = ({tasks, onDelete}) => {
  return (
    <>
        {
          tasks.map((task) =>{
              // {console.log(task.name)}
              return(
                <Task task = {task} onDelete = {onDelete}/>
              )
            }
          )
        }
    </>
  )
}

export default Tasks
