'use client';
import {
  Card,
  Text,
  Spacer,
  Container,
  Button,
  Input,
} from '@nextui-org/react';
import pb from 'src/app/(lib)/pocketbase.js';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { EditAvatar } from './EditAvatar';

export default function ProfileCard({ userRecord }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const validateForm = (data) => {};
  const onSubmit = (data) => {
    validateForm(data);

    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('name', data.name);
    formData.append('telephone_number', data.phone);
    formData.append('password', data.newpw1);
    formData.append('passwordConfirm', data.newpw2);
    formData.append('oldPassword', data.oldpw);

    updateProfile(formData);
  };

  async function updateProfile(data) {
    console.log('Updating profile...');
    console.log('FormData: ', data);
    const record = await pb.collection('users').update(userRecord.id, data);
    console.log('Record: ', record);
    router.refresh();
  }

  return (
    <Container xs css={{ p: 30 }}>
      <Card css={{ width: 500 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card.Body css={{ gap: 10, justifyContent: 'center', p: 20 }}>
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
              initialValue={userRecord.username}
              {...register('username', {
                required: true,
              })}
            />
            <Input
              bordered
              required={true}
              type="text"
              label="Full Name"
              initialValue={userRecord.name}
              {...register('name', {
                required: true,
              })}
            />
            <Input
              readOnly
              bordered
              type="email"
              label="Email"
              initialValue={userRecord.email}
              {...register('email')}
              css={{ '& input': { color: '$accents7' } }}
            />
            <Input
              bordered
              required={true}
              type="tel"
              label="Phone"
              initialValue={userRecord.telephone_number}
              {...register('phone', {
                required: true,
              })}
              labelLeft="+47"
            />
            <Spacer y={0.5} />
            <Card.Divider />
            <Text h3>Change Password</Text>
            <Input.Password
              bordered
              type="password"
              label="Old Password"
              {...register('oldpw')}
            />
            <Input.Password
              bordered
              type="password"
              label="New Password"
              {...register('newpw1')}
            />
            <Input.Password
              bordered
              type="password"
              label="New Password (again)"
              {...register('newpw2')}
            />
            <Spacer y={2} />
            <Button type="submit">Save Changes</Button>
          </Card.Body>
          <Card.Divider />
        </form>
      </Card>
    </Container>
  );
}
