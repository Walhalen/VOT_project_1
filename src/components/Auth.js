import {auth, db, googleProvider} from "../config/firebase";


import {useState} from "react"

export const Auth = ({login, signedIn, signedInWithGoogle}) => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
            <button onClick = {()=>{signedIn(email, password)}}>Signed in</button>

            <button onClick = {()=>{signedInWithGoogle(email, password)}}>Signed with Google</button>
            <button onClick = {()=>{login(email,password)}}>Log in</button>
            
        </div>
    )
}

export default Auth