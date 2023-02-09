'use client';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
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

//Import pocketbase
import pb from '@lib/pocketbase';

//Import Roboto font
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

//Check user preference for dark mode
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
// True if preference is set to dark, false otherwise.

//Create theme based on user preference
var theme;
if (prefersDark) {
  theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
} else {
  theme = createTheme({
    palette: {
      mode: 'light',
    },
  });
}

//Login to pocketbase
const pbLogin = async () => {
  const authData = await pb
    .collection('users')
    .authWithPassword('magnus.stromseng@gmail.com', 'asdasdasdasd');
  console.log(pb.authStore.isValid);
  console.log(pb.authStore.token);
  console.log(pb.authStore.model.id);
};

//Create record in pocketbase
const pbCreateAd = async (data) => {
  //create record in pocketbase
  const result = await pb.collection('advertisements').create({
    title: data.get('title'),
    description: data.get('description'),
    price: data.get('price'),
    seller: pb.authStore.model.id,
  });
  return result;
};

//Component
export default function Page() {
  const [submitButtonColor, setSubmitButtonColor] = React.useState('primary');
  const [submitButtonText, setSubmitButtonText] = React.useState('Post Ad');
  const [record, setRecord] = React.useState();
  const [selectedFile, setSelectedFile] = React.useState();
  const [preview, setPreview] = React.useState();
  const [errorMessage, setErrorMessage] = React.useState();

  const setSubmitButtonStyle = (color, text) => {
    setSubmitButtonColor(color);
    setSubmitButtonText(text);
  };

  //Hook to watch for file changes
  React.useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  //Handle file select
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  //Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log('Form Data:', {
      Title: data.get('title'),
      Category: data.get('category'),
      Description: data.get('description'),
      Price: data.get('price'),
      Address: data.get('address'),
      Zipcode: data.get('zipcode'),
    });
    pbLogin();
    pbCreateAd(data)
      .then((result) => {
        // success...
        console.log('Result:', result);
        setSubmitButtonStyle('success', 'Success');
      })
      .catch((error) => {
        // error...
        console.log('Error:', error);
        console.log('Data:', error.data);
        let errorMessages = new Set();
        for (const [key, value] of Object.entries(error.data.data)) {
          console.log(value.message);
          errorMessages.add(value.message);
        }
        setErrorMessage(errorMessages);

        setSubmitButtonStyle('error', 'Error');
      });
  };

  //Hook for category select, sets category to selected value
  const [Category, setCategory] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    //Modifies theme on all child components
    <ThemeProvider theme={theme}>
      {/* Centres content horizontally*/}
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
                  startIcon={<PhotoCamera />}
                >
                  Upload Picture
                  <input type="file" onChange={onSelectFile} hidden />
                </Button>
              </Grid>
              <Grid item xs={12}>
                {selectedFile && (
                  <Box
                    component="img"
                    src={preview}
                    sx={{
                      maxWidth: 300,
                      maxHeight: 300,
                    }}
                  ></Box>
                )}
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

              <Grid item xs={4}>
                <Button
                  type="submit"
                  variant="contained"
                  color={submitButtonColor}
                  endIcon={<SendIcon />}
                >
                  {submitButtonText}
                </Button>
              </Grid>
              {errorMessage && (
                <Grid item xs={8}>
                  {errorMessage}
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
