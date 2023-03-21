'use client';

import pb from 'src/app/(lib)/pocketbase.js';
import { Avatar, Button, Text, useTheme } from '@nextui-org/react';
import { Delete, PaperPlus } from 'react-iconly';
import { useState } from 'react';

export const EditAvatar = ({ userRecord }) => {
  const { theme } = useTheme();
  const [avatar, setAvatar] = useState(
    userRecord.avatar &&
      `http://127.0.0.1:8090/api/files/users/${userRecord.id}/${userRecord.avatar}`
  );

  async function uploadAvatar(file) {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      pb.collection('users')
        .update(userRecord.id, formData)
        .then((result) => {
          setAvatar(
            `http://127.0.0.1:8090/api/files/users/${result.id}/${result.avatar}`
          );
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteAvatar() {
    try {
      await pb.collection('users').update(userRecord.id, {
        avatar: null,
      });
      setAvatar(null);
    } catch (error) {}
  }
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
      }}
    >
      <Avatar
        css={{
          marginRight: '$3',
          size: '$40',
          '& .nextui-avatar-text': { fontSize: '$4xl' },
        }}
        src={avatar}
        text={userRecord.name && userRecord.name.match(/\b\w/g).join('')}
      ></Avatar>
      <div
        style={{
          width: '200px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        <label class="custom-file-upload" style={{ width: '100%' }}>
          <input
            type="file"
            onChange={(e) => {
              console.log(e.target.files.item(0));
              uploadAvatar(e.target.files.item(0));
            }}
            s
          />
          <PaperPlus set="bold" primaryColor={theme.colors.green600.value} />
          <Text
            b
            size={'$sm'}
            css={{ color: '$green600', whiteSpace: 'nowrap' }}
          >
            Upload pictures
          </Text>
        </label>

        <Button
          color="error"
          onClick={deleteAvatar}
          css={{
            width: '100%',
            textAlign: 'center',
            '& span': { fontWeight: 'bold' },
          }}
        >
          <Delete set="bold" primaryColor="white" />
          Remove Avatar
        </Button>
      </div>
    </div>
  );
};
