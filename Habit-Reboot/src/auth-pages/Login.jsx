import '../stylings/Login.css'
import { useState } from "react";
import { login } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
export default function Login()
{ 
    const navigate = useNavigate();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("")
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("Login successful...Noice");
      navigate("/Dashboard");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        alert("No account found. You tryna act smart..Go sign up.");
      } else if (err.code === "auth/wrong-password") {
        alert("Incorrect password...you forgot ur password or what");
      } else if (err.code === "auth/invalid-email") {
        alert("Invalid email address...Wow u came to sign and dont have valid id");
      } else {
        alert("Login failed. Try again...maybe in next life");
      }
    }
  };

    return(<>
    <div className="contains">
            <form className= "loginbox" onSubmit={handleLogin}>
    <div className="inputs">
        <h1 class="heading">Control habits before they control you</h1>
        <input type="email" placeholder="Email"onChange={(e)=> setEmail(e.target.value)}required></input>
        <input type="password" placeholder="Password" 
        onChange={(e)=> setPassword(e.target.value)}required></input>
        <div className="buttons">
        <button type="submit" className="log-in">Log in</button>
        <button type="button" classname="sign" onClick= {()=> navigate("/Signup")}>New User?{" "}</button>
        </div>
        </div>
        </form>
        </div>
        </>)
}
