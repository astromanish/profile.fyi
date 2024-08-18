import React from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Box,
  Button
} from '@mui/material';
import {Link} from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../redux/cartSlice';

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const calculateDiscount = (original, discounted) => {
    return Math.round(((original - discounted) / original) * 100);
  };

  const totalDiscountedPrice = cart.reduce((sum, item) => sum + item.discountedPrice * item.quantity, 0);
  const totalOriginalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
          Your Cart
        </Typography>
        <Typography variant="body1">No items added to the cart.</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        Your Cart
      </Typography>
      <List>
        {cart.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '4px' }}
                />
              </Box>
              <ListItemText
                primary={item.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                      sx={{ textDecoration: 'line-through', mr: 1 }}
                    >
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      color="primary"
                    >
                      ₹{(item.discountedPrice * item.quantity).toLocaleString('en-IN')}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      color="success.main"
                      sx={{ ml: 1 }}
                    >
                      ({calculateDiscount(item.price, item.discountedPrice)}% off)
                    </Typography>
                  </React.Fragment>
                }
              />
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                <IconButton onClick={() => handleDecrease(item.id)} size="small">
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                <IconButton onClick={() => handleIncrease(item.id)} size="small">
                  <AddIcon />
                </IconButton>
              </Box>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleRemove(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="body1" sx={{ textDecoration: 'line-through' }}>
            Original Total: ₹{totalOriginalPrice.toLocaleString('en-IN')}
          </Typography>
          <Typography variant="h6" color="primary">
            Discounted Total: ₹{totalDiscountedPrice.toLocaleString('en-IN')}
          </Typography>
          <Typography variant="body2" color="success.main">
            You save: ₹{(totalOriginalPrice - totalDiscountedPrice).toLocaleString('en-IN')} ({calculateDiscount(totalOriginalPrice, totalDiscountedPrice)}% off)
          </Typography>
        </Box>
        <Button variant="contained" color="primary" size="large" component={Link} to="/checkout">
          Checkout
        </Button>
      </Box>
    </Container>
  );
};

export default CartPage;