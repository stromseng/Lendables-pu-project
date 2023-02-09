/* eslint-disable @next/next/no-img-element */
'use client';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SendIcon from '@mui/icons-material/Send';
import {
  Container,
  Grid,
  ImageList,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';

//Import pocketbase
import pb from '@lib/pocketbase';

//Import Roboto font
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

//My components
import StandardImageList from './StandardImageList';

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

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

//Component
export default function Page() {
  const [submitButtonColor, setSubmitButtonColor] = React.useState('primary');
  const [submitButtonText, setSubmitButtonText] = React.useState('Post Ad');
  const [record, setRecord] = React.useState();
  const [selectedFiles, setSelectedFiles] = React.useState();
  const [preview, setPreview] = React.useState();
  const [errorMessage, setErrorMessage] = React.useState();

  //Form Hooks
  const [Title, setTitle] = React.useState('');
  const [Category, setCategory] = React.useState('');
  const [Description, setDescription] = React.useState('');
  const [Price, setPrice] = React.useState('');
  const [Address, setAddress] = React.useState('');
  const [Zipcode, setZipcode] = React.useState('');
  const [imageUrls, setImageUrls] = React.useState([]);

  const setSubmitButtonStyle = (color, text) => {
    setSubmitButtonColor(color);
    setSubmitButtonText(text);
  };

  //Hook to watch for file changes
  React.useEffect(() => {
    if (!selectedFiles) {
      setPreview(undefined);
      return;
    }

    //For loop over each file
    let tempArray = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      tempArray.push(URL.createObjectURL(selectedFiles[i]));
    }
    setImageUrls(tempArray);
  }, [selectedFiles]);

  //Handle file select
  const onSelectFiles = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFiles(undefined);
      return;
    }
    setSelectedFiles(e.target.files);
  };

  const formData = new FormData();

  //Create record in pocketbase
  const pbCreateAd = async (data) => {
    //Append form data to formData
    formData.append('title', data.get('title'));
    formData.append('description', data.get('description'));
    formData.append('price', data.get('price'));
    formData.append('seller', pb.authStore.model.id);
    formData.append('category', data.get('category'));
    for (let file of selectedFiles) {
      formData.append('pictures', file);
    }
    //create record in pocketbase
    const result = await pb.collection('advertisements').create(formData);
    return result;
  };

  //Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log('Form Data:', data);
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

  const validateForm = () => {
    return Title.length > 0 && Description.length > 0 && Price.length > 0;
  };

  return (
    //Modifies theme on all child components
    <ThemeProvider theme={theme}>
      {/* Centres content horizontally*/}
      <Container
        component="main"
        maxWidth="sm"
        sx={{ border: 1, borderRadius: 1, borderColor: 'grey.500' }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 8,
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
                  helperText="Describe your item in a few words"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
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
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
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
                  helperText="Describe your item in detail"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  label="Price"
                  type="number"
                  placeholder="Kr."
                  required
                  id="price"
                  name="price"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12} alignItems="center" justifyContent="center">
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<PhotoCamera />}
                >
                  Upload Pictures
                  <input type="file" multiple onChange={onSelectFiles} hidden />
                </Button>
              </Grid>
              <Grid item xs={12}>
                {selectedFiles && (
                  <StandardImageList imageUrls={imageUrls}></StandardImageList>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="address"
                  name="address"
                  label="Street Address"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="zipcode"
                  name="zipcode"
                  label="Zipcode"
                  onChange={(e) => {
                    setZipcode(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  color={submitButtonColor}
                  endIcon={<SendIcon />}
                  disabled={!validateForm()}
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
