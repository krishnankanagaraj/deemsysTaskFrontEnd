import { Dialog, Typography,Button, CardHeader, CardMedia, CardContent, CardActions, Rating, DialogActions } from '@mui/material'
import React, { useState } from 'react'
import { ShoppingCartCheckout } from '@mui/icons-material'
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { cart, currentUser, isLogIn, setCart, setLoggedInUser } from '../slices/dataSlice';
import axios from 'axios';
import LoginDialog from './LoginDialog';

function SingleItem({open,setOpen,product}) {
    const item=product
    const cartItems=useSelector(cart)
    const[dialog,setDialog]=useState(false)
    const[feedback,setFeedBack]=useState(false)
    const isLoggedIn=useSelector(isLogIn)
    const user=useSelector(currentUser)
    const dispatch=useDispatch();
    const addToCart=(data)=>{
        if(isLoggedIn){
            let index=cartItems.findIndex(item=>item._id===data._id)
            if(index===-1){
                console.log('item not in list')
                axios.post(`http://localhost:5500/addCart/${user.email}`,data,{headers:{"Content-Type":'application/json'}}).then(response=>{
                    if(response){
                        setOpen(false);
                        axios.get(`http://localhost:5500/users/${user.email}`).then(response=>{
                            if(response){
                                const user=response.data
                                dispatch(setLoggedInUser(user))
                                dispatch(setCart(user.cartItems))
                            }
                        })
                    }
                })
            }
            else{
                setFeedBack(true)
                setTimeout(()=>{
                    setFeedBack(false)
                },1000)
            }
        }
        else{
            setDialog(true)
            setOpen(false)
        }
        }
    
  return (
    <>
    <Dialog open={open} sx={{padding:'10px'}} onClose={()=>{setOpen(false)}}>
                
            <Card >
            <CardHeader
                title={item.title}
                subheader={"Size: "+item.Size}
                sx={{color:'crimson'}}
            />
            <CardMedia
                component="img"
                height="300"
                image={`/images/${item.category}/${item.images}`}
                alt={item.images}
                sx={{padding:'10px'}}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary">
                {item.description}
                </Typography>
                <div className='itemPrice' style={{display:'flex',gap:'10px',alignItems:'center'}}>
                <div>
                <Typography variant='subtitle1' component={'p'}>Reviews : </Typography>
                <Rating precision={0.25} name="read-only" value={item.rating?.rate} readOnly />
                <Typography>({item.rating?.count})</Typography>
                </div>
                <Typography sx={{marginLeft:{md:'auto',lg:'auto',sm:'auto',xs:'25px'},marginRight:'15px'}} variant='h6'>Price: <span style={{color:'crimson'}}>₹{item.price}</span></Typography>
                </div>
            </CardContent>
            <CardActions sx={{display:'flex',justifyContent:'center'}}>
                <Button onClick={()=>{addToCart(item)}} sx={{display:'flex',alignItems:'center',fontSize:'1rem'}} variant='contained' color='success'>
                
                <ShoppingCartCheckout sx={{fontSize:30,color:'white'}}></ShoppingCartCheckout>
                Add to Cart
                </Button>
               
            </CardActions>
            </Card>
    <DialogActions>
        <Button onClick={()=>setOpen(false)}>Close</Button>
    </DialogActions>
    </Dialog>
    <Dialog open={feedback} onClose={setFeedBack}>
        <Typography variant='h3'>
            Item already in Your Cart
        </Typography>
    </Dialog>
    <LoginDialog open={dialog} setOpen={setDialog} ></LoginDialog>
    </>
  )
}

export default SingleItem