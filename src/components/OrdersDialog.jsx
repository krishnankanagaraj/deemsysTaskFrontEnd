import { Dialog, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,Paper } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { currentUser,  orders } from '../slices/dataSlice'

function OrdersDialog({open,setOpen}) {
    const orderItems=useSelector(orders)
    const user =useSelector(currentUser)
    const total=orderItems&&orderItems.reduce((acc,item)=>{
        return acc+=(Number(item.price.split('/')[0]))*(Number(item.Size.split('*')[0])*Number(item.Size.split('*')[1]))
    },0)
  return (
    <>
    <Dialog maxWidth={'sm'} fullWidth open={open} onClose={()=>setOpen(false)}>
    <Typography variant='h4' textAlign={'center'} fontWeight={'700'} component={'h4'} sx={{marginBlock:'15px'}}><span style={{color:'crimson',textTransform:'capitalize'}}> {user.name} </span>Your orders</Typography>
    {orderItems.length===0&&<Typography textAlign={'center'} component={'h5'} variant="h5" sx={{paddingBlock:'10%',marginBlock:'auto'}}>No Orders Yet</Typography>}
    {orderItems.length>0&&<TableContainer sx={{paddingInline:'15px',boxShadow:'0'}} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >Title</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Order Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderItems.map((item,index) => {
            const orderValue=(Number(item.price.split('/')[0]))*(Number(item.Size.split('*')[0])*Number(item.Size.split('*')[1]))
           return(
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.title}
              </TableCell>
              <TableCell align="right">{item.Size}</TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell align='right'>{orderValue}</TableCell>
            </TableRow>
           )
          }
          )}
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align='right'>Total</TableCell>
            <TableCell align="right">{total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>}
    </Dialog>
    </>

  )
}

export default OrdersDialog