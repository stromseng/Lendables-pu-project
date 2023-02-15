'use client';

import { useState, useEffect } from 'react';
import pb from './(lib)/pocketbase';
import styles from './Header.module.css';
import Link from 'next/link';

export default function Header() {
  const [username, setUsername] = useState();

  useEffect(() => {
    setUsername(pb.authStore.model?.username);
  }, []);

  const removeListener = pb.authStore.onChange((token, model) => {
    console.log('New user:' + model);
    setUsername(model?.username);
  });

  return (
    <nav className={styles.navBar}>
      <Link href="/">
        <h2>NettVerkTøy</h2>
      </Link>
      <ul>
        <li>
          <Link href="/ads">
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
          <Link href="/">
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
