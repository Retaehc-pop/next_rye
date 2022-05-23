import type { NextPage } from 'next'
import styles from '../styles/Layout.module.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons';

export default function Layout({children}){
  return (
    <>
    <nav className={styles.nav}>
      <div>
        <h3>RYE Airport</h3>
      </div>
      <Link href="/" passHref>
      <div>
        <FontAwesomeIcon icon={faHome} className={styles.icon}/> 
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