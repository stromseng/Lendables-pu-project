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
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';

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
  await pb
    .collection('users')
    .authWithPassword('magnus.stromseng@gmail.com', 'asdasdasdasd');
  console.log(pb.authStore.isValid);
  console.log(pb.authStore.token);
  console.log(pb.authStore.model.id);
};

//Create record from form data and selected files
const pbCreateAd = async (data, selectedFiles) => {
  const formData = new FormData();
  //Append form data to formData
  formData.append('title', data.get('title'));
  formData.append('description', data.get('description'));
  formData.append('price', data.get('price'));
  formData.append('seller', pb.authStore.model.id);
  formData.append('category', data.get('category'));
  formData.append('address', data.get('address'));
  formData.append('zipcode', data.get('zipcode'));
  if (selectedFiles) {
    for (let file of selectedFiles) {
      formData.append('pictures', file);
    }
  }
  //Try to create record in pocketbase
  const result = await pb.collection('advertisements').create(formData);
  return result;
};

//Component
export default function Page() {
  const [submitButtonColor, setSubmitButtonColor] = React.useState('primary');
  const [submitButtonText, setSubmitButtonText] =
    React.useState('Opprett Annonse');
  const [errorMessage, setErrorMessage] = React.useState();

  //Form Hooks
  const [Title, setTitle] = React.useState('');
  const [Category, setCategory] = React.useState('');
  const [Description, setDescription] = React.useState('');
  const [Price, setPrice] = React.useState('');

  //Unused form hooks for now (will be used later when implementing proper form validation)
  // eslint-disable-next-line no-unused-vars
  const [Address, setAddress] = React.useState('');
  // eslint-disable-next-line no-unused-vars
  const [Zipcode, setZipcode] = React.useState('');
  // eslint-disable-next-line no-unused-vars
  const [phone, setPhone] = React.useState('');
  // eslint-disable-next-line no-unused-vars
  const [email, setEmail] = React.useState('');

  //File Upload Image Hooks
  const [selectedFiles, setSelectedFiles] = React.useState();
  const [imageUrls, setImageUrls] = React.useState([]);

  const setSubmitButtonStyle = (color, text) => {
    setSubmitButtonColor(color);
    setSubmitButtonText(text);
  };

  //Hook to watch for file changes
  React.useEffect(() => {
    if (!selectedFiles) {
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
    pbCreateAd(data, selectedFiles)
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
          console.log(key, value.message);
          errorMessages.add(key + ':' + value.message + ' ');
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
        sx={{
          border: 1,
          borderRadius: 1,
          borderColor: 'grey.500',
          boxShadow: 1,
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            marginBottom: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Lag en Annonse
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
                  label="Tittel"
                  helperText="Beskriv gjenstanden kort og konsist"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="item-category-label">Kategori</InputLabel>
                  <Select
                    labelId="item-category-label"
                    id="category"
                    value={Category}
                    label="Kategori"
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                    required
                    name="category"
                  >
                    <MenuItem value="Electronics">Elektronikk</MenuItem>
                    <MenuItem value="Clothing">Klær</MenuItem>
                    <MenuItem value="Other">Diverse</MenuItem>
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
                  label="Beskrivelse"
                  name="description"
                  helperText="Beskriv gjenstanden i detalj"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  label="Pris"
                  type="number"
                  required
                  id="price"
                  name="price"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Kr.</InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12} alignItems="center" justifyContent="center">
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<PhotoCamera />}
                >
                  Last opp bilder
                  <input type="file" multiple onChange={onSelectFiles} hidden />
                </Button>
              </Grid>
              <Grid item xs={12}>
                {selectedFiles && (
                  <StandardImageList imageUrls={imageUrls}></StandardImageList>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="initial">
                  Hvor leier du fra?
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="address"
                  name="address"
                  label="Gate Adresse"
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
                  label="Postnummer"
                  onChange={(e) => {
                    setZipcode(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="initial">
                  Hvordan kan folk kontakte deg?
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Telefonnummer"
                  type="tel"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Epost"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
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
                  disabled={validateForm()}
                >
                  {submitButtonText}
                </Button>
              </Grid>
              {errorMessage && (
                <Grid item xs={8}>
                  {errorMessage}
                </Grid>
              )}
              <Grid display={'flex'} item xs={12} justifyContent={'center'}>
                <Typography variant="body2" color="initial">
                  Ved å opprette en annonse aksepterer du våre{' '}
                  <Link href="#" variant="body2">
                    vilkår og betingelser.
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
