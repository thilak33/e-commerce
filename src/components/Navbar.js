import React, {useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {searchProduct, fetchProducts,loading,searchKeyword} from '../actions';





import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function Navbar(props) {

  let location = useLocation();
  let navigate = useNavigate();
  // const [keyword,setKeyword] = useState('')

  const handleSearch = (e) => {
      e.preventDefault()
      loading(true)
      navigate(`/searchresults/${props.searchkeyword}`)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {location.pathname !== '/'?
            < ArrowBackIcon sx={{mr:2}} 
              onClick={()=> {
                  navigate(-1)
            }} />
            :
            <></>
          }
          {!location.pathname.includes('/category') ?
            <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <form onSubmit={handleSearch}>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={props.searchkeyword}
                onChange={ (e)=> {
                    props.searchKeyword(e.target.value)
                }}
              />
            </form>
          </Search>
          :
          <></>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const mapStateToProps = state => {
  return {searchkeyword : state.products.searchkeyword}
}

export default connect(mapStateToProps,{searchProduct,fetchProducts,loading,searchKeyword})(Navbar)