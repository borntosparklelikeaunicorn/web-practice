import React from 'react';
import styles from './MovieNotSelected.module.scss';

const MovieNotSelected = () => {
  return (
    <div className={styles.container}>
      <span className={styles.placeholder}>Выберите фильм</span>
    </div>
  );
};

export default MovieNotSelected;
