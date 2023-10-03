import { Grid, Typography } from '@mui/material'
import React from 'react'
import {Container} from '@mui/material'

function WhatWeDo() {
  return (
    <Container maxWidth={'lg'} sx={{paddingTop:'25px',marginTop:'15px'}} >
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6} >
                <Typography sx={{color:'crimson',textAlign:'center'}} variant='h4'component={"h2"}>
                    What We Do?
                </Typography>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Typography component={'p'} sx={{textAlign:'justify',maxWidth:'500px',marginTop:'15px'}} >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure fuga aspernatur perferendis. Similique perferendis eveniet esse mollitia ratione repellat magni, error, fugiat dolorum voluptates, explicabo placeat laborum dignissimos blanditiis numquam molestiae quod fugit accusantium ad eum? Facilis sapiente illum eaque Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque repellendus vitae ratione ipsa quam consequuntur consectetur ad blanditiis dignissimos, suscipit at inventore quidem expedita optio nesciunt recusandae. Delectus, quasi suscipit.
                </Typography>
                </div>
            </Grid>
            <Grid sx={{display:'flex',justifyContent:'center'}} item xs={12} sm={12} md={6} lg={6}>
                    <img src="/images/Hero2.webp" alt="Hero2" style={{width:'100%',maxWidth:'450px'}} />
            </Grid>
        </Grid>
    </Container>
  )
}

export default React.memo(WhatWeDo)