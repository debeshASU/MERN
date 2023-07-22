import Axios from 'axios';
import {useState,useEffect} from 'react';
import { DisplayCartItems } from './displayCartItems';
import {useCookies} from 'react-cookie';
import './cart.css';
export const Cart = () =>
{
     const user_id = window.localStorage.getItem("user_id");
     const[cartItems,setCartItems] = useState([]);
     const[totalPrice,setTotalPrice] = useState(0);
     const[cookies,setCookies] = useCookies(["Access_Token"]);
     const getItems = async () =>
     {
       try{
          const response = await Axios.get(`http://ecommerce-api.debeshp.com/users/cartItems/${user_id}`,{headers: {authorization:cookies.Access_Token} });
          setCartItems(response.data);
       }
       catch(err)
       {
          console.log(err);
       }

     };
     const getTotalPrice = async () =>
     {
      try{
         const response = await Axios.get(`http://ecommerce-api.debeshp.com/users/totalPrice/${user_id}`);
         console.log(response.data);
         setTotalPrice(response.data);
      }
      catch(err)
      {
         console.log(err);
      }
     };
     useEffect( () =>
     {
        getItems();
        getTotalPrice();
     },[] );
     return (<div className="cart">
     {
          cartItems.map( (item) =>
          {
            return <DisplayCartItems prod = {item} />
          } )
     }
     {
      totalPrice > 0 ? <><h1>SubTotal : ${totalPrice}</h1></> : <><h1>Your Cart Is Empty...!!!</h1></>
     }


     </div>);
};