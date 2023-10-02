import { Typography} from '@mui/material'
import React from 'react'
import EnquiryForm from './EnquiryForm'

function Hero({title,image}) {
  return (
    <>
    <div className='bg hero' style={{backgroundImage:`url(${image})`}} >
        <Typography sx={{marginInlineStart:'25px',color:'crimson',marginBottom:'8%',fontWeight:'400'}} variant='h2' component="h1">
            # {title}
        </Typography>
        <EnquiryForm xs='none' width='30%'></EnquiryForm>

    </div>
       
    </>
  )
}

export default Hero