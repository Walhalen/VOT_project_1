import { useState } from "react"

const AddTask = ({onAdd}) => {
    const [name, setName] = useState("");
    const [day, setDay] = useState("");
    const [reminder, setReminder] = useState(false);

    const onSubmit = (e)=>{
        e.preventDefault();

        if(name === "")
        {
            alert("Please add Text");
            return
        }

        
        if(day === "")
        {
            alert("Please add Day");
            return
        }
        
        onAdd({name,day});

        setDay("");
        setName("");
        setReminder(false);
    }
    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className = 'form-control'>
                <label>Task</label>
                <input type='text' placeholder="Add Task" 
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
            </div>
            <div className = 'form-control'>
                <label>Day & Time</label>
                <input type='text' placeholder="Add Day & Time"
                    value={day}
                    onChange={(e)=>setDay(e.target.value)}
                />
            </div>
            <div className = 'form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox'
                    checked={reminder}
                    value = {reminder}
                    onChange={(e)=>{setReminder(e.currentTarget.checked)}}
                />
            </div>
            <input type = "submit" value = "Add Task"
            className = 'btn btn-block'/>
            
        </form>
    )
}

export default AddTask