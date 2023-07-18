//import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Login } from './pages/login';
import { Home } from './pages/home';
import { Register } from './pages/register';
import { Cart } from './pages/cart';
import { Navbar } from "./components/Navbar";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
