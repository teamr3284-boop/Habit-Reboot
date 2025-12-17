import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth-pages/Login.jsx";
import Signup from "./auth-pages/Signup.jsx";
import Dashboard from './Pages/Dashboard.jsx';
import Navbar from './Pages/Navbar.jsx';
import Landing from "./Pages/Landing.jsx";
import ToggleDark from "./Pages/ToggleDark.jsx";
import './App.css';



export default function App() {
  return(
    <>
    
    <BrowserRouter>
     <Navbar/>

    <Routes>
     <Route path="/" element= {<Landing/>}/>
    <Route path="/Login" element={<Login />}/>
<Route path="/Signup" element={<Signup />} />
<Route path="/dashboard" element={<Dashboard />}/>
</Routes>
<ToggleDark/>
    </BrowserRouter>
    
    </>
  )
}

