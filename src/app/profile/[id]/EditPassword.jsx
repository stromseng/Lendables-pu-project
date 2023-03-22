'use client';
import { Card, Text, Spacer, Button, Input, Loading } from '@nextui-org/react';
import pb from 'src/app/(lib)/pocketbase.js';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useLogin from '@/app/(hooks)/useLogin';

export const EditPassword = ({ userRecord }) => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const { login } = useLogin();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [helperText, setHelperText] = useState({ text: '', color: 'error' });

  const updatePassword = (data) => {
    setHelperText({ text: '', color: 'error' });
    setIsLoading(true);
    pb.collection('users')
      .update(userRecord.id, data)
      .then((record) => {
        setHelperText({
          text: 'Successfully updated password',
          color: 'success',
        });
        login({ email: record.email, password: data.password });
        resetFields();
      })
      .catch((error) => {
        setHelperText({
          text: 'Could not update password. Please try again',
          color: 'error',
        });
        resetFields();
      });
  };

  const resetFields = () => {
    reset();
    setIsLoading(false);
    setTimeout(() => {
      setHelperText({ text: '', color: 'error' });
    }, 5000);
  };

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
      onSubmit={handleSubmit(updatePassword)}
    >
      <Spacer y={0.5} />
      <Card.Divider />
      <Text h3>Change Password</Text>
      <Input.Password
        bordered
        type="password"
        label="Old Password"
        helperText={errors.oldPassword?.message}
        helperColor={'error'}
        {...register('oldPassword', {
          required: 'Old password is required.',
        })}
      />
      <Input.Password
        bordered
        type="password"
        label="New Password"
        helperText={errors.password?.message}
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
        type="password"
        label="New Password (again)"
        helperText={errors.passwordConfirm?.message}
        helperColor={'error'}
        {...register('passwordConfirm', {
          required: 'You must confirm the password.',
          validate: {
            passwordMatch: (value) =>
              getValues().password === value || "Passwords doesn't match.",
          },
        })}
      />
      <Spacer y={0.5} />
      <Button disabled={isLoading} type="submit" color="success">
        {isLoading ? (
          <Loading type="points" color="currentColor" size="sm" />
        ) : (
          'Update password'
        )}
      </Button>
      {helperText.text && (
        <Text
          size="$sm"
          weight="light"
          color={helperText.color}
          css={{ textAlign: 'center', marginTop: 0 }}
        >
          {helperText.text}
        </Text>
      )}
    </form>
  );
};
