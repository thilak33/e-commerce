import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProduct, searchProduct, loading ,searchKeyword} from '../actions';



import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Rating from '@mui/material/Rating';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LinearProgress from '@mui/material/LinearProgress';



const SearchResults = (props) => {
  let params = useParams()
  let navigate = useNavigate()

  useEffect(()=>{
    props.loading(true)
    props.searchKeyword(params.slug)
    props.searchProduct(params.slug)
  },[params.slug])


  const renderList = () => {
    if (props.products.length >= 1) {
      return props.products.map(product => {
        return (
          <Card 
            onClick={()=> {
              props.loading(true)
              navigate(`/product/${product.id}`)
            }}
            sx={{
              textDecoration: 'none',
              m: 1,
              display: 'flex',
              boxShadow: 0,
              borderBottom: '1px solid #ccc',
              borderRadius: 0,
              '&:lastchid': { borderBottom: 0 }
            }}
            key={product.id}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '140px' }}>
              <CardMedia sx={{ minWidth: 140 }}
                component="img"
                width="130"
                height="140"
                image={product.image ? product.image : <Skeleton
                  sx={{ bgcolor: 'grey.900' }}
                  variant="rectangular"
                  width={210}
                  height={118}
                />}
              />
            </Box>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {product.title}
              </Typography>
              <Box sx={{ display: 'flex' }}>
                <Rating name="read-only" value={product.rating.rate} readOnly />
                <Typography gutterBottom variant="h6" component="div">
                  ({product.rating.rate})
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {product.rating.count}
                </Typography>
              </Box>
              <Typography gutterBottom variant="h4" component="div">
                <CurrencyRupeeIcon />{product.price}
              </Typography>
            </CardContent>
          </Card>
        );
      });
    } else {
      return <Box sx={{  m:1 }}>
                <Typography variant='h6'>
                  No Results
                </Typography>
            </Box>
    }
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
        renderList()
      }
    </div>
  )
}

const mapStateToProps = state => {
    console.log(state)
  return { 
      products:state.products.searchedproducts, 
      loader: state.products.loading
   };
};

export default connect( mapStateToProps,
  {
    fetchProduct, 
    searchProduct,
    loading,
    searchKeyword
  }
   )(SearchResults)