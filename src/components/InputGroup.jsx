import { Box } from '@mui/material'
import React from 'react'

function InputGroup({label,error,onChange,value,name,type}) {
  return (
    <>
    <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
    <label >{label}</label>
    <input type={type} style={{padding:'10px',width:'100%',fontSize:'1.25rem',}} name={name}  value={value} onChange={onChange} />
    {error&&<p style={{color:'#ff7f7f'}}>{error}</p>}
    </Box>
    </>
  )
}

export default InputGroup