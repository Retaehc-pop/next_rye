import type { NextPage } from 'next'
import styles from '../styles/Layout.module.scss';
import Link from 'next/link';


export default function Layout({children}){
  return (
    <>
    <nav className={styles.nav}>
      <h3>RYE Airport</h3>
      <Link href="/"><h3>Home</h3></Link>
      </nav>
      {children}
    <footer className={styles.footer}>
      <p>Made by Pop</p>
    </footer>
    </>
  );
}