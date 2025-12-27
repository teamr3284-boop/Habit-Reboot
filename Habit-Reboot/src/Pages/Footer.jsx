import {useNavigate, Link} from 'react-router-dom';
export default function Footer()
{
    const navigate = useNavigate()
    return(
        <>
        <Link to = "./Aboutus">About Us</Link>
        <p>Check us out our Githubs</p>
        </>
    )
}