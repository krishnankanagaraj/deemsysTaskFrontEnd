import { Grid, Typography } from '@mui/material'
import React from 'react'
import {Container} from '@mui/material'

function WhatWeDo() {
  return (
    <Container maxWidth={'lg'} sx={{paddingTop:'25px',marginTop:'15px'}} >
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6} >
                <Typography sx={{color:'crimson',textDecoration:'underline'}} variant='h2'component={"h2"}>
                    What We Do?
                </Typography>
                <div style={{display:'flex',alignItems:'center',height:'70%'}}>
                <p style={{textAlign:'justify',marginTop:'15px'}} >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure fuga aspernatur perferendis. Similique perferendis eveniet esse mollitia ratione repellat magni, error, fugiat dolorum voluptates, explicabo placeat laborum dignissimos blanditiis numquam molestiae quod fugit accusantium ad eum? Facilis sapiente illum eaque Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque repellendus vitae ratione ipsa quam consequuntur consectetur ad blanditiis dignissimos, suscipit at inventore quidem expedita optio nesciunt recusandae. Delectus, quasi suscipit.
                </p>
                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                    <img src="/images/Hero2.webp" alt="Hero2" style={{width:'100%'}} />
            </Grid>
        </Grid>
    </Container>
  )
}

export default React.memo(WhatWeDo)