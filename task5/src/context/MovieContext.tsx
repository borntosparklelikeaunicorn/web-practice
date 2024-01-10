import React, {createContext, useEffect, useState, useMemo} from 'react';
import {fetchMovies} from '../components/App/App.service';
import {TMovieList} from '../types/movie';

export const MovieContext = createContext<any>(null);

export const MovieContextProvider = ({children}) => {
  const [movies, setMovies] = useState<TMovieList>([]);
  const [favorites, setFavorites] = useState<TMovieList>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState([]);
  const [rerender, setRerender] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  function callRerender(){
    setRerender(rerender+1);
  }
  function changeList(){
    setIsFavorite(!isFavorite);
  }

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      return filters.every((filter) => movie.genres.includes(filter));
    });
  }, [movies, filters]);

  const filteredFav = useMemo(() => {
    return favorites.filter((movie) => {
      return filters.every((filter) => movie.genres.includes(filter));
    });
  }, [favorites, filters]);

  useEffect(() => {
    setLoading(true);

    fetchMovies('http://localhost:4000/movies')
      .then((movies) => {
        setMovies(movies);
      })
      .catch((err) => {
        setError(true);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [rerender]);

  useEffect(() => {
    setLoading(true);
    fetchMovies('http://localhost:4000/favorites')
      .then((movies) => {
        setFavorites(movies);
      })
      .catch((err) => {
        setError(true);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [rerender]);

  
  const contextValue = {
    favorites: filteredFav,
    movies: filteredMovies,
    setMovies,
    setFavorites,
    callRerender,
    isFavorite,
    changeList,
    filters,
    setFilters,
    isLoading,
    error,
  };



  return <MovieContext.Provider value={contextValue}>{children}</MovieContext.Provider>;
};
