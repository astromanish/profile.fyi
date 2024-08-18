import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Button, LinearProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice'; 
import { Link } from 'react-router-dom';

const CheckoutConfirmationPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(clearCart());

    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Processing your request...
          </Typography>
          <LinearProgress sx={{ my: 2 }} />
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <CheckCircleIcon color="success" sx={{ fontSize: 80 }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Payment Received
        </Typography>
        <Typography variant="h6" gutterBottom>
          Thank you for your purchase!
        </Typography>
        <Typography variant="body1" paragraph>
          Your order is on its way to your delivery location. You will receive a confirmation email shortly with the details of your order.
        </Typography>
        <Box sx={{ my: 2 }}>
          <LocalShippingIcon color="primary" sx={{ fontSize: 50 }} />
          <Typography variant="body1" gutterBottom>
            Your order is being processed and will be shipped soon.
          </Typography>
        </Box>
        <Box sx={{ my: 2 }}>
          <PaymentIcon color="primary" sx={{ fontSize: 50 }} />
          <Typography variant="body1" gutterBottom>
            Payment has been successfully completed.
          </Typography>
        </Box>
        <Button variant="contained" color="primary" component={Link} to="/">
          Back to Home
        </Button>
      </Paper>
    </Container>
  );
};

export default CheckoutConfirmationPage;
