import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {fetchMovies} from '../../components/App/App.service';
import styles from './MovieInfo.module.scss';

const MovieInfo: React.FC = () => {
  const {id} = useParams();
  const [currentMovie, setCurrentMovie] = useState(null);

  useEffect(() => {
    fetchMovies(`http://localhost:4000/movies/${id}`)
      .then((movie) => {
        setCurrentMovie(movie);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  if (currentMovie == null) return null;

  const imgError = (event) => {
    event.target.src = 'https://cdn.discordapp.com/attachments/823592863274369045/1194319509721460746/Group_1-3.png?ex=65afebb8&is=659d76b8&hm=585ea36e66131a849e1001c9d35a585657cd64a5315840f90f7c274076d04dad&'
  }


  return (
    <section className={styles.container}>
      <div className={styles.movieInfoHeader}>
        <span className={styles.idText}>Film ID: {id}</span>

        <Link className={styles.editLink} to={`/movie/${id}/edit`}> 
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 13.5858V9.17157L13.5858 0.585786C14.3668 -0.195262 15.6332 -0.195262 16.4142 0.585786L18 2.17157C18.781 2.95262 18.781 4.21895 18 5L9.41421 13.5858H5ZM14 15.5858V12.5858L16 10.5858V12.5858V15.5858C16 17.2426 14.6569 18.5858 13 18.5858H3C1.34315 18.5858 0 17.2426 0 15.5858V5.58579C0 3.92893 1.34315 2.58579 3 2.58579H6H8L6 4.58579H3C2.44772 4.58579 2 5.0335 2 5.58579V15.5858C2 16.1381 2.44772 16.5858 3 16.5858H13C13.5523 16.5858 14 16.1381 14 15.5858ZM15 2L16.5858 3.58579L8.58579 11.5858H7V10L15 2Z" fill="#333333"/>
          </svg>
          Редактировать
        </Link>
      </div>

      <div className={styles.movieInfoBody}>
        <img onError={imgError} width={'300'} src={currentMovie.posterUrl} alt={'Film poster'} />

        <div className={styles.containerInfo}>
          <div>
            <h2 className={styles.title}>{currentMovie.title}</h2>
            
            <span className={styles.director}>{`Режиссёр(ы): ` + currentMovie.director}</span>
          </div>

          <div>
            <h3 className={styles.titleInfo}>О фильме</h3>
            <MovieInfoRow title={'Год производства'} value={currentMovie.year} />
            <MovieInfoRow title={'Актеры'} value={currentMovie.actors} />
            <MovieInfoRow title={'Длительность фильма'} value={
              `${currentMovie.runtime} мин. / `+
              `${Math.floor(currentMovie.runtime/60)}:`+
              `${currentMovie.runtime%60 > 9 ? `` : `0`}${currentMovie.runtime%60}`} />
            <MovieInfoRow
              title={'Жанры'}
              value={currentMovie.genres.map((genre, i) => (
                <span key={genre} className={styles.genre}>
                  {genre}{currentMovie.genres.length-1 === i ? '' : ','}
                </span>
              ))}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className={styles.descrTitle}>Описание</h3>
        <span className={styles.descrText}>{currentMovie.plot}</span>
      </div>
    </section>
  );
};
const MovieInfoRow = ({title, value}) => {
  return (
    <div className={styles.rowContainer}>
      <div className={styles.rowTitle}>{title}:</div>
      <div className={styles.rowValue}>{value}</div>
    </div>
  );
};

export default MovieInfo;
