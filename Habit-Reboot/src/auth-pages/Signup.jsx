import { useNavigate } from "react-router-dom";
import '../stylings/Signup.css'; 
export default function Signup()
{
const navigate = useNavigate();    
const Dashboard = () =>
{
    navigate("/Dashboard")
}
const logged = () =>
{
    navigate("/Login")
}

    return(<>
    
        
    
         <div className="container">
         
        
        <div className="loginBox">
            
            <h1>Your Journey to Better Habits Starts Here</h1>

            <input type = "email" placeholder="Enter Email"></input>
           <input type = "password" placeholder="Password"></input>
           <button className="sign" onClick={Dashboard}>Sign In</button>
           <button className= "log" onClick={logged}>Already a user?</button>

            </div>
            </div>

        
             
    </>) 
    
}

            