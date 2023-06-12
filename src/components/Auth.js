import {auth, googleProvider} from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import {useState} from "react"

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(auth?.currentUser?.email);

    const signedIn = async() => {
        try{
            await createUserWithEmailAndPassword(auth, email, password)
        }catch(err)
        {
            console.error(err)
        }
        
    }

    const signedInWithGoogle = async() => {
        try{
            await signInWithPopup(auth, googleProvider)
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
            <input placeholder="Email..." onChange = {(e) => setEmail(e.target.value)}/> 
            <input placeholder="Password..." type = "password" onChange = {(e) => setPassword(e.target.value)}/>
            <button onClick = {signedIn}>Signed in</button>

            <button onClick = {signedInWithGoogle}>Signed with Google</button>

            <button onClick = {logout}>Log out</button>
        </div>
    )
}

export default Auth
