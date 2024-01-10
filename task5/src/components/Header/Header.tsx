import React from 'react';
import { useCallback } from 'react';
import Button from '../Button/Button';
import styles from './Header.module.scss';

export const Header = () => {
  const myNameButton = useCallback( 
    () => {
      window.open('https://github.com/borntosparklelikeaunicorn', '_blank', 'noopener,noreferrer')
    }, []);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <h1 className={styles.logo}>ФИЛЬМОТЕКА</h1>
        <Button onClick={myNameButton}>6407 Мария Макарова</Button>
      </div>
    </header>
  );
};
