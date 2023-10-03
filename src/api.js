import { fetchData, setCart, setIsloggedIn, setLoggedInUser, setOrders } from "./slices/dataSlice"
import axios from "axios"
import {store} from './store/store'
const URI='https://deemsystask.onrender.com'

//Products Api Call
export const apiFetchProducts= async ()=>{
    let apiData=localStorage.getItem('products')
    if(apiData){
      fetchData(JSON.parse(apiData))
    }
    else{
        await axios.get(`${URI}/products`).then(response=>{
             apiData = response.data;
            localStorage.setItem('products',JSON.stringify(apiData))
            store.dispatch(fetchData(apiData))
          })
    }
    return apiData;
}
//Login Api Call
export const apiFetchCurrentUser=async (email,password)=>{
   const response=await axios.get(`${URI}/users/${email}`)
        if(response){
            const data=response.data
            if(data.email===email&&data.password===password){
                   store.dispatch(setLoggedInUser(data))
                   store.dispatch(setIsloggedIn(true));
                   store.dispatch(setCart(data.cartItems));
                   store.dispatch(setOrders(data.orders)) 
                   return data
            }
            else{
                 return null;
            }
        }
}
// signUp api call
export const apiSignup=async (newEntry)=>{
    const response=await axios.get(`${URI}/Users`)
    const users=response.data;
    let index=users.findIndex(user=>user.email===newEntry.email);
    if(index===-1){
        const response=await axios.post(`${URI}/addUser`,newEntry,{headers:{"Content-Type":'application/json'}})
        if(response){
            return true
        }
    }
    else{
        return false
    }
}
// Api call to add a item to cart
export const apiAddCart=async (email,data)=>{
    const cart=await axios.get(`${URI}/getCart/${email}`)
    if(cart){
        let index=cart.data.findIndex(t=>t._id===data._id)
        if(index===-1){
            const response=await axios.post(`${URI}/addCart/${email}`,data,{headers:{"Content-Type":"application/json"}})
            if(response)
            {   
                const newCart=await axios.get(`${URI}/getCart/${email}`)
                store.dispatch(setCart(newCart.data))
                return true
            }
        }
        else{
            return false
        }
    }
}

// api call to delete a cart item
export const apiDeleteCart = async (cart,email,data) =>{
        let newCart=cart.filter(item=>item._id!==data._id)
        const response=await axios.post(`${URI}/deleteCartItem/${email}`,newCart,{headers:{"Content-Type":"application/json"}})
        if(response){
        const cart=await axios.get(`${URI}/getCart/${email}`)
                        store.dispatch(setCart(cart.data))
                        return true
        } 
        else{
            return false
        }
}
//api call to move orders from cart to orders
export const apiAddOrders=async(email) =>{
    const response=await axios.post(`https://deemsystask.onrender.com/addOrders/${email}`,{headers: {'Content-Type': 'application/json',}})
    if(response){
        const response=await axios.get(`${URI}/users/${email}`)
        if(response){
            store.dispatch(setCart(response.data.cartItems))
            store.dispatch(setOrders(response.data.orders))
            return true
        }
    }
    else{
        return false
    }
}
//Api call to Add enquiry data
export const apiEnquiry=async(data)=>{
    const response =await axios.post(`${URI}/addEnquiry`,data,{headers:{"Content-Type":'application/json'}})
    if(response){
        return true
    }
}