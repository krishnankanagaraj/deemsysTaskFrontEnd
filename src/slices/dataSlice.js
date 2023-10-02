import { createSlice } from "@reduxjs/toolkit";
const initialState={
    allProducts:[],
    users:[],
    isLoggedIn:false,
    loggedInUser:{},
    cart:[],
    orders:[],
}
export const dataSlice=createSlice({
    name:'products',
    initialState,
    reducers:{
        fetchData:(state,action)=>{
            state.allProducts=action.payload
        },
        fetchUsers:(state,action)=>{
          state.users=action.payload
        },
        setIsloggedIn:(state,action)=>{
            state.isLoggedIn=action.payload
        },
        setLoggedInUser:(state,action)=>{
            state.loggedInUser=action.payload
        },
        setCart:(state,action)=>{
            state.cart=action.payload
        },
        setOrders:(state,action)=>{
            state.orders=action.payload
        }
    }
})

export const {fetchData,fetchUsers,setIsloggedIn,setLoggedInUser,setCart,setOrders}=dataSlice.actions
export const getProducts=(state)=>state.products.allProducts
export const getUsers=(state)=>state.products.users
export const isLogIn=(state)=>state.products.isLoggedIn
export const currentUser=(state)=>state.products.loggedInUser
export const cart=(state)=>state.products.cart
export const orders=(state)=>state.products.orders
export default dataSlice.reducer