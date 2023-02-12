'use client';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import pb from 'src/app/(lib)/pocketbase.js';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import useLogin from '../(hooks)/useLogin';
import useLogout from '../(hooks)/useLogout';

export default function LoginField() {
  const logout = useLogout();
  const { login, isLoading, isError } = useLogin();
  const { register, handleSubmit, reset } = useForm();

  async function onSubmit(data) {
    login({ email: data.email, password: data.password });
    reset();
  }

  if (pb.authStore.isValid)
    return (
      <>
        <Button
          variant="outlined"
          color="error"
          style={{ margin: 'auto' }}
          onClick={logout}
        >
          Log out
        </Button>
      </>
    );

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
          minWidth: '300px',
        }}
      >
        <Card>
          <CardContent
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <Typography sx={{ fontWeight: 'bold' }} variant="h5">
              Logg inn
            </Typography>
            <TextField
              id="username"
              label="Username"
              type="search"
              {...register('email')}
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              {...register('password')}
            />
            {isError && (
              <p style={{ color: 'red', fontSize: '12px', margin: '0rem' }}>
                Invalid username or password
              </p>
            )}
            <Button variant="contained" type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Log Inn'}
            </Button>
            <Button variant="text">Registrer ny bruker</Button>
          </CardContent>
        </Card>
      </form>
    </>
  );
}
