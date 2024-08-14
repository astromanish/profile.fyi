import React, { useState } from 'react';
import { 
  Grid, Card, CardMedia, CardContent, Typography, Button, Container, Box, Snackbar
} from '@mui/material';

const products = [
  { id: 1, name: "Smartphone", price: 44999, image: "images/smartphone.jpg" },
  { id: 2, name: "Laptop", price: 74999, image: "images/laptop.jpg" },
  { id: 3, name: "Headphones", price: 11249, image: "images/headphones.jpg" },
  { id: 4, name: "Smartwatch", price: 18749, image: "images/smartwatch.jpg" },
  { id: 5, name: "Tablet", price: 29999, image: "images/tablet.jpg" },
  { id: 6, name: "Camera", price: 52499, image: "images/camera.jpg" },
];

const ProductListingPage = ({addToCart}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [addedProduct, setAddedProduct] = useState('');

  const handleAddToCart = (product) => {
    addToCart(product);
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
                  <Typography variant="body2" color="text.secondary">
                    ₹{product.price.toLocaleString('en-IN')}
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