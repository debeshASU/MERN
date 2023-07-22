import './login.css';
import {useState} from 'react';
import Axios from 'axios';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';
export const Login = () =>
{
     const[username,setUserName] = useState("");
     const[password,setPassword] = useState("");
     const[cookies, setCookies] = useCookies(["Access_Token"]);
     const navigate = useNavigate();
     const validate = async () =>
     {
        try{
          console.log(username,password);
          const response = await Axios.post("https://ecommerce-api.debeshp.com/users/login", {username,password});
          setCookies("Access_Token",response.data.token);
          window.localStorage.setItem("user_id",response.data.id);
          alert("LoggedIn Successfully...!!!");
          navigate("/home");

        }
        catch(err)
        {
          alert("Invalid attempt...!!!");
        }
     };
     return (<div className="login">
     <div className='log_wrapper'>
     <form>
     <h1>Login</h1>
     <label htmlFor="username">Username:</label><br />
     <input type='text' placeholder='enter your username...' id='username' onChange={(event)=>setUserName(event.target.value)} /><br />
     <label htmlFor="password">Password:</label><br />
     <input type='password' placeholder='enter your Password...' id='password' onChange={(event)=>setPassword(event.target.value)} /><br />
     <button type='button' className='log_btn' onClick={validate}>Login</button>
     </form>
     </div>
     </div>);
};