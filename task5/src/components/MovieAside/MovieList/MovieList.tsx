import React, { useContext } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieList.module.scss';
import { MovieContext } from '../../../context/MovieContext';
import { Link, useParams } from 'react-router-dom';


function inFavorite(favorites, id){
  return !!favorites.find((movie) => movie.id === id);
}

export const MovieList = () => {

  const { isFavorite, favorites, movies  } = useContext(MovieContext);
  const { id } = useParams();
  
  
  return (
    <ul className={styles.container}>
      {(isFavorite ? favorites : movies).map((movie, index) => (
        <li className={styles.listItem} key={index}>
          <Link to={`movie/${movie.id}`}> 
            <MovieCard card={movie} active={movie.id === id} isFavorite={inFavorite(favorites, movie.id)} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
