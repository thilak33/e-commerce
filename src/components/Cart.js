import React, { useEffect,useState } from 'react'
import { connect } from 'react-redux';
import { addToCart, removeFromCart,clearItem, searchKeyword } from '../actions';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';

const Cart = (props) => {

    useEffect(() => {
        props.searchKeyword('')

    })

    const [loading, setLoading] = useState(true);
    
    const renderList = () => {
        return props.cartproducts.length===0
        ? 
        <Box sx={{
            m:1
        }}>
            <Typography variant='h6'>
               Your Cart is Empty
            </Typography>
        </Box>
        :
        props.cartproducts.map(product => {
          return (
           <Card key={product.id} sx={{ boxShadow: 0, borderBottom: '1px solid #ccc', borderRadius:0, '&:lastchid':{borderBottom:0}}}>
            <Box sx={{ display: 'flex' }}>
                <Box sx={{width:140, height:180, m:1}}>
                    <div style={{display: loading ? "block" : "none"}}>
                                        {<Skeleton variant="rectangular" width={140} height={180} />}
                    </div>
                    <div style={{display: loading ? "none" : "block"}}>
                        <img 
                        className="w-full"
                        src={product?.image}
                        width="140px"
                        height="180px"
                        onLoad={() => setLoading(false)} />
                    </div>
                </Box>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {product.title}
                    </Typography>
                    <Typography variant="h4" color="text.secondary">
                        <CurrencyRupeeIcon/>{product.price}
                    </Typography>
                </CardContent>
            </Box>
            <CardActions>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& > *': {
                        m: 1,
                        },
                    }}
                    >
                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <Button onClick={()=> props.removeFromCart(product)}>{product.quantity === 1?<DeleteIcon/>:<RemoveIcon/>}</Button>
                        <Button>{product.quantity}</Button>
                        <Button onClick={()=> props.addToCart(product)}><AddIcon/></Button>
                    </ButtonGroup>
                </Box>
                <Box>
                    <Button variant="outlined" onClick={()=> props.clearItem(product)}>Delete</Button>
                </Box>
                </CardActions>
            </Card>
          );
        });
      }
        return  <>
                    <Box sx={{
                        m:1
                    }}>
                        <Typography variant='h6'>
                            {props.cartproducts.length===0?<></>:<div>Subtotal: {props.totalprice.toFixed(2)}</div>}
                        </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{
                        m:1
                    }}>
                         {renderList()}
                    </Box>
                </> ;
  }

const mapStateToProps = state => {
    return { cartproducts: state.cart.cartproducts, totalprice: state.cart.totalPrice };
  };

export default connect(mapStateToProps,{addToCart, removeFromCart,clearItem, searchKeyword })(Cart)

