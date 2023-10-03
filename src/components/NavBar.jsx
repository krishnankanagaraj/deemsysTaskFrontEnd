import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from '@mui/icons-material';
import LoginDialog from './LoginDialog';
import { useDispatch, useSelector } from 'react-redux';
import { cart, currentUser, isLogIn, setCart, setIsloggedIn, setLoggedInUser} from '../slices/dataSlice';
import { Badge, FormControl, MenuItem, Select } from '@mui/material';
import CartDrawer from './CartDrawer';
import OrdersDialog from './OrdersDialog';

const navItems = [ 'Modular Kitchen', 'Living Room','Home Office','Bedroom','Design Gallery'];

function DrawerAppBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dialogOpen,setDialogOpen]=useState(false);
  const[ordersDialog,setOrdersDialog]=useState(false);
  const isLoggedIn=useSelector(isLogIn);
  const LoggedInUser=useSelector(currentUser)
  const cartItems=useSelector(cart);
  const [cartOpen,setCartOpen]=useState(false)
  
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{background:'crimson'}} >
        <Toolbar>
        <Typography variant="h6" sx={{ my: 2, display:{md:"none"},cursor:'pointer'}} onClick={()=>{navigate('/');window.scrollTo(0,0)}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'5px',marginLeft:'25px'}}>
            <DeveloperBoardIcon/>
            Home Interiors
            </div>
      </Typography>
      <IconButton onClick={()=>{
              if(isLoggedIn){
                setCartOpen(true)  
              }
              else{
                setDialogOpen(true)
              }}} sx={{ my: 2, display:{md:"none"},color:'white',marginLeft:'auto'}}>
        <Badge showZero color='success' badgeContent={cartItems.length}>
        <ShoppingCart sx={{fontSize:'2rem'}}></ShoppingCart>
        </Badge>
      </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' },marginLeft:'5px'}}
          >
            <MenuIcon sx={{fontSize:'2rem'}} />
            
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' },cursor:'pointer' }} onClick={()=>{navigate('/');window.scrollTo(0,0)}}
          >
            <div style={{display:'flex',alignItems:'center',justifyContent:'start',marginInlineStart:'15px'}}>
            <DeveloperBoardIcon/>
            Home Interiors
            </div>
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' },paddingTop:'4.5px',justifyContent:'space-evenly',width:'75%', }} onClick={(e)=>{
            const value=e.target.value;
            if(value!=="login"&&value!==''&&value!==0&&value !==undefined){
              navigate(`/${value}`);
              window.scrollTo(0,0)
            }
            }}>
            {navItems.map((item,index) => (
              <Button value={item.split(' ').join('').toLowerCase()} key={index} sx={{ color: '#fff',textTransform:'capitalize'}}>
                {item}
              </Button>
            ))}
            <IconButton onClick={()=>{
              if(isLoggedIn){
                setCartOpen(true)  
              }
              else{
                setDialogOpen(true)
              }
              }} sx={{color:'white'}}>
            <Badge showZero color='success' badgeContent={cartItems.length}>    
            <ShoppingCart  sx={{fontSize:'2rem'}}/>
            </Badge>
            </IconButton>
          {!isLoggedIn&& <Button sx={{marginLeft:'0'}} onClick={()=>{setDialogOpen(true);}} variant='contained' color='success'>Login</Button>}
          {isLoggedIn&&
          <FormControl variant='standard' sx={{ml:'0',maxWidth:'70px',paddingTop:'10px'}}>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={LoggedInUser.name}
          label={LoggedInUser.name}
          sx={{color:'white'}}
          >
          <MenuItem value={LoggedInUser.name}>{LoggedInUser.name.toUpperCase()}</MenuItem>
          <MenuItem onClick={()=>{console.log('call'); setOrdersDialog(true)}}>Orders</MenuItem>
          <MenuItem ><Button variant='contained' color='error' onClick={()=>{
            dispatch(setIsloggedIn(false));
            dispatch(setLoggedInUser({}));
            dispatch(setCart([]));
          }}>LogOut</Button></MenuItem>
           </Select>
           </FormControl>
          }
          </Box>
          
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 320,bgcolor:'crimson',color:'white' },
          }}
        >
      <Box onClick={handleDrawerToggle} sx={{marginTop:'25px'}}>
      {isLoggedIn&&
      <div>
        <FormControl variant='standard' sx={{display:{md:'none'},marginLeft:'15px'}}>
        <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={LoggedInUser.name}
        label={LoggedInUser.name}
        sx={{color:'white'}}
        >
        <MenuItem value={LoggedInUser.name}>{LoggedInUser.name.toUpperCase()}</MenuItem>
        <MenuItem onClick={()=>{setOrdersDialog(true)}} >Orders</MenuItem>
         </Select>
         </FormControl>
        <Divider />
      </div>
      }
      <List onClick={(e)=>{
            const value=e.target.innerText.split(' ').join('').toLowerCase();
            value!=="login"&&value.length<20&&navigate(`/${value}`);
            window.scrollTo(0,0)
            }}>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'start' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {!isLoggedIn&&<Button sx={{width:'95%',textAlign:'center',marginLeft:'2.5%'}} onClick={()=>{handleDrawerToggle();
      setDialogOpen(true)}} variant='contained' color='success'>Login</Button>}
      {isLoggedIn&&<Button sx={{width:'95%',textAlign:'center',marginLeft:'2.5%'}} variant='contained' color='success' onClick={()=>{
            dispatch(setIsloggedIn(false));
            dispatch(setLoggedInUser({}));
            dispatch(setCart([]));
          }}>LogOut</Button>}
    </Box>
    </Drawer>
      </nav>
    <LoginDialog open={dialogOpen} setOpen={setDialogOpen}></LoginDialog>
    <CartDrawer open={cartOpen} setOpen={setCartOpen}></CartDrawer>
    <OrdersDialog open={ordersDialog} setOpen={setOrdersDialog}></OrdersDialog>
    </Box>
  );
}

export default DrawerAppBar;