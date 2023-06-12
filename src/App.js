import Auth from "./components/Auth";
import Header from "./components/Header";
import {auth, db, googleProvider} from "./config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut, signInWithEmailAndPassword} from "firebase/auth";
import { getDoc, collection, addDoc, doc, setDoc} from "firebase/firestore";
import {useEffect,useState} from "react"
import Tasks from "./components/Tasks";

function App() {
  
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
 
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(async(user) => {
  //     if (user) {
  //       setUser(user);
  //       const currentUserId = auth.currentUser.uid;
  //       const documentRef = doc(collection(db, "users"), currentUserId);

  //       const documentSnapshot = await getDoc(documentRef)
  //       setTasks(documentSnapshot.data().tasks)
  //       // console.log(tasks)
  //     } else {
  //       setUser(null);
  //       setTasks([])
  //     }
  //   }, []);
  // })
 
    
    
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
                setTasks([]);
                setUser(null);
            }catch(err)
            {
                console.error(err)
            }
    
          }}>Log out</button>
          <Header title = "Your Tasks" onClick={onAdd}/>
          
          {tasks.length === 0 ? <h3 >No tasks</h3> : <Tasks tasks = {tasks}/>}
        </> :  <Auth login = {login} signedIn = {signedIn} signedInWithGoogle = {signedInWithGoogle}/>}


    </div>
  );
}

export default App;