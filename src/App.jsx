import './App.css';
import { Routes,Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import Footer from './components/Footer';
import DrawerAppBar from './components/NavBar';
import { useEffect, useState, } from 'react';
import DesignGallery from './pages/DesignGallery';
import { apiFetchProducts } from './api';


function App() {
  const [fetchProducts,setFetchProducts]=useState(true)
  useEffect(()=>{
    if(fetchProducts){
        console.log('app.jsx')
        if(apiFetchProducts()){
            console.log(apiFetchProducts())
        }        
        setFetchProducts(false)
    }
    
    // const data=localStorage.getItem('products')
    // if(data){
    //   dispatch(fetchData(JSON.parse(data)))
    //   setFetchProducts(false);
    // }
    // else{
    //   if(fetchProducts){
    //     axios.get(`https://deemsystask.onrender.com/products`).then(response=>{
    //       const data = response.data;
    //       console.log(data)
    //       localStorage.setItem('products',JSON.stringify(data))
    //       dispatch(fetchData(data))
    //     })
    //     setFetchProducts(false)
    //   }
    // }
  },[fetchProducts])

  // useEffect(()=>{
  //   const data=JSON.parse(localStorage.getItem('users'))
  //   if(data){
  //     dispatch(fetchUsers(data))
  //     setFetchUser(false)
  //   }
  //   else{
  //       setFetchUser(false)
  //   }

  // },[dispatch,fetchUser])
  
  return (
    <>
    <DrawerAppBar/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/:category' element={<CategoriesPage/>}/>
      <Route path='/designgallery' element={<DesignGallery/>}/>
    </Routes>
    <Footer></Footer>
    </>
  );
}

export default App;
