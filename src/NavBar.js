import React from 'react';
import { AppBar, Toolbar, Button, Box, Badge , IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const NavBar = ({ cartItemsCount }) => {
  return (
    <AppBar position="static" color="transparent" elevation={2}>
      <Toolbar>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Button
            sx={{ 
              color: '#000', 
              fontWeight: 'bold', 
              fontSize: '18px',
              textTransform: 'none'
            }}
            component={Link}
            to="/"
          >
            Products
          </Button>
          <Box>
            <IconButton color="inherit" component={Link} to="/cart">
              <Badge badgeContent={cartItemsCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;