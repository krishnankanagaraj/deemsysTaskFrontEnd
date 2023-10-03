import './App.css';
import { Routes,Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import Footer from './components/Footer';
import DrawerAppBar from './components/NavBar';
import { useEffect, useState, } from 'react';
import DesignGallery from './pages/DesignGallery';
import { apiFetchProducts } from './api';
import { fetchData } from './slices/dataSlice';
import { useDispatch } from 'react-redux';


function App() {
  const [fetchProducts,setFetchProducts]=useState(true)
  const dispatch=useDispatch();
  useEffect(()=>{
    if(fetchProducts){
        const data=localStorage.getItem('products')
        if(data){
          dispatch(fetchData(JSON.parse(data)))
          setFetchProducts(false);
        }
        else{
        apiFetchProducts()      
        setFetchProducts(false)
        }
    }
  },[fetchProducts,dispatch])

  
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
