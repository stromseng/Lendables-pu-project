'use client';

import pb from './(lib)/pocketbase';
import styles from './Header.module.css';

export default function Header() {
  return (
    <nav className={styles.navBar}>
      <a href="/">
        <h2>NettVerkTøy</h2>
      </a>
      <ul>
        <li>
          <a href="/ads">
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,500,0,0"
            />
            <span className={`${styles.icon} material-symbols-outlined`}>
              search
            </span>
            Søk
          </a>
        </li>
        <li>
          <a href="/">
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,500,0,0"
            />
            <span className={`${styles.icon} material-symbols-outlined`}>
              add_circle
            </span>
            Ny annonse
          </a>
        </li>
        <li>
          <a href="/login">
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,500,1,0"
            />
            <span className={`${styles.icon} material-symbols-outlined`}>
              account_circle
            </span>
            {pb.authStore.isValid ? pb.authStore.model.username : 'Log in'}
          </a>
        </li>
      </ul>
    </nav>
  );
}
