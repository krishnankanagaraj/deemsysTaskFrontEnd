import React, { useState } from 'react'
import ItemCard from '../components/ItemCard'
import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css";
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { getProducts } from '../slices/dataSlice';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import SingleItem from './SingleItem';
function CategoryCarousel({Category}) {
  const products=useSelector(getProducts)
  const [open,setOpen]=useState(false);
  const [product,setProduct]=useState({});
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      slidesToSlide:5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4 
    },
    medium:{
      breakpoint:{max:1024,min:900},
      items:3,
      slidesToSlide:3
    },
    tablet: {
      breakpoint: { max: 900, min: 464 },
      items: 2,
      slidesToSlide:2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    }
  };
  const filteredProducts=products?.filter(product=>{
    const filter=Category.split(' ').join('').toLowerCase()
    return product.category===filter
  })
  return (
<>   
  <div style={{paddingLeft:"25px"}}>
    <Typography variant='h4' component={"h2"}>{Category}</Typography>
    {filteredProducts.length===0&&<Carousel responsive={responsive}>
    <Stack spacing={3} sx={{marginInline:'25px'}}>
      <Skeleton variant="rectangular" width={210} height={210} />
      <Skeleton variant="text" width={120} height={30} />
    </Stack>
    <Stack spacing={3} sx={{marginInline:'25px'}}>
      <Skeleton variant="rectangular" width={210} height={210} />
      <Skeleton variant="text" width={120} height={30} />
    </Stack>
    <Stack spacing={3} sx={{marginInline:'25px'}}>
      <Skeleton variant="rectangular" width={210} height={210} />
      <Skeleton variant="text" width={120} height={30} />
    </Stack>
    <Stack spacing={3} sx={{marginInline:'25px'}}>
      <Skeleton variant="rectangular" width={210} height={210} />
      <Skeleton variant="text" width={120} height={30} />
    </Stack>
    
    </Carousel>}
    
   <Carousel responsive={responsive} >
    {filteredProducts&&filteredProducts?.map((product,index)=>{
      return(
        <ItemCard onClick={()=>{setProduct(product);setOpen(true)}} key={index} product={product}/>
      )
    })}
   </Carousel>
   <SingleItem open={open} setOpen={setOpen} product={product}></SingleItem>
  </div>
</>
   
  )
}

export default CategoryCarousel