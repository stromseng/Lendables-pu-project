'use client';

import { useState, useEffect } from 'react';
import pb from './(lib)/pocketbase';
import styles from './Header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { Dropdown, Navbar, User, Text } from '@nextui-org/react';
import useLogout from './(hooks)/useLogout';
import { useRouter } from 'next/navigation';

export default function Header() {
  const logout = useLogout();
  const [username, setUsername] = useState();
  const [avatar, setAvatar] = useState();
  const router = useRouter();

  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    setUsername(pb.authStore.model?.username);
  }, []);

  const removeListener = pb.authStore.onChange((token, model) => {
    setUsername(model?.username);
  });

  try {
    pb.collection('users')
      .getOne(pb.authStore.model.id)
      .then((data) => {
        setAvatar(pb.getFileUrl(data, data.avatar));
      });
  } catch (error) {}

  function handleLogOut() {
    logout();
    router.push('/login');
  }

  return (
    <Navbar className={styles.navBar}>
      <Navbar.Brand>
        <Link href="/">
          <Image
            onPress={(e) => {
              setActivePage(0);
            }}
            src="/Lendables_light.png"
            height={52}
            width={180}
            alt={'logo'}
          />
        </Link>
      </Navbar.Brand>

      <Navbar.Content>
        <Navbar.Link
          isActive={activePage === 1}
          activeColor={'success'}
          onPress={(e) => {
            setActivePage(1);
          }}
        >
          <Link href="/posts">
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,500,0,0"
            />
            <span className={`${styles.icon} material-symbols-outlined`}>
              search
            </span>
            Search
          </Link>
        </Navbar.Link>

        <Navbar.Link
          isActive={activePage === 2}
          activeColor={'success'}
          onPress={(e) => {
            setActivePage(2);
          }}
        >
          <Link href="/createad">
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,500,0,0"
            />
            <span className={`${styles.icon} material-symbols-outlined`}>
              add_circle
            </span>
            New post
          </Link>
        </Navbar.Link>
        {username ? (
          <Dropdown>
            <Navbar.Item>
              <Dropdown.Trigger>
                <User name={username} size="sm" src={avatar} />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              onAction={(key) => {
                key == 'logout' && handleLogOut();
                key == 'profile' &&
                  router.push(`/profile/${pb.authStore.model.id}`);
              }}
            >
              <Dropdown.Item key="account" css={{ height: '$18' }}>
                <Text b color="inherit" css={{ d: 'flex', margin: '$2 $0' }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: 'flex', margin: '$2 $0' }}>
                  {pb.authStore.model.email}
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="profile" aria-label="My Profile">
                Profile
              </Dropdown.Item>
              <Dropdown.Item key="posts" withDivider>
                My posts
              </Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color={'error'}>
                Log out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Navbar.Link
            onPress={(e) => {
              setActivePage(3);
            }}
          >
            <Link href="/login">
              <User name={'Log in'} size="sm" />
            </Link>
          </Navbar.Link>
        )}
      </Navbar.Content>
    </Navbar>
  );
}
