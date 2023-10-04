import { Dialog,Button, Typography} from '@mui/material'
import React ,{useState}from 'react'
import InputGroup from './InputGroup';
import SignupDialog from './SignupDialog';
import { apiFetchCurrentUser } from '../api';
import {LoadingButton} from '@mui/lab'

function LoginDialog({open,setOpen}) {
    const [signup,setSignup]=useState(false)
    const [newEntry,setNewEntry]=useState({email:'',password:''})
    const[emailErr,setEmailErr]=useState('')
    const[userErr,setUserErr]=useState('')
    const[passwordErr,setPasswordErr]=useState('')
    const [loading,setLoading]=useState(false)
    const inputHandler=(e)=>{
        setNewEntry({...newEntry,[e.target.name]:e.target.value})
        setUserErr('')
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
    const submitForm=async ()=>{
        emailValidation();
        passwordValidation();
        if(emailValidation&&passwordValidation()){
            setLoading(true)
            try{
                const user=await apiFetchCurrentUser(newEntry.email,newEntry.password);
                if(user){
                       setOpen(false)
                       setNewEntry({email:'',password:''})
                       setUserErr('')
                       setLoading(false)
                }
                else{
                    setUserErr('User Not Found')
                    setLoading(false)
                }
            }
            catch(err){
                console.log(err)
            }
        }
    }
  return (
    <>
    <Dialog fullWidth maxWidth={'sm'} open={open} onClose={()=>{setOpen(false);setUserErr('');setLoading(false); setNewEntry({email:'',password:''})}}>
        <div style={{display:'flex',justifyContent:'space-evenly',flexDirection:'column',padding:'25px', width:'100%',minHeight:'400px'}}>
        <InputGroup label={'Enter Your Email'} name={"email"} onChange={inputHandler} error={emailErr} value={newEntry.email} />
        <InputGroup type={'password'} label={'Enter Your password'} name={"password"} onChange={inputHandler} error={passwordErr} value={newEntry.password}/>
        <LoadingButton onClick={submitForm} variant='contained' loading={loading} loadingPosition='start' color='success' sx={{marginInline:'auto',marginTop:"15px",width:{sm:'250px',xs:'100%'}}}>
            <span>Login</span>
        </LoadingButton>
        {userErr&&<Typography sx={{textAlign:'center',marginTop:'10px'}} color={'error'}>{userErr}</Typography>}
        <Typography textAlign={'center'} marginTop={'15px'}>New User? <Button onClick={()=>{setSignup(true);setOpen(false)}} sx={{marginLeft:'10px'}} variant='outlined' color='success'>Sign Up</Button></Typography>
        </div>
      </Dialog>
      <SignupDialog open={signup} setOpen={setSignup}></SignupDialog>
    </>
  )
}

export default LoginDialog