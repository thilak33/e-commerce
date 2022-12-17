import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import {  addToCart, fetchProduct } from '../actions';
import { useParams } from 'react-router-dom';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Rating from '@mui/material/Rating';
import LinearProgress from '@mui/material/LinearProgress';


const Product = (props) => {

    let params = useParams()

    useEffect(()=>{
        props.fetchProduct(params.slug)
    },[])

 const renderList = () =>{
    return props.product?.map(product => {
        return  <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} key={product.id}>
                    <Box sx={{ my: 1, mx: 1 }}>
                        <Typography  variant="body2" component="div">
                           {product.title}
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            justifyContent:'center',
                            m:2,
                        }}>
                            <img width="250" height="250" src={product.image}/>
                        </Box>
                            <Typography gutterBottom variant="h4" component="div">
                                <CurrencyRupeeIcon/>{product.price}
                            </Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent:'center'  } }>
                        <Button onClick={() => props.addToCart(product)} sx={{ mb:3, pl: 15 , pr:15 }} variant="contained">Add to cart</Button>
                    </Box>
                    <Divider />
                    <Box sx={{ my: 1, mx: 1 }}>
                        <Typography color="text.secondary" variant="h6">
                            Product Details
                        </Typography>
                        <Typography color="text.secondary" variant="body2">
                            {product.description}
                        </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ my: 1, mx: 1 }}>
                        <Typography color="text.secondary" variant="h6">
                            Customer ratings
                        </Typography>
                        <Box sx={{display:'flex'}}>
                            <Rating name="read-only" value={product.rating.rate} readOnly/>
                            <Typography gutterBottom variant="h6" component="div">
                                ({product.rating.rate}) out of 5
                            </Typography>
                        </Box>
                        <Typography gutterBottom variant="h6" component="div">
                                {product.rating.count} ratings
                        </Typography>
                    </Box>
                </Box>
    } )
 } 

  return (
    <div className="ui relaxed divided list">
        { 
            props.loader
            ?
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
            :
            <Box sx={{
                m:1
            }}>
                {renderList()}
            </Box>
        }
    </div>
  )
}
const mapStateToProps = state => {
    console.log(state)
    return {product: state.products.selectedproduct, loader:state.products.loading}
} 
export default connect(mapStateToProps,{addToCart,fetchProduct})(Product)