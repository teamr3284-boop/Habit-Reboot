import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth-pages/Login.jsx";
import Signup from "./auth-pages/Signup.jsx";
import Dashboard from './Pages/Dashboard.jsx';
import Navbar from './Pages/Navbar.jsx';
import './App.css';



export default function App() {
  return(
    <>
    
    <BrowserRouter>
     <Navbar/>
     <h1>Welcome to Habit-Reboot</h1>
     <span>
    <p>A website where you can</p>
    <p>Track. Reflect. And Control your habits</p>
    </span>
    <Routes>
     
    <Route path="/Login" element={<Login />}/>
<Route path="/Signup" element={<Signup />} />
<Route path="/dashboard" element={<Dashboard />}/>
</Routes>
    </BrowserRouter>
    
    </>
  )
}

