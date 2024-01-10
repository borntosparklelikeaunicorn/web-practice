import React, {memo, useContext} from 'react';
import {MovieView} from '../../../types/movie';
import styles from './MovieCard.module.scss';
import cn from 'classnames';
import { fetchMovies } from '../../App/App.service';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MovieContext } from '../../../context/MovieContext';

export const MovieCard: React.FC<{card: MovieView; active: boolean; isFavorite: boolean}> = memo(({card, active, isFavorite}) => {
  const {title, year, genres} = card;

  const {callRerender} = useContext(MovieContext);
  
  return (
    <article className={cn(styles.card, {[styles.card_selected]: active})}>
      <h3 className={styles.card__title}>{title}</h3>
      <div className={styles.card__info}>
        <span className={styles.card__info__year}> {year}</span>
        <span className={styles.card__info__separator}>|</span>
        <ul>
          {genres.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {isFavorite ? <FavoriteIcon className="pointer" onClick={()=>{deleteFromFavorites(callRerender, card.id)}} /> 
        : <FavoriteBorderIcon className="pointer" onClick={()=>{addToFavorites(callRerender, card)}} />}
      </div>
      
    </article>
  );
});

async function addToFavorites(callRerender, card) {
  await fetchMovies('http://localhost:4000/favorites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(card)
  }).finally(()=>{
    callRerender();
  })
}


async function deleteFromFavorites(callRerender, id) {

  await fetchMovies(`http://localhost:4000/favorites/${id}`, {
    method: 'DELETE'
  }).finally(()=>{
    callRerender();
  })
}
export default MovieCard;
