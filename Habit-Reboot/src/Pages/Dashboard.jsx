import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylings/Dashboard.css';
export default function Dashboard()
{
    const navigate = useNavigate();
    return(<>
    <h1>Welcome my Nigga</h1>
   
    <p>This is your Dashboard Here you can Access everything</p>
    
    <button className = "Land" onClick={()=>navigate("/")}>Landing Page</button>
    </>)
}
