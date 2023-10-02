import { Dialog, DialogActions,Button, Typography} from '@mui/material'
import React ,{useState}from 'react'
import InputGroup from './InputGroup';
import { useDispatch, } from 'react-redux';
import {  setCart, setOrders } from '../slices/dataSlice';
import { setLoggedInUser,setIsloggedIn } from '../slices/dataSlice';
import SignupDialog from './SignupDialog';
import axios from 'axios';

function LoginDialog({open,setOpen}) {
    const [signup,setSignup]=useState(false)
    const dispatch=useDispatch();
    const [newEntry,setNewEntry]=useState({email:'',password:''})
    const[emailErr,setEmailErr]=useState('')
    const[userErr,setUserErr]=useState('')
    const[passwordErr,setPasswordErr]=useState('')
    const inputHandler=(e)=>{
        setNewEntry({...newEntry,[e.target.name]:e.target.value})
        setUserErr('')
        console.log(newEntry)
    }
    const emailValidation=()=>{
        if(!newEntry.email.includes('@')){
            setEmailErr('Please Enter a Valid Email')
            return false
        }
        else{
            setEmailErr('')
            return true
        }
    }
    const passwordValidation=()=>{
        if(newEntry.password.length<=8){
            setPasswordErr('Password must be 8 characters')
            return false
        }
        else{
            setPasswordErr('')
            return true
        }
    }
    const submitForm=()=>{
        emailValidation();
        passwordValidation();
        if(emailValidation&&passwordValidation()){
        axios.get('http://localhost:5500/users').then(response=>{
            if(response){
                const users = response.data;
                let index=users.findIndex(user=>user.email===newEntry.email&&user.password===newEntry.password)
                if(index!==-1){
                   dispatch(setLoggedInUser(users[index])) 
                   dispatch(setIsloggedIn(true));
                   dispatch(setCart(users[index].cartItems));
                   dispatch(setOrders(users[index].orders))
                   setOpen(false)
                   setNewEntry({email:'',password:''})
                }
                else{
                    setUserErr('Login Credentials are wrong!!!')
                }
            }
            else{
                console.log('wait')
            }
        })
        }
    }
  return (
    <>
    <Dialog fullWidth style={{padding:'25px',maxWidth:'700px',minWidth:'100vw'}} open={open} onClose={()=>setOpen(false)}>
        <div style={{display:'flex',justifyContent:'space-evenly',flexDirection:'column',padding:'25px', width:'100%'}}>
        <InputGroup label={'Enter Your Email'} name={"email"} onChange={inputHandler} error={emailErr} value={newEntry.email} />
        <InputGroup type={'password'} label={'Enter Your password'} name={"password"} onChange={inputHandler} error={passwordErr} value={newEntry.password}/>
        <Button onClick={submitForm}  variant="outlined" color='error' sx={{width:'100%',marginTop:"15px"}}>Login</Button>
        {userErr&&<Typography color={'error'}>{userErr}</Typography>}
        <Typography textAlign={'center'} marginTop={'25px'}>New User? <Button onClick={()=>{setSignup(true);setOpen(false)}} variant='contained' color='success'>Sign Up</Button></Typography>
        </div>
        <DialogActions>
          <Button variant='contained' onClick={()=>{setOpen(false)}}>Close</Button>
        </DialogActions>
      </Dialog>
      <SignupDialog open={signup} setOpen={setSignup}></SignupDialog>
    </>
  )
}

export default LoginDialog