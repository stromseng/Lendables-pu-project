'use client';

import pb from 'src/app/(lib)/pocketbase.js';
import { useForm } from 'react-hook-form';
import useLogin from '../(hooks)/useLogin';
import useLogout from '../(hooks)/useLogout';
import { useRouter } from 'next/navigation';
import {
  Body,
  Button,
  Card,
  Loading,
  Input,
  Text,
  Spacer,
} from '@nextui-org/react';
import { useEffect } from 'react';

export default function LoginField() {
  const router = useRouter();
  const logout = useLogout();
  const { login, isLoading, isError } = useLogin();
  const { register, handleSubmit, reset } = useForm();

  async function onSubmit(data) {
    login({ email: data.email, password: data.password }).then((error) => {
      !error && router.push('/posts');
    });
    reset();
  }

  //Return to post if user already is logged in
  useEffect(() => {
    pb.authStore.isValid && router.push('/posts');
  }, []);

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
        <Card variant="flat">
          <Card.Body
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              padding: '20px',
            }}
          >
            <Text h2 style={{ margin: '0rem' }}>
              Log In
            </Text>
            <Input
              id="username"
              clearable
              bordered
              label="Username"
              {...register('email')}
            />
            <Input.Password
              id="outlined-password-input"
              bordered
              label="Password"
              type="password"
              autoComplete="current-password"
              {...register('password')}
            />
            {isError && (
              <Text
                style={{
                  textAlign: 'center',
                  color: 'red',
                  fontSize: '13px',
                  margin: '0rem',
                }}
              >
                Invalid username or password
              </Text>
            )}
            <Button type="submit" disabled={isLoading} color="success">
              {isLoading ? (
                <Loading type="points" color="currentColor" size="sm" />
              ) : (
                'Log In'
              )}
            </Button>
            <Button
              light
              onPress={() => {
                router.push('/login/register');
              }}
            >
              Create a new account
            </Button>
          </Card.Body>
        </Card>
      </form>
    </>
  );
}
