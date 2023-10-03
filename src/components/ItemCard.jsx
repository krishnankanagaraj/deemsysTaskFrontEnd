import { Paper, Typography } from '@mui/material'
import React from 'react'

function ItemCard({product,onClick,noTitle}) {
  const item=product;
  return (
    <>
    <Paper onClick={onClick} sx={{width:'100%',height:'100%',border:'0',boxShadow:'0',paddingInline:'20px',cursor:'pointer'}}>      
            <img src={`/images/${item.category}/${item.images}`} alt="interior" style={{width:'100%',borderRadius:"10px"}}/>
            {!noTitle&&<Typography >{item.title}</Typography>}
    </Paper>    
    </>
  )
}

export default ItemCard