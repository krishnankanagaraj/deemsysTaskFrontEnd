import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProducts } from '../slices/dataSlice';
import Hero from '../components/Hero';
import Cards from '../components/Cards';
import { Container,Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Faq from '../components/Faq';
import WhyUs from '../components/WhyUs';
import LoadingSkeleton from '../components/LoadingSkeleton';
import SingleItem from '../components/SingleItem';
function CategoriesPage() {
    const {category}=useParams();
    const products=useSelector(getProducts)
    const[openItem,setOpenItem]=useState(false);
    const[selectedItem,setSelectedItem]=useState({})
    let title=''
    if(category==='modularkitchen'){
      title='Modular Kitchen'
    }
    else if(category==="livingroom"){
      title='Living Room'
    }
    else if(category==="bedroom"){
      title='Bedroom'
    }
    else if(category==='bathroom'){
      title="Bathroom"
    }
    else if(category==="homeoffice"){
      title="Home Office"
    }
    const filteredProducts=products.filter((product)=>{
      return product.category===category
    })
  return (
    <>
    <Hero title={title} image={`/images/${category}.webp`}></Hero>
    <Container maxWidth={'lg'} sx={{marginTop:'25px'}}>
      <Typography variant='h2' >{title} Designs</Typography>
    <Grid container spacing={3} rowSpacing={3} >
    {filteredProducts.length===0&&
    <LoadingSkeleton></LoadingSkeleton>}
    {filteredProducts&&filteredProducts.map((product,index)=>{
      return(
      <Cards onClick={()=>{setOpenItem(true);setSelectedItem(product)}} index={index} product={product}></Cards>
      )
    })}
    </Grid>
    </Container>
    <Faq></Faq>
    <WhyUs></WhyUs>
    <SingleItem open={openItem} setOpen={setOpenItem} product={selectedItem}></SingleItem>
    </>
  )
}

export default CategoriesPage