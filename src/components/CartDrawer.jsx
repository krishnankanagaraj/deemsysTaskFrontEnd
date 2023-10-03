import {  Drawer, TableBody, TableCell, TableContainer, TableHead, TableRow ,Paper, IconButton, Typography,Button,Table, Dialog} from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cart, currentUser, setCart, setLoggedInUser, setOrders } from '../slices/dataSlice'
import { Delete } from '@mui/icons-material'
import axios from 'axios'

function CartDrawer({open,setOpen}) {
    const [order,setOrder]=useState(false)
    const dispatch=useDispatch()
    const user=useSelector(currentUser)
    const cartItems=useSelector(cart)
    const total=cartItems.reduce((acc,item)=>{
        return acc+=(Number(item.price.split('/')[0]))*(Number(item.Size.split('*')[0])*Number(item.Size.split('*')[1]))
    },0)
    const placeOrder=()=>{
        axios.post(`https://deemsystask.onrender.com/addOrders/${user.email}`,{headers: {'Content-Type': 'application/json',}}).then(response=>{
            if(response){
                    setOrder(true);
                    setOpen(false);
                    axios.get(`https://deemsystask.onrender.com/users/${user.email}`).then(response=>{
                        const data=response.data;
                        dispatch(setLoggedInUser(data))
                        dispatch(setCart(data.cartItems))
                        dispatch(setOrders(data.orders))
                    })
                    setTimeout(()=>{
                        setOrder(false)
                    },1000)
            }
        })
    }
    const removeCartItem=(e,data)=>{
        e.stopPropagation();
        let newCart=cartItems.filter(item=>item._id!==data._id)
        axios.post(`https://deemsystask.onrender.com/deleteCartItem/${user.email}`,newCart,{headers:{"Content-Type":'application/json'}}).then(response=>{
            if(response){
                axios.get(`https://deemsystask.onrender.com/users/${user.email}`).then(response=>{
                        const data=response.data;
                        dispatch(setLoggedInUser(data))
                        dispatch(setCart(data.cartItems))
                    })
            }
        })

    }
  return (
    <>
    <Drawer
    variant="temporary"
    open={open}
    anchor='right'
    onClose={()=>{setOpen(false)}}
    ModalProps={{
    keepMounted: true, // Better open performance on mobile.
    }}
    sx={{'& .MuiDrawer-paper': { boxSizing: 'border-box', width:{xs:'80vw',sm:'60vw',md:'40vw',lg:'40vw'},bgcolor:'crimson',color:'white' ,padding:'10px'},}}>
    <Typography variant='h4' textAlign={'center'} fontWeight={'700'} component={'h4'}><span style={{color:'#333',textTransform:'capitalize'}}> {user.name} </span>Your Cart</Typography>
    {cartItems.length===0&&<Typography textAlign={'center'} component={'h5'} variant="h5" sx={{marginBlock:'auto'}}>Your Cart is Empty</Typography>}
    {cartItems.length!==0&&<TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((item,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.title}
              </TableCell>
              <TableCell align="right">{item.Size}</TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell align="right">
                <IconButton>
                    <Delete onClick={(e)=>{removeCartItem(e,item)}} sx={{fontSize:30}}></Delete>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>Total</TableCell>
            <TableCell>{total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>}
    {cartItems.length!==0&&<Button sx={{marginTop:'auto',marginBottom:'25px'}} variant='contained' color='success' onClick={placeOrder}>Proceed To Checkout</Button>}
    </Drawer>
    <Dialog open={order} onClose={()=>{setOrder(false)}}>
        <div style={{padding:'20px'}}>
        <Typography variant='h3' component={'h3'}>
            Order Placed Sucessfully
        </Typography>
        </div>
   
    </Dialog>
    </>
  )
}

export default CartDrawer