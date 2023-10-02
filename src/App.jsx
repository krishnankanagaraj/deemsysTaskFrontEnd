import './App.css';
import { Routes,Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import Footer from './components/Footer';
import DrawerAppBar from './components/NavBar';
import { useEffect, useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api, fetchData,fetchUsers } from './slices/dataSlice';
import axios from 'axios';
import DesignGallery from './pages/DesignGallery';


function App() {
  const [fetchProducts,setFetchProducts]=useState(true)
  const [fetchUser,setFetchUser]=useState(true)
  const API=useSelector(api)
  const dispatch=useDispatch();
  useEffect(()=>{
    const data=localStorage.getItem('products')
    if(data){
      dispatch(fetchData(JSON.parse(data)))
      setFetchProducts(false);
    }
    else{
      if(fetchProducts){
        axios.get(`${API}/products`).then(response=>{
          const data = response.data;
          console.log(data)
          localStorage.setItem('products',JSON.stringify(data))
          dispatch(fetchData(data))
        })
        setFetchProducts(false)
      }
    }
  },[dispatch,fetchProducts,API])

  useEffect(()=>{
    const data=JSON.parse(localStorage.getItem('users'))
    if(data){
      dispatch(fetchUsers(data))
      setFetchUser(false)
    }
    else{
        setFetchUser(false)
    }

  },[dispatch,fetchUser])
  
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
