import { useState,useEffect } from 'react';
import Axios from 'axios';
import { Display } from './displayProducts';
import {useCookies} from 'react-cookie';
import './home.css'
export const Home = () =>
{
     const[listOfProducts,setListOfProducts] = useState([]);
     const[cookies,setCookies] = useCookies(["Access_Token"]);
     const getProducts = async () =>
     {
        try{
          const response = await Axios.get("https://ecommerce-api.debeshp.com/products", {headers: {authorization:cookies.Access_Token} } );
          setListOfProducts(response.data);
        }
        catch(err)
        {
          console.log(err);
        }
     };

     useEffect( () =>
     {
        getProducts();
     }, [] );
     return ( <div className='home'>
     
     { listOfProducts.map( (product) =>
     {
        return <Display product = {product} />
     } ) }



     </div> );
};