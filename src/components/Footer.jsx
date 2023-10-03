import { Container, Grid ,IconButton,Typography,} from '@mui/material'
import React from 'react'
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import { useNavigate} from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Twitter } from '@mui/icons-material';
import InstagramIcon from '@mui/icons-material/Instagram';
function Footer() {
  const navigate=useNavigate()
  const footerNavigation=(e)=>{
    const link=e.target.innerText.split(' ').join('').toLowerCase();
    navigate(`/${link}`)
    window.scrollTo(0,0)
  }
  return (
    <div style={{marginTop:'100px',background:'#333'}}>
    <Container maxWidth={'lg'} sx={{marginBlock:'25px'}}>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={4} md={4} lg={4} sx={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
        <Typography variant="h6" sx={{ my: 2,color:'crimson'}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'5px'}}>
            <DeveloperBoardIcon sx={{color:'crimson',fontSize:100}}/>
            Home Interiors
            </div>
        </Typography>
        <div>
        <IconButton>
          <InstagramIcon className='footer_link' sx={{fontSize:30}}></InstagramIcon>
        </IconButton>
        <IconButton>
          <Twitter className='footer_link' sx={{fontSize:30}}></Twitter>
        </IconButton>
        <IconButton>
          <FacebookIcon className='footer_link' sx={{fontSize:30}}></FacebookIcon>
        </IconButton>
        </div>
        </Grid>
        <Grid item xs={6} sm={4} md={4} lg={4}>
          <Typography variant='h4' sx={{mt:2,color:'crimson'}}>
            Links
          </Typography>
          <div style={{display:'flex',flexDirection:'column'}}>
          <Typography variant='h5' className='footer_link' onClick={()=>{navigate('/');window.scrollTo(0,0)}} component={'a'}>
            Home
          </Typography>
          <Typography variant='h5' className='footer_link' onClick={footerNavigation} component={'a'}>
            Modular Kitchen
          </Typography>
          <Typography variant='h5' className='footer_link'  onClick={footerNavigation} component={'a'}>
            Living Room
          </Typography>
          <Typography variant='h5' className='footer_link'   onClick={footerNavigation} component={'a'}>
            Bedroom
          </Typography>
          <Typography variant='h5' className='footer_link'  onClick={footerNavigation} component={'a'}>
            Bathroom
          </Typography>
          <Typography variant='h5'className='footer_link'  onClick={footerNavigation} component={'a'}>
            Home Office
          </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} sx={{width:'100%'}} >
          <img src="/images/Bedroom/Color-me-fun Unisex Kids’ Room.webp" alt="" style={{width:'100%',marginLeft:'auto',borderRadius:'15px'}}/>
        </Grid>
      </Grid>
    </Container>
    <Container maxWidth={'lg'}>
    <Typography textAlign={'center'} sx={{color:'white'}}>
      <span style={{color:'crimson'}}>Home Interiors</span> &copy; {new Date().getFullYear()}
    </Typography>
    </Container>
    </div>
  )
}

export default React.memo(Footer)