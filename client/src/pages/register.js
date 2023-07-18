import './register.css';
import {useState} from 'react';
import Axios from 'axios';
export const Register = () =>
{
     const[username,setUserName] = useState("");
     const[password,setPassword] = useState("");

     const validate = async () =>
     {
        try{
           console.log(username,password);
           const response = await Axios.post("http://localhost:5000/users/register",{username,password});
           alert(response.data);
        }
        catch(err)
        {
            console.log(err);
        }
     };
     return ( <div className="register">
     <div className="wrapper">
     <h1>Register</h1>
     <form >
     <label htmlFor="username">Username:</label> <br />
     <input id="username" placeholder="enter your username..." type="text" onChange={ (event) => setUserName(event.target.value) } /> <br />
     <label htmlFor="password">Password:</label> <br />
     <input id="password" placeholder="enter your Password..." type="password" onChange={ (event) => setPassword(event.target.value) } /> <br />
     <button type="button" className="reg_button" onClick={validate} >Register</button>
     </form>
     </div>

     </div> );
};