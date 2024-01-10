import React from 'react';
import styles from './MovieAside.module.scss';
import MovieList from './MovieList/MovieList';
import ListPanel from './ListPanel/ListPanel';


export const MovieAside: React.FC = () => {
  return (
    <section className={styles.movieList}>
      <MovieList/>

      <ListPanel/>
    </section>
  );
};

export default MovieAside;
