import Auth from "./components/Auth";
import Header from "./components/Header";
import {auth, db, googleProvider} from "./config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut, signInWithEmailAndPassword} from "firebase/auth";
import { getDoc, collection, addDoc, doc, setDoc, updateDoc, deleteDoc} from "firebase/firestore";
import {useEffect,useState} from "react"
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import React from "react";

function App() {
  
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
 
  
    
    
    const initTasksAndUser = async() => {
      setUser(auth.currentUser);
      const currentUserId = auth.currentUser.uid;
      const documentRef = doc(collection(db, "users"), currentUserId);

      const documentSnapshot = await getDoc(documentRef)
      setTasks(documentSnapshot.data().tasks)
      // console.log(tasks)
    } 
    const usercolection = collection(db, "users");
    const addUser = async (email) => {
        try{
            const docRef = doc(usercolection, auth.currentUser.uid);
            await setDoc(docRef,{
                email: email,
                tasks: []
            })
        }catch(err)
        {
            console.error(err)
        }
    }
    const signedIn = async(email, password) => {
        try{
            console.log(email )
            console.log(password)
            console.log("HELLOOOOOO")
            await createUserWithEmailAndPassword(auth, email, password)
            addUser(email)
            initTasksAndUser()
        }catch(err)
        {
            console.error(err)
        }
        
    }

    const signedInWithGoogle = async() => {
        try{
            await signInWithPopup(auth, googleProvider).then((userCredential)=>{
                addUser(userCredential.user.email)
                initTasksAndUser()
            })
            
        }catch(err)
        {
            console.error(err)
        }

    }

    const login = async (email, password) =>{
        try{
            await signInWithEmailAndPassword(auth, email, password)
            initTasksAndUser()
        }catch(err)
        {
            console.error(err)
        }
    }
  const onAdd = (task) => {
    const docRef = doc(usercolection, auth.currentUser.uid);
    updateDoc(docRef, {tasks: [...tasks, task]})
    setTasks([...tasks, task])
  }

  const onDelete = (task1) => {
    const updatedTasks = tasks.filter(task => task !== task1);
    const docRef = doc(usercolection, auth.currentUser.uid);
    updateDoc(docRef, { tasks: updatedTasks });
    setTasks(updatedTasks);
  }

  return (
    <div className = "container">
        {/* <Header title = "Your tasks" onClick = {onAdd}/> */}

        
        {user !== null ? <>
          <button onClick = {async()=>{
              try{
                await signOut(auth)
                setTasks([]);
                setUser(null);
            }catch(err)
            {
              console.error(err)
            }
    
          }}>Log out</button>
          <Header title = "Your Tasks" onClick={()=>setShowAdd(!showAdd)}/>
          {showAdd && <AddTask onAdd = {onAdd}/>}
          {tasks.length === 0 ? <h3 >No tasks</h3> : <Tasks tasks = {tasks} onDelete = {onDelete}/>}
        </> :  <Auth login = {login} signedIn = {signedIn} signedInWithGoogle = {signedInWithGoogle}/>}


    </div>
  );
}

export default App;