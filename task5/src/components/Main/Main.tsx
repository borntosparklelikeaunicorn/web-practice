import React from 'react';
import {Header} from '../Header/Header';
import {Outlet} from 'react-router-dom';
import MovieSearch from '../MovieAside/MovieSearch/MovieSearch';
import styles from './Main.module.scss';
import MovieAside from '../MovieAside/MovieAside';


export const Main: React.FC = () => {
  return (
    <>
      <Header />
      <main className={styles.mainContent}>
        <aside className={styles.mainContent__list}>
          <MovieSearch />
          <MovieAside />
        </aside>

        <Outlet />
        {/*{currentMovie ? <MovieInfo currentMovie={currentMovie} /> : <PlugNotSelectMovie />}*/}
      </main>
    </>
  );
};
