import { fetchData } from "./slices/dataSlice"
import axios from "axios"
import {store} from './store/store'
export const apiFetchProducts=()=>{
    let apiData=localStorage.getItem('products')
    if(apiData){
      fetchData(JSON.parse(apiData))
    }
    else{
        console.log('api fetch')
        axios.get(`https://deemsystask.onrender.com/products`).then(response=>{
             apiData = response.data;
            // console.log(apiData)
            localStorage.setItem('products',JSON.stringify(apiData))
            store.dispatch(fetchData(apiData))
          })
    }
    return apiData;
}