import {  Drawer, TableBody, TableCell, TableContainer, TableHead, TableRow ,Paper, Typography,Table, Dialog} from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { cart, currentUser} from '../slices/dataSlice'
import { Delete, DoneAllOutlined} from '@mui/icons-material'
import { apiAddOrders, apiDeleteCart } from '../api'
import { LoadingButton } from '@mui/lab'

function CartDrawer({open,setOpen}) {
    const [order,setOrder]=useState(false)
    const user=useSelector(currentUser)
    const cartItems=useSelector(cart)
    const [loading,setLoading]=useState(false)
    const [orderLoading,setOrderLoading]=useState(false);
    const total=cartItems&&cartItems.reduce((acc,item)=>{
        return acc+=(Number(item.price.split('/')[0]))*(Number(item.Size.split('*')[0])*Number(item.Size.split('*')[1]))
    },0)
    const placeOrder=async ()=>{
      setOrderLoading(true)
      const response=await apiAddOrders(user.email)
            if(response){
                    setOrder(true);
                    setOpen(false);
                    setOrderLoading(false)
                    setTimeout(()=>{
                        setOrder(false)
                    },1000)
            }
    }
    const removeCartItem= async(e,data)=>{
        e.stopPropagation();
        try{
         const response= await apiDeleteCart(cartItems,user.email,data)
         if(response){
          setLoading(false)
         }

        }
        catch(err){
          console.log(err)
        }
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
    sx={{'& .MuiDrawer-paper': { boxSizing: 'border-box', width:{xs:300,sm:'50vw',md:450} ,padding:'10px'},}}>
    <Typography variant='h4' textAlign={'center'} fontWeight={'700'} component={'h4'}><span style={{color:'crimson',textTransform:'capitalize'}}> {user.name} </span>Your Cart</Typography>
    {cartItems.length===0&&
    <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',marginBlock:'auto'}}>
      <img src='/empty-cart.png' style={{width:'30%',marginBlock:'10px'}} alt='empty cart'/>
    <Typography component={'h5'} variant="h5">Your Cart is Empty</Typography>
    </div>}
    {cartItems.length!==0&&<TableContainer sx={{paddingInline:'15px'}} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">Rate</TableCell>
            <TableCell align='right'>Price</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((item,index) => {
            const orderValue=(Number(item.price.split('/')[0]))*(Number(item.Size.split('*')[0])*Number(item.Size.split('*')[1]));
            return(
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.title}
                </TableCell>
                <TableCell align="right">{item.Size}</TableCell>
                <TableCell align="right">{item.price}</TableCell>
                <TableCell align="right">{orderValue}</TableCell>
                <TableCell align="right">
                  <LoadingButton variant='text' color='error' loading={loading}  onClick={(e)=>{removeCartItem(e,item);setLoading(true)}} >
                      <Delete sx={{fontSize:30}}></Delete>
                  </LoadingButton>
                </TableCell>
              </TableRow>
            )
          })}
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align='right'>Total</TableCell>
            <TableCell align='right'>{total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>}
    {cartItems.length!==0&&<LoadingButton loading={orderLoading} loadingPosition='start' sx={{marginTop:'auto',marginBottom:'25px'}} variant='contained' color='success' onClick={placeOrder}>Proceed To Checkout</LoadingButton>}
    </Drawer>
    <Dialog maxWidth={'sm'} fullWidth open={order} onClose={()=>{setOrder(false)}}>
        <div style={{padding:'20px'}}>
        <Typography variant='h5' component={'h3'} sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',textAlign:'center'}}>
          <DoneAllOutlined sx={{fontSize:100,color:'crimson'}}></DoneAllOutlined>
            <span>Order Placed Sucessfully</span>
        </Typography>
        </div>
   
    </Dialog>
    </>
  )
}

export default CartDrawer