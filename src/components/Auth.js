import {auth, db, googleProvider} from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut, signInWithEmailAndPassword} from "firebase/auth";
import { getDoc, collection, addDoc, setDoc, doc } from "firebase/firestore";
import {useState} from "react"

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    
    
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
    const signedIn = async() => {
        try{
            await createUserWithEmailAndPassword(auth, email, password)

            addUser(email)
        }catch(err)
        {
            console.error(err)
        }
        
    }

    const signedInWithGoogle = async() => {
        try{
            await signInWithPopup(auth, googleProvider).then((userCredential)=>{
                addUser(userCredential.user.email)
            })
            
        }catch(err)
        {
            console.error(err)
        }

    }

    const login = async (email, password) =>{
        try{
            await signInWithEmailAndPassword(auth, email, password)
        }catch(err)
        {
            console.error(err)
        }
    }

    const logout = async() => {
        try{
            await signOut(auth)
        }catch(err)
        {
            console.error(err)
        }

    }
    return (
        <div>
            <input placeholder="Email..." onChange = {(e) => {
                setEmail(e.target.value)
                console.log(auth?.currentUser?.email);
            }}/> 
            <input placeholder="Password..." type = "password" onChange = {(e) => {
                setPassword(e.target.value)
                console.log(auth?.currentUser?.email);
            }}/>
            <button onClick = {signedIn}>Signed in</button>

            <button onClick = {signedInWithGoogle}>Signed with Google</button>
            <button onClick = {()=>{login(email,password)}}>Log in</button>
            <button onClick = {logout}>Log out</button>
        </div>
    )
}

export default Auth
