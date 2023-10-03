import React, { useState } from 'react'
import { Paper,Button,Typography } from '@mui/material'
import InputGroup from './InputGroup'
import { apiEnquiry } from '../api'

function EnquiryForm({xs,width}) {
    const [newEnquiry,setNewEnquiry]=useState({name:"",email:'',phone:''})
    const [nameErr,setNameErr]=useState('');
    const [emailErr,setEmailErr]=useState('');
    const [phoneErr,setPhoneErr]=useState('');
    const [feedback,setFeedback]=useState('');
    const inputHandler=(e)=>{
        setNewEnquiry({...newEnquiry,[e.target.name]:e.target.value})
        setFeedback('')
        setNameErr('')
    }
    const nameValidation=()=>{
        const inputTrimmed=newEnquiry.name.trim()
        if(inputTrimmed.length<=3){
            setNameErr("Please Enter Your Name")
            return false
        }
        else{
            setNameErr('')
            return true
        }
        

    }
    const emailValidation=()=>{
        const inputTrimmed=newEnquiry.email.trim()
        if(inputTrimmed.length===0||!inputTrimmed.includes('@')){
            setEmailErr('Please Enter a Valid Email-id')
            return false
        }
        else{
            setEmailErr('')
            return true
        }
    }
    const phoneValidation=()=>{
        const inputTrimmed=newEnquiry.phone.trim()
        if(inputTrimmed.length!==10){
            setPhoneErr('Phone Number Must be 10 Numbers')
            return false
        }
        else{
            setPhoneErr('')
            return true
        }
    }
    const submitEnquiry=async ()=>{
        nameValidation();
        emailValidation();
        phoneValidation();
    if(nameValidation()&&emailValidation()&&phoneValidation()){  
        setEmailErr('');
        setNameErr('');
        setPhoneErr('');
        try{
            const response = await apiEnquiry(newEnquiry);
          if(response){
                 setNewEnquiry({name:'',email:'',phone:''})
                 setFeedback("Enquiry Submitted. Get back To You soon!!!")
                 setTimeout(()=>{
                    setFeedback("")
                 },2000)
          }
        }
        catch(err){
            console.log(err)
        }
    }
    else{
        setFeedback('')
    }
    }
  return (
    <>
        <Paper sx={{display:{xs:xs,md:'flex'},marginInline:{md:'auto'},boxShadow:'0'}} style={{flexDirection:'column',justifyContent:"space-evenly",background:'white',gap:"10px",padding:'25px',borderRadius:'10px',width:width,maxWidth:'500px',height:"375px",marginBlock:'auto'}}>
        <Typography variant='h5' component={'h3'} style={{textAlign:'center',color:'crimson'}}>Enquiry Form</Typography>
        <div style={{display:'flex',justifyContent:'space-evenly',flexDirection:'column'}}>
        <InputGroup label={'Enter Your Name'} error={nameErr} onChange={inputHandler} name={"name"} value={newEnquiry.name}/>
        <InputGroup label={'Enter Your Email Id'} error={emailErr} onChange={inputHandler} name={"email"} value={newEnquiry.email}/>
        <InputGroup label={'Enter Your Phone Number'} error={phoneErr} onChange={inputHandler} name={"phone"} value={newEnquiry.phone}/>
        </div>
        <Button onClick={submitEnquiry} variant="outlined" color='error' sx={{width:'100%',marginTop:"15px"}}>Send</Button>
        {feedback&&<Typography sx={{ color:'#ff7f7f',textAlign:'center'}}>Enquiry Submitted. Get Back to You soon!!!</Typography>}
        </Paper>
    </>
  )
}

export default EnquiryForm