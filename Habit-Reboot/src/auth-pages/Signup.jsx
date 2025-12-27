import { useNavigate } from "react-router-dom";
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
    <input type = "email" placeholder="Enter Email"></input>
    <input type = "password" placeholder="Password"></input>
    <button className="sign" onClick={Dashboard}>Sign In</button>
    <button className= "log" onClick={logged}>Already a user?</button>
    </>)
}
