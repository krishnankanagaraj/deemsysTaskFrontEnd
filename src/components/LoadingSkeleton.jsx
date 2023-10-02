import React from 'react'
import { Container,Grid,Stack,Skeleton } from '@mui/material'

function LoadingSkeleton() {
  return (
    <>
    <Container sx={{marginTop:'50px'}}>
      <Grid container>
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
        
      </Grid>
    </Container>
    </>
  )
}

export default LoadingSkeleton