import React from 'react'

function ImageCard({category,image}) {
    let title=''
    if(category==='modularkitchen'){
        title='ModularKitchen'
      }
      else if(category==="livingroom"){
        title='LivingRoom'
      }
      else if(category==="bedroom"){
        title='Bedroom'
      }
      else if(category==='bathroom'){
        title="Bathroom"
      }
      else if(category==="homeoffice"){
        title="HomeOffice"
      }
  return (
    <>
    <img src={`/images/${title}/${image}`} alt="" style={{width:'100%',borderRadius:'10px'}} />
    </>
  )
}

export default ImageCard