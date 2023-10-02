import React from 'react'
import { Grid,Card,CardActionArea,CardMedia,CardContent,Typography} from '@mui/material'

function Cards({index,product,onClick}) {
  return (
    <Grid key={index} item sm={12} md={6} lg={4} sx={{marginTop:'35px'}}>
      <Card onClick={onClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="350"
          image={`/images/${product.category}/${product.images}`}
          alt="product image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title.split('').splice(0,20).join('')+"..."}
          </Typography>
          <Typography>
            Size: {product.Size}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
      </Grid>
  )
}

export default Cards