import { AccessTime } from '@mui/icons-material'
import { Container,Box, Typography, IconButton } from '@mui/material'
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AddTaskIcon from '@mui/icons-material/AddTask';
import React from 'react'

function WhyUs() {
  return (
      <div style={{marginBlock:'35px'}}>
      <Typography variant='h2' component={'h2'} color={'crimson'} textAlign={'center'}>Why Us?</Typography>
    <Container maxWidth={'lg'} sx={{display:'flex',justifyContent:'space-evenly'}}>
        <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',borderRight:'2px solid grey',paddingRight:'8%'}}>
            <IconButton >
                <AccessTime sx={{fontSize:50,color:'crimson'}}></AccessTime>
            </IconButton>
            <Typography textAlign={'center'}>
                Delivery within 30 days
            </Typography>
        </Box>
        <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',borderRight:'2px solid grey',paddingRight:'8%'}}>
            <IconButton >
               <SupportAgentIcon sx={{fontSize:50,color:'crimson'}}></SupportAgentIcon>
            </IconButton>
            <Typography textAlign={'center'}>
                Best Customer Support Post Deliver
            </Typography>
        </Box>
        <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
            <IconButton >
                <AddTaskIcon sx={{fontSize:50,color:'crimson'}}></AddTaskIcon>
            </IconButton>
            <Typography textAlign={'center'}>
                Warranty For 5+ Years
            </Typography>
        </Box>
    </Container>
    </div>
  )
}

export default React.memo(WhyUs)