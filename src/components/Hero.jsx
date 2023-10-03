import {Typography} from '@mui/material'
import React from 'react'
import EnquiryForm from './EnquiryForm'

function Hero({title,image}) {
  return (
    <>
    <div className='bg hero' style={{backgroundImage:`url(${image})`,display:'flex',justifyContent:'center'}} >
        <Typography sx={{marginInlineStart:'50px',color:'white',marginBottom:'8%',fontWeight:'400',marginInline:'auto',padding:'25px'}} variant="h4" component="h1">
            {title}
          </Typography>
          <EnquiryForm xs='none' width='30%'></EnquiryForm>
          
    </div>
       
    </>
  )
}

export default Hero