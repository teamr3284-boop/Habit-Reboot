import { useNavigate } from "react-router-dom";
export default function Login()
{ 
    const navigate = useNavigate();

    const examples = () =>
    {
alert('Yo nigga wtf..u tryna steal or what')
alert('oh its you.....damn you fine piece of shit... sorry Sorry baby😘😘😘😘😘😘😘😘')
    }

    return(<>
    <div className="inputs">
        <input type="email" placeholder="Email"></input>
        <input type="password" placeholder="Password"></input>
        <button className="log-in" onClick={examples}>Log in</button>
        <button classname="sign" onClick= {()=> navigate("/Signup")}>New User?</button>
        </div></>)
}
