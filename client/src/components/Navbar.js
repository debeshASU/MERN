import { Link } from 'react-router-dom';
import { ShoppingCart } from 'phosphor-react';
import './Navbar.css';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';
export const Navbar = () => {
  const[cookies,setCookies] = useCookies(["Access_Token"]);
  const navigate = useNavigate();

  const Logout = () =>
  {
     setCookies("Access_Token","");
     window.localStorage.removeItem("user_id");
     navigate("/");
  };
  return (
    <div className='nav'>
      <div className='navLinks'>
        { cookies.Access_Token ? <>(<Link to='/home'>Shop</Link>
        <Link to='/cart'>
          <ShoppingCart size={32} />
        </Link>
        <button type='button' className='btn' onClick={Logout} >
          Logout
        </button>)</> : (<> <Link to={"/"}>Login</Link>
                            <Link to={"/register"}>Register</Link>  </>) }
        
      </div>
    </div>
  );
}
