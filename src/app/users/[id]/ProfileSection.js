'use client';
import { User } from '@nextui-org/react';

export const ProfileSection = ({ user }) => {
  const { name, avatar, id } = user;
  return (
    <>
      <div style={{ display: 'flex', margin: '20px 0 20px 0' }}>
        <User
          name={name}
          src={
            avatar === ''
              ? '/defaultAvatar.png'
              : `http://127.0.0.1:8090/api/files/users/${id}/${avatar}`
          }
          size="xl"
          color="success"
        />
      </div>
    </>
  );
};
