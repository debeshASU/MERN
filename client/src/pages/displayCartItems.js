import Axios from 'axios';
import {useState,useEffect} from 'react';
export const DisplayCartItems = (props) =>
{
    const{p_id,quantity} = props.prod;
    const[product,setProduct] = useState({});
    const user_id = window.localStorage.getItem("user_id");
    const[cartQuantity,setCartQuantity] = useState(0);
    const addToCart = async (p_id) =>
    {
      try{
        const response = await Axios.put("http://localhost:5000/users/addItem",{user_id,p_id});
        setCartQuantity(response.data);
        window.location.reload();
      }
      catch(err)
      {
        console.log(err);
      }
    };
    const removeFromCart = async() =>
    {
        try{
            const response = await Axios.put("http://localhost:5000/users/removeItem",{user_id,p_id});
            setCartQuantity(response.data);
            window.location.reload();
        }
        catch(err)
        {
          console.log(err);
        }
    };
    const getProduct = async () =>
    {
        try{
           const response = await Axios.get(`http://localhost:5000/products/${p_id}`);
           setProduct(response.data);
           setCartQuantity(quantity);
        }
        catch(err)
        {
            console.log(err);
        }
    }
    useEffect( () =>
    {
       getProduct();
    },[] );
    return (<div className='displayCartItems'>
     {  cartQuantity > 0 &&( <><img src={product.product_image_url} />
     <div className='description'>
     <p>{product.product_name}</p>
     <p>${product.product_price}</p>
     <div className='addToCartBttn'>
     <button type='button' onClick={()=>removeFromCart(p_id)}>-</button>
     <button type='button'>{cartQuantity}</button>
     <button type='button' onClick={()=>addToCart(p_id)}>+</button>
     </div>
     </div></>) }
     
    </div>);
};