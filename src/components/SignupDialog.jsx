import { Button, Dialog, Typography } from '@mui/material'
import React, { useState } from 'react'
import InputGroup from './InputGroup'
import { apiSignup } from '../api'

function SignupDialog({open,setOpen}) {
    const[newEntry,setNewEntry]=useState({name:'',email:'',password:'',orders:[],cartItems:[],phone:''})
    const [nameErr,setNameErr]=useState('')
    const [emailErr,setEmailErr]=useState('')
    const [phoneErr,setPhoneErr]=useState('')
    const [passwordErr,setPasswordErr]=useState('')
    const [feedback,setFeedBack]=useState('')
    const inputHandler=(e)=>{
        setNewEntry({...newEntry,[e.target.name]:e.target.value})
        setFeedBack('')
    }
    const formValidation=(type,input)=>{
        const inputTrimmed= input.trim()
        if(type==='name'){
            if(inputTrimmed.length<=3){
                setNameErr('Please Enter Your Name')
                return false
            }
            else{
                setNameErr('')
                return true
            }
        }
        if(type==='email'){
            if(!inputTrimmed.length>=3||!inputTrimmed.includes('@')){
                setEmailErr('Please Enter a Valid Email')
                return false
            }
            else{
                setEmailErr('')
                return true
            }
        }
        if(type==="phone"){
            if(inputTrimmed.length!==10){
                setPhoneErr('Phone Number must be 10 Characters')
                return false
            }
            else{
                setPhoneErr('')
                return true
            }
        }
        if(type==="password"){
            if(inputTrimmed.length<=7){
                setPasswordErr('Password must be More than 8 characters')
                return false
            }
            else{
                setPasswordErr('')
                return true
            }
        }
    }
    const submitForm= async()=>{
        formValidation("name",newEntry.name)
        formValidation('email',newEntry.email)
        formValidation('phone',newEntry.phone)
        formValidation('password',newEntry.password)
        if(formValidation("name",newEntry.name)&&formValidation('email',newEntry.email)&&formValidation('phone',newEntry.phone)&&formValidation('password',newEntry.password)){
            try{
                const response=await apiSignup(newEntry);
                if(response){
                    setFeedBack('You can Now Login with Your Email and Password')
                    setNewEntry({name:'',email:'',cartItems:[],password:'',phone:'',orders:[]})
                    setTimeout(()=>{setOpen(false);setFeedBack('')},2000)
                }
                else{
                    setFeedBack('Email Id Registered with Us')
                }
            }
            catch(err){
                console.log(err)
            }
            
           
        }
    }
  return (
    <>
    <Dialog fullWidth maxWidth={'sm'} style={{padding:'10px'}} open={open} onClose={()=>{setOpen(false);setNewEntry({name:'',email:'',password:'',orders:[],cartItems:[],phone:''})}}>
        <Typography variant='h5' component={'p'} textAlign={'center'} sx={{marginTop:'10px',color:'crimson'}}>Sign Up Form</Typography>
    <div style={{display:'flex',justifyContent:'space-evenly',flexDirection:'column',padding:'25px', width:'100%'}}>
        <InputGroup label={'Enter Your Name'} name={"name"} onChange={inputHandler} error={nameErr} value={newEntry.name}/>
        <InputGroup label={'Enter Your Email'} name={"email"} onChange={inputHandler} error={emailErr} value={newEntry.email} />
        <InputGroup label={'Enter Your Phone Number'} name={"phone"} onChange={inputHandler} error={phoneErr} value={newEntry.phone}/>
        <InputGroup type='password' label={'Enter Your password'} name={"password"} onChange={inputHandler} error={passwordErr} value={newEntry.password}/>
        <Button onClick={submitForm}  variant="outlined" color='success' sx={{width:'100%',marginTop:"15px"}}>Sign Up</Button>
        {feedback&&<Typography textAlign={"center"} sx={{marginTop:'15px'}} color={'error'}>{feedback}</Typography>}
        </div>
    </Dialog>
    </>
  )
}

export default SignupDialog