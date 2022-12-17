import * as React from 'react';
import { connect } from 'react-redux';


import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';


import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';



function BottomNavBar(props) {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);

  React.useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [value]);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction component={Link} to='/' icon={<HomeIcon />} />
          <BottomNavigationAction component={Link} to='/cart'
            icon={
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={props.cartproducts.length} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            }
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}


const mapStateToProps = state => {
  return { cartproducts: state.cart.cartproducts };
};

export default connect(mapStateToProps)(BottomNavBar)
