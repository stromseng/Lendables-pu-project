'use client';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SendIcon from '@mui/icons-material/Send';
import { Container, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import pb from '@lib/pocketbase';

const theme = createTheme();

const pbLogin = async () => {
  const authData = await pb
    .collection('users')
    .authWithPassword('magnus.stromseng@gmail.com', 'asdasdasdasd');
  console.log(pb.authStore.isValid);
  console.log(pb.authStore.token);
  console.log(pb.authStore.model.id);
};

const createAd = async (data) => {
  try {
    console.log('submitting record to pocketbase');
    //log data to console
    console.log(data);
    //create record in pocketbase
    const record = await pb.collection('advertisements').create({
      title: data.get('title'),
      description: data.get('description'),
      price: data.get('price'),
      seller: pb.authStore.model.id,
    });
  } catch (error) {
    return { error: error.message };
  }
};

export default function Page() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      Title: data.get('title'),
      Category: data.get('category'),
      Description: data.get('description'),
      Price: data.get('price'),
      Address: data.get('address'),
      Zipcode: data.get('zipcode'),
    });
    pbLogin();
    createAd(data);
  };

  const [Category, setCategory] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Create Ad
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  autoFocus
                  id="title"
                  name="title"
                  label="Title"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="item-category-label">Category</InputLabel>
                  <Select
                    labelId="item-category-label"
                    id="category"
                    value={Category}
                    label="Category"
                    onChange={handleChange}
                    required
                    name="category"
                  >
                    <MenuItem value="Electronics">Electronics</MenuItem>
                    <MenuItem value="Clothing">Clothing</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  required
                  id="description"
                  label="Description"
                  name="description"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  label="Price"
                  type="number"
                  placeholder="Kr"
                  required
                  id="price"
                  name="price"
                ></TextField>
              </Grid>
              <Grid item xs={12} alignItems="center" justifyContent="center">
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<FileUploadIcon />}
                >
                  Upload Picture
                  <input type="file" hidden />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="address"
                  name="address"
                  label="Street Address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="zipcode"
                  name="zipcode"
                  label="Zipcode"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  endIcon={<SendIcon />}
                >
                  Post ad
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
