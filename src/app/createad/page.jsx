'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
  Container,
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import SelectInput from '@mui/material/Select/SelectInput';
import { SelectUnstyled } from '@mui/base';
import FormControl from '@mui/material/FormControl';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/base/TextareaAutosize';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import SendIcon from '@mui/icons-material/Send';

const theme = createTheme();

export default function Page() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
                  id="outlined-required"
                  label="Title"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="item-category-label">Category</InputLabel>
                  <Select
                    labelId="item-category-label"
                    id="item-category"
                    value={Category}
                    label="Category"
                    onChange={handleChange}
                    required
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
                  id="outlined-required"
                  label="Description"
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
                ></TextField>
              </Grid>
              <Grid
                item
                xs={12}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
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
                <TextField fullWidth id="outlined" label="Street Address" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth id="outlined" label="Zipcode" />
              </Grid>

              <Grid item xs={12}>
                <Button
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
