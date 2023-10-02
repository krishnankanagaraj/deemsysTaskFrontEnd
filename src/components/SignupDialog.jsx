import { Button, Dialog, Typography } from '@mui/material'
import React, { useState } from 'react'
import InputGroup from './InputGroup'
import axios from 'axios'

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
        console.log(newEntry)
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
                console.log('call')
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
    const submitForm=()=>{
        formValidation("name",newEntry.name)
        formValidation('email',newEntry.email)
        formValidation('phone',newEntry.phone)
        formValidation('password',newEntry.password)
        if(formValidation("name",newEntry.name)&&formValidation('email',newEntry.email)&&formValidation('phone',newEntry.phone)&&formValidation('password',newEntry.password)){
            axios.get('http://localhost:5500/users').then(response=>{
                if(response){
                    const users=response.data;
                    let index=users.findIndex(user=>user.email===newEntry.email);
                    console.log(index)
                    if(index===-1){
                        axios.post('http://localhost:5500/addUser',newEntry,{headers: {'Content-Type': 'application/json',}})
                        .then((response)=>{
                        if(response){
                            console.log(newEntry)
                            setFeedBack('You can Now Login with Your Email and Password')
                            setNewEntry({name:'',email:'',cartItems:[],password:'',phone:'',order:[]})
                            setTimeout(()=>{setOpen(false);setFeedBack('')},2000)
                        }})
                    }
                    else{
                        setFeedBack('Email Id Registered with Us')
                    }
                }
            })
       
           
        }
    }
  return (
    <>
    <Dialog fullWidth style={{padding:'25px',maxWidth:'700px',minWidth:'100vw'}} open={open} onClose={()=>setOpen(false)}>
    <div style={{display:'flex',justifyContent:'space-evenly',flexDirection:'column',padding:'25px', width:'100%'}}>
        <InputGroup label={'Enter Your Name'} name={"name"} onChange={inputHandler} error={nameErr} value={newEntry.name}/>
        <InputGroup label={'Enter Your Email'} name={"email"} onChange={inputHandler} error={emailErr} value={newEntry.email} />
        <InputGroup label={'Enter Your Phone Number'} name={"phone"} onChange={inputHandler} error={phoneErr} value={newEntry.phone}/>
        <InputGroup type='password' label={'Enter Your password'} name={"password"} onChange={inputHandler} error={passwordErr} value={newEntry.password}/>
        <Button onClick={submitForm}  variant="outlined" color='error' sx={{width:'100%',marginTop:"15px"}}>Sign Up</Button>
        {feedback&&<Typography color={'error'}>{feedback}</Typography>}
        </div>

    </Dialog>
    </>
  )
}

export default SignupDialog