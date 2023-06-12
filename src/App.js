import Auth from "./components/Auth";
import Header from "./components/Header";
import {auth, db, googleProvider} from "./config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import { getDoc, collection, addDoc, doc} from "firebase/firestore";
import {useEffect,useState} from "react"
import Tasks from "./components/Tasks";

function App() {
  const usercollection = collection(db, "users")
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async(user) => {
      if (user) {
        setUser(user);
        const currentUserId = auth.currentUser.uid;
        const documentRef = doc(usercollection, currentUserId);

        const documentSnapshot = await getDoc(documentRef)
        setTasks(documentSnapshot.data().tasks)
        // console.log(tasks)
      } else {
        setUser(null);
        setTasks([])
      }
    }, []);
  })

  const onAdd = () => {
    console.log("clicked");
  }

  return (
    <div className = "container">
        {/* <Header title = "Your tasks" onClick = {onAdd}/> */}

        
        {user !== null ? <>
          <button onClick = {async()=>{
              try{
                await signOut(auth)
            }catch(err)
            {
                console.error(err)
            }
    
          }}>Log out</button>
          <Header title = "Your Tasks" onClick={onAdd}/>
          
          {tasks.length === 0 ? <h3 >No tasks</h3> : <Tasks tasks = {tasks}/>}
        </> :  <Auth />}


    </div>
  );
}

export default App;
