'use client';

import { useState, useEffect, useContext } from 'react';
import pb from './(lib)/pocketbase';
import styles from './Header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { Dropdown, Button, Navbar, User, Text } from '@nextui-org/react';
import useLogout from './(hooks)/useLogout';
import { useRouter } from 'next/navigation';
import { Plus, Search } from 'react-iconly';
import { SunIcon } from 'public/SunIcon';
import { MoonIcon } from 'public/MoonIcon';
import { ThemeContext } from './Providers';

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const logout = useLogout();
  const [username, setUsername] = useState();
  const [avatar, setAvatar] = useState();
  const router = useRouter();

  const [activePage, setActivePage] = useState(0);

  const updateProfilePicture = (user) => {
    try {
      pb.collection('users')
        .getOne(user.id)
        .then((data) => {
          if (data.avatar) {
            setAvatar(pb.getFileUrl(data, data.avatar));
          }
        });
    } catch (error) {}
  };

  useEffect(() => {
    setUsername(pb.authStore.model?.username);
    updateProfilePicture(pb.authStore.model);
  }, []);

  function handleLogOut() {
    setAvatar();
    logout();
    setUsername();
    router.push('/login');
  }

  return (
    <Navbar
      className={styles.navBar}
      css={{
        backgroundColor: '$backgroundContrast',
        $$navbarBlurBackgroundColor: 'transparent',
      }}
    >
      <Navbar.Brand>
        <Link href="/">
          <Image
            onPress={(e) => {
              setActivePage(0);
            }}
            src={
              theme.type === 'light'
                ? '/Lendables_light.png'
                : '/Lendables_dark.png'
            }
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
          <Link href="/">
            <Search
              set="curved"
              primaryColor={
                activePage === 1
                  ? theme.theme.colors.green600.value
                  : theme.theme.colors.foreground.value
              }
              className={styles.navLink}
            />
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
            <Plus
              set="curved"
              primaryColor={
                activePage === 2
                  ? theme.theme.colors.green600.value
                  : theme.theme.colors.foreground.value
              }
              className={styles.navLink}

            />
            New post
          </Link>
        </Navbar.Link>
        <Button
          light
          rounded
          auto
          icon={
            theme.type === 'light' ? <MoonIcon filled /> : <SunIcon filled />
          }
          onPress={() => {
            toggleTheme();
            console.log('Switching theme');
          }}
        ></Button>
        {username ? (
          <Dropdown>
            <Navbar.Item>
              <Dropdown.Trigger>
                <User
                  name={username}
                  size="sm"
                  src={avatar}
                  text={
                    pb.authStore.model.name &&
                    pb.authStore.model.name.match(/\b\w/g).join('')
                  }
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              onAction={(key) => {
                key == 'logout' && handleLogOut();
                key == 'profile' &&
                  router.push(`/profile/${pb.authStore.model.id}`);
                key == 'posts' && router.push(`users/${pb.authStore.model.id}`);
                (key == 'logout' || key == 'profile' || key == 'posts') &&
                  setActivePage(0);
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
