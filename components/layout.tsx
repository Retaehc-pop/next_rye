import type { NextPage } from 'next'
import styles from '../styles/Layout.module.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons';

export default function Layout({children}){
  return (
    <>
    <nav className={styles.nav}>
      <h3>RYE Airport</h3>
      <Link href="/" passHref>
          <div>
            <FontAwesomeIcon icon={faHome} className={styles.icon}/> 
            <h3>Home</h3>
          </div>
          </Link>
      </nav>
      {children}
    <footer className={styles.footer}>
      <p>Made by Pop</p>
    </footer>
    </>
  );
}