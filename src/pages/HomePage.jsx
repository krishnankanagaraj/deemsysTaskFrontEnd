import React from 'react'
import Hero from '../components/Hero'
import CategoryCarousel from '../components/CategoryCarousel'
import WhatWeDo from '../components/WhatWeDo'
import WhyUs from '../components/WhyUs'
import Faq from '../components/Faq'
import { Typography } from '@mui/material'
import EnquiryForm from '../components/EnquiryForm'

function HomePage() {
  return (
    <>
    <Hero title={'Interior Made easy'} image={"/images/Hero1.webp"}/>
    <WhatWeDo/>
    <CategoryCarousel Category={'Modular Kitchen'}/>
    <CategoryCarousel Category={'Living Room'}/>
    <CategoryCarousel Category={'Bedroom'}/>
    <CategoryCarousel Category={'Home Office'}/>
    <CategoryCarousel Category={'Bathroom'}/>
    <WhyUs></WhyUs>
    <div className='mobile_form'>
      <Typography variant='h3' sx={{color:'crimson'}} component={'h5'}>
        Contact Us
      </Typography>
      <EnquiryForm width='95%'></EnquiryForm>
    </div>
    <Faq></Faq>
    </>
  )
}

export default HomePage