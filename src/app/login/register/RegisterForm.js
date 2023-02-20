'use client';

import styles from 'src/app/login/register/RegisterForm.module.css';
import { useForm } from 'react-hook-form';
import { Button, Card, Input, Loading, Spacer, Text } from '@nextui-org/react';
import useRegister from '@/app/(hooks)/useRegister';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterForm() {
  const router = useRouter();
  const [PBerror, setPBerror] = useState();
  const { registerUser, isLoading } = useRegister();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm();

  function onSubmit(data) {
    setPBerror();
    registerUser(data).then((e) => {
      if (e) {
        setPBerror(e);
      } else {
        reset();
        router.push('/posts');
      }
    });
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
          minWidth: '350px',
        }}
      >
        <Card variant="flat">
          <Card.Body
            className={styles.registerForm}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '25px',
              padding: '25px',
            }}
          >
            <Text h2 style={{ margin: '0rem' }}>
              Create a new account
            </Text>
            <Input
              clearable
              bordered
              id="username"
              label="Username"
              helperText={
                (PBerror?.username && PBerror.username.message) ||
                errors.username?.message
              }
              helperColor={'error'}
              {...register('username', {
                required: 'Username is required.',
                maxLength: {
                  value: 20,
                  message: 'Username cannot be longer than 20 characters.',
                },
              })}
            />
            <Input
              clearable
              bordered
              id="email"
              label="Email"
              helperText={
                (PBerror?.email && PBerror.email.message) ||
                errors.email?.message
              }
              helperColor={'error'}
              {...register('email', {
                required: 'Email Address is required.',
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                  message: 'Not a valid email.',
                },
              })}
            />
            <Input.Password
              bordered
              id="outlined-password-input"
              label="Password"
              type="password"
              helperText={
                (PBerror?.password && PBerror.password.message) ||
                errors.password?.message
              }
              helperColor={'error'}
              {...register('password', {
                required: 'Password is required.',
                minLength: {
                  value: 8,
                  message: 'Password needs to be longer than 8 characters.',
                },
              })}
            />
            <Input.Password
              bordered
              id="outlined-password-input"
              label="Confirm password"
              type="password"
              helperText={
                (PBerror?.passwordConfirm && PBerror.passwordConfirm.message) ||
                errors.passwordConfirm?.message
              }
              helperColor={'error'}
              {...register('passwordConfirm.', {
                required: 'You must confirm the password.',
                validate: {
                  passwordMatch: (value) =>
                    getValues().password === value ||
                    "Passwords doesn't match.",
                },
              })}
            />
            <Spacer y={0.1} />
            <Button disabled={isLoading} type="submit" color="success">
              {isLoading ? (
                <Loading type="points" color="currentColor" size="sm" />
              ) : (
                'Register'
              )}
            </Button>
          </Card.Body>
        </Card>
      </form>
    </>
  );
}
