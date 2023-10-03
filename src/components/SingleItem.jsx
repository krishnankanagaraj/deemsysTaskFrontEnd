import { Dialog, Typography,Button, CardHeader, CardMedia, CardContent, CardActions, Rating, DialogActions,Card, DialogContent } from '@mui/material'
import React, { useState } from 'react'
import { ErrorOutline, ShoppingCartCheckout } from '@mui/icons-material'
import { useSelector } from 'react-redux';
import { currentUser, isLogIn} from '../slices/dataSlice';
import LoginDialog from './LoginDialog';
import { apiAddCart } from '../api';

function SingleItem({open,setOpen,product}) {
    const item=product
    const[dialog,setDialog]=useState(false)
    const[feedback,setFeedBack]=useState(false)
    const isLoggedIn=useSelector(isLogIn)
    const user=useSelector(currentUser)
    const addToCart= async(data)=>{
        if(isLoggedIn){
            try{
                const reponse=await apiAddCart(user.email,data)
                if(reponse){
                    setFeedBack(false)
                    setOpen(false)
                }
                else{
                    setFeedBack(true)
                    setOpen(false)
                    setTimeout(()=>{
                        setFeedBack(false)
                    },1000)
                }
            }
            catch(err){
                console.log(err)
                setOpen(false)
            }
        }  
        else{
            setDialog(true)
            setOpen(false)
        }
        }
  return (
    <>
    <Dialog fullWidth={true}
        maxWidth={'md'}
         open={open} sx={{overflowY:'scroll'}} onClose={()=>{setOpen(false)}}>
        <DialogContent>
            <Card sx={{boxShadow:'0'}} >
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
                <Typography variant="body1" textAlign={'justify'} component={'p'} color="text.secondary">
                {item.description}
                </Typography>
                <div className='itemPrice' style={{display:'flex',gap:'10px',alignItems:'center',}}>
                <Typography sx={{marginLeft:{md:'auto'}}} variant='subtitle1' component={'p'}>Reviews : </Typography>
                <div style={{display:'flex'}}>
                <Rating precision={0.25} name="read-only" value={item.rating?.rate} readOnly />
                <Typography>({item.rating?.count})</Typography>
                </div>
                <Typography sx={{marginInline:'auto'}} variant='h6'>Price: <span style={{color:'crimson'}}>₹{item.price}</span></Typography>
                </div>
            </CardContent>
            <CardActions sx={{display:'flex',justifyContent:'center'}}>
                <Button onClick={()=>{addToCart(item)}} sx={{display:'flex',alignItems:'center',fontSize:'1rem'}} variant='contained' color='success'>
                
                <ShoppingCartCheckout sx={{fontSize:30,color:'white'}}></ShoppingCartCheckout>
                Add to Cart
                </Button>
               
            </CardActions>
            </Card>
        </DialogContent>   
    <DialogActions>
        <Button onClick={()=>setOpen(false)}>Close</Button>
    </DialogActions>
    </Dialog>
    <Dialog fullWidth maxWidth={'sm'} open={feedback} onClose={()=>{setFeedBack(false)}}>
        <div style={{padding:'20px'}}>
        <Typography variant='h5' component={'h3'} sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',textAlign:'center'}}>
          <ErrorOutline sx={{fontSize:100,color:'crimson'}}></ErrorOutline>
            <span>Item Already in Cart</span>
        </Typography>
        </div>
   
    </Dialog>
    <LoginDialog open={dialog} setOpen={setDialog} ></LoginDialog>
    </>
  )
}

export default SingleItem