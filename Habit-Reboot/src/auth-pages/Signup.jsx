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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#000b76" fill-opacity="1" d="M0,160L21.8,165.3C43.6,171,87,181,131,186.7C174.5,192,218,192,262,170.7C305.5,149,349,107,393,122.7C436.4,139,480,213,524,234.7C567.3,256,611,224,655,176C698.2,128,742,64,785,64C829.1,64,873,128,916,181.3C960,235,1004,277,1047,288C1090.9,299,1135,277,1178,234.7C1221.8,192,1265,128,1309,106.7C1352.7,85,1396,107,1418,117.3L1440,128L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"></path></svg>
          

        
             
    </>)
    
}
