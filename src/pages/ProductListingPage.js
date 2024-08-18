import React, { useState } from 'react';
import {
  Grid, Card, CardMedia, CardContent, Typography, Button, Container, Box, Snackbar
} from '@mui/material';

import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const products = [
  { id: 1, name: "Smartphone", price: 44999, discountedPrice: 39999, image: "images/smartphone.webp" },
  { id: 2, name: "Laptop", price: 74999, discountedPrice: 69999, image: "images/laptop.webp" },
  { id: 3, name: "Headphones", price: 11249, discountedPrice: 9999, image: "images/headphone.jpeg" },
  { id: 4, name: "Smartwatch", price: 18749, discountedPrice: 16999, image: "images/smartwatch.webp" },
  { id: 5, name: "Tablet", price: 29999, discountedPrice: 27999, image: "images/tablet.jpeg" },
  { id: 6, name: "Camera", price: 52499, discountedPrice: 49999, image: "images/camera.jpg" },
];

const ProductListingPage = () => {

  const dispatch = useDispatch();  

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [addedProduct, setAddedProduct] = useState('');

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setAddedProduct(product.name);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <Box sx={{ flexGrow: 1, margin: 2 }}>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                    ₹{product.price.toLocaleString('en-IN')}
                  </Typography>
                  <Typography variant="body1" color="primary">
                    ₹{product.discountedPrice.toLocaleString('en-IN')}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddToCart(product)}
                    sx={{ mt: 2 }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message={`Added ${addedProduct} to cart`}
      />
    </Container>
  );
};

export default ProductListingPage;