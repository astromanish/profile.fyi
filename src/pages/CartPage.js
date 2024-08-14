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
import DeleteIcon from '@mui/icons-material/Delete';

const CartPage = ({ cart, removeFromCart }) => {
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

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
        {cart.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={item.name}
                secondary={`₹${item.price.toLocaleString('en-IN')}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => removeFromCart(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            {index < cart.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          Total: ₹{totalPrice.toLocaleString('en-IN')}
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Checkout
        </Button>
      </Box>
    </Container>
  );
};

export default CartPage;