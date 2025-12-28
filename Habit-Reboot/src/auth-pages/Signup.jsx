import { useNavigate } from "react-router-dom";
import '../stylings/Signup.css'; 
import { useState } from "react";
import { signup } from "../firebase/auth";
export default function Signup()
{
const navigate = useNavigate();    
 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const logged = ()=>
{
navigate("/login")
}
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await signup(email, password);
      alert("Account created successfully 🎉");
      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("User already exists. Please login.");
      } else if (err.code === "auth/invalid-email") {
        alert("Invalid email format.");
      } else {
        alert("Something went wrong. Try again.");
      }
    }
  };


    return(<>
    
        
    <div className="signup-page">
         <form className="container" onSubmit={handleSignup}>
         
        
        <div className="loginBox">
            
            <h1>Your Journey to Better Habits Starts Here</h1>

            <input type = "email" placeholder="Enter Email"
            onChange={(e)=> setEmail(e.target.value)}required></input>
           <input type = "password" placeholder="Password" 
           onChange={(e)=> setPassword(e.target.value)} required></input>
           <button type="submit" className="sign">Sign In</button>
           <button type="button" className= "log" onClick={logged}>Already a user?</button>

            </div>
            </form>

        
             </div>
    </>) 
    
}

            