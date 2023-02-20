'use client';

import { useState, useEffect } from 'react';
import pb from './(lib)/pocketbase';
import styles from './Header.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [username, setUsername] = useState();

  useEffect(() => {
    setUsername(pb.authStore.model?.username);
  }, []);

  const removeListener = pb.authStore.onChange((token, model) => {
    setUsername(model?.username);
  });

  return (
    <nav className={styles.navBar}>
      <Link href="/">
        <Image
          src="/Lendables_light.png"
          height={52}
          width={180}
          alt={'logo'}
        />
      </Link>
      <ul>
        <li>
          <Link href="/posts">
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,500,0,0"
            />
            <span className={`${styles.icon} material-symbols-outlined`}>
              search
            </span>
            Søk
          </Link>
        </li>
        <li>
          <Link href="/createad">
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,500,0,0"
            />
            <span className={`${styles.icon} material-symbols-outlined`}>
              add_circle
            </span>
            Ny annonse
          </Link>
        </li>
        <li>
          <Link href="/login">
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,500,1,0"
            />
            <span className={`${styles.icon} material-symbols-outlined`}>
              account_circle
            </span>
            {username ?? 'Log in'}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
