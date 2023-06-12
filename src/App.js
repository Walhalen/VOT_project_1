import Auth from "./components/Auth";
import Header from "./components/Header";
import {auth, db, googleProvider} from "./config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import { getDoc, collection, addDoc } from "firebase/firestore";
import {useEffect,useState} from "react"
import Tasks from "./components/Tasks";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  })

  const onAdd = () => {
    console.log("clicked");
  }

  return (
    <div className = "container">
        {/* <Header title = "Your tasks" onClick = {onAdd}/> */}

        <Auth />
        {user !== null ? <Tasks/> : <h3>Log in</h3>}
    </div>
  );
}

export default App;
