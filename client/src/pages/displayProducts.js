import './home.css';
import {useState} from 'react';
import Axios from 'axios' ;
export const Display = (props) =>
{
    const{product_image_url,_id,product_name,product_price} = props.product ;
    const[cartItemCount,setCartItemCount] = useState(0);
    const user_id = window.localStorage.getItem("user_id");
    const addTOCart = async (p_id) =>
    {
      try{
        console.log(user_id,p_id);
        const response = await Axios.put("http://localhost:5000/users/addItem",{user_id,p_id});
        console.log(response);
        setCartItemCount(response.data);
      }
      catch(err)
      {
        console.log(err);
      }
    };
    return (<div className="products">
    <img src={product_image_url} />
    <div className="description">
    <p><b>{product_name}</b></p>
    <p><b>${product_price}</b></p>
    <button className='addToCartBttn' onClick={() => addTOCart(_id)}>AddToCart{ cartItemCount > 0 && <>({cartItemCount})</> }</button>
    </div>
    </div>);
};