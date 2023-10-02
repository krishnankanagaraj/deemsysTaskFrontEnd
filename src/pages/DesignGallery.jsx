import React from 'react'
import {Grid,Container,Skeleton,Stack, Typography, IconButton} from '@mui/material'
import { getProducts } from '../slices/dataSlice'
import { useSelector } from 'react-redux'
import ImageCard from '../components/ImageCard'
import PhotoIcon from '@mui/icons-material/Photo';
function DesignGallery() {
    const products=useSelector(getProducts)
  return (
    <>
     <Container maxWidth={'lg'} sx={{marginTop:'100px'}} >
        <Typography variant='h2' sx={{color:'crimson',display:'flex',alignItems:'center'}}>
            <IconButton>
                <PhotoIcon sx={{fontSize:60,color:'crimson'}}></PhotoIcon>
            </IconButton>
            Gallery
        </Typography>
            <Grid container columnSpacing={2} rowSpacing={2}>
                {products.length===0&&
                <Grid container style={{marginTop:'25px'}}>
                <Grid item sm={12} md={6} lg={4}>
                <Stack spacing={3} sx={{marginInline:'25px'}}>
                <Skeleton variant="rectangular" width={300} height={300} />
                <Skeleton variant="text" width={120} height={30} />
                </Stack>
                </Grid>
                <Grid item sm={12} md={6} lg={4}>
                <Stack spacing={3} sx={{marginInline:'25px'}}>
                <Skeleton variant="rectangular" width={300} height={300} />
                <Skeleton variant="text" width={120} height={30} />
                </Stack>
                </Grid>
                <Grid item sm={12} md={6} lg={4}>
                <Stack spacing={3} sx={{marginInline:'25px'}}>
                <Skeleton variant="rectangular" width={300} height={300} />
                <Skeleton variant="text" width={120} height={30} />
                </Stack>
                </Grid>
                <Grid item sm={12} md={6} lg={4}>
                <Stack spacing={3} sx={{marginInline:'25px'}}>
                <Skeleton variant="rectangular" width={300} height={300} />
                <Skeleton variant="text" width={120} height={30} />
                </Stack>
                </Grid>
                <Grid item sm={12} md={6} lg={4}>
                <Stack spacing={3} sx={{marginInline:'25px'}}>
                <Skeleton variant="rectangular" width={300} height={300} />
                <Skeleton variant="text" width={120} height={30} />
                </Stack>
                </Grid>
                <Grid item sm={12} md={6} lg={4}>
                <Stack spacing={3} sx={{marginInline:'25px'}}>
                <Skeleton variant="rectangular" width={300} height={300} />
                <Skeleton variant="text" width={120} height={30} />
                </Stack>
                </Grid>
                <Grid item sm={12} md={6} lg={4}>
                <Stack spacing={3} sx={{marginInline:'25px'}}>
                <Skeleton variant="rectangular" width={300} height={300} />
                <Skeleton variant="text" width={120} height={30} />
                </Stack>
                </Grid>
                <Grid item sm={12} md={6} lg={4}>
                <Stack spacing={3} sx={{marginInline:'25px'}}>
                <Skeleton variant="rectangular" width={300} height={300} />
                <Skeleton variant="text" width={120} height={30} />
                </Stack>
                </Grid>
                <Grid item sm={12} md={6} lg={4}>
                <Stack spacing={3} sx={{marginInline:'25px'}}>
                <Skeleton variant="rectangular" width={300} height={300} />
                <Skeleton variant="text" width={120} height={30} />
                </Stack>
                </Grid>
              </Grid>}
                {products&&products.map((product,index)=>{
                    return(
                        <>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                        <ImageCard key={index} image={product.images} category={product.category}></ImageCard>
                        </Grid>
                        </>
                    )
                })}
            </Grid>
        </Container>
    </>
  )
}

export default DesignGallery