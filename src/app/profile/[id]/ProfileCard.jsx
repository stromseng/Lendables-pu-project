'use client';
import {
  Card,
  Text,
  Spacer,
  Container,
  Button,
  Input,
  Loading,
} from '@nextui-org/react';
import pb from 'src/app/(lib)/pocketbase.js';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { EditAvatar } from './EditAvatar';
import { useState } from 'react';
import { EditPassword } from './EditPassword';

export default function ProfileCard({ userRecord }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [initalValue, setInitalValue] = useState({
    username: userRecord.username,
    name: userRecord.name,
    email: userRecord.email,
    telephone_number: userRecord.telephone_number,
  });
  const [helperText, setHelperText] = useState({ text: '', color: 'error' });

  const router = useRouter();

  const updateUser = (data) => {
    setHelperText({ text: '', color: 'error' });
    setIsLoading(true);
    pb.collection('users')
      .update(userRecord.id, data)
      .then((record) => {
        setInitalValue({
          username: record.username,
          name: record.name,
          email: record.email,
          telephone_number: record.telephone_number,
        });
        setHelperText({
          text: 'Successfully updated profile information',
          color: 'success',
        });
        resetFields();
      })
      .catch((error) => {
        setHelperText({ text: 'Something went wrong', color: 'error' });
        resetFields();
        reset(initalValue);
      });
  };

  const resetFields = () => {
    setIsLoading(false);
    setTimeout(() => {
      setHelperText({ text: '', color: 'error' });
    }, 5000);
  };

  return (
    <Container xs css={{ p: 30 }}>
      <Card css={{ width: 500 }}>
        <Card.Body
          css={{
            gap: 10,
            justifyContent: 'center',
            p: 20,
            '& .nextui-input-helper-text-container': { right: 0 },
          }}
        >
          <form
            onSubmit={handleSubmit(updateUser)}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <Text h2 css={{ textAlign: 'center' }}>
              Profile Information
            </Text>
            <EditAvatar userRecord={userRecord} />
            <Spacer y={0.5} />
            <Card.Divider />

            <Input
              bordered
              required={true}
              type="text"
              label="Username"
              initialValue={initalValue.username}
              {...register('username', {
                required: true,
              })}
            />
            <Input
              bordered
              required={true}
              type="text"
              label="Full Name"
              initialValue={initalValue.name}
              {...register('name', {
                required: true,
              })}
            />
            <Input
              readOnly
              bordered
              type="email"
              label="Email"
              initialValue={initalValue.email}
              css={{ '& input': { color: '$accents7' } }}
            />
            <Input
              bordered
              required={true}
              type="tel"
              label="Phone"
              initialValue={initalValue.telephone_number}
              {...register('telephone_number', {
                required: true,
              })}
              labelLeft="+47"
            />
            <Spacer y={0.5} />
            <Button
              color="success"
              disabled={
                (watch('username') == initalValue.username &&
                  watch('name') == initalValue.name &&
                  watch('telephone_number') == initalValue.telephone_number) ||
                isLoading
              }
              type="submit"
            >
              {isLoading ? (
                <Loading type="points" color="currentColor" size="sm" />
              ) : (
                'Save changes'
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
          <EditPassword userRecord={userRecord} />
        </Card.Body>
      </Card>
    </Container>
  );
}
