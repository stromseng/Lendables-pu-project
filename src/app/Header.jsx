import styles from './page.module.css';
import Image from 'next/image';

export default function Header() {
  return (
    <div className={styles.description}>
      <p>
        <h1>This is the Header</h1>
      </p>
    </div>
  );
}
