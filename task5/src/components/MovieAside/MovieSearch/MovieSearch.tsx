import { useContext, useEffect, useState, useRef } from 'react';
import { MovieContext } from '../../../context/MovieContext';
import useDebounce from '../../../hooks/useDebounce';
import { fetchMovies } from '../../App/App.service';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


import Button from '../../Button/Button';
import { Modal } from '../../Modal/Modal';
import styles from './MovieSearch.module.scss';

export const MovieSearch = () => {
  const [value, setValue] = useState('');
  const { debounceValue } = useDebounce(value, 500);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { changeList, isFavorite, setMovies, filters, setFilters } = useContext(MovieContext);


  const [filterList, setFilterList] = useState([]);

  const anchorFiltrationButton = useRef();

  useEffect(() => {
    fetchMovies(`http://localhost:4000/genres`).then((res) => {
      setFilterList(res);
    });
  }, []);

  const filteredListObj = {};
  filterList.forEach(function (item, i, res) {
    filteredListObj[item] = !!filters.includes(item);
  });

  const toggleFilter = (filter: string) => {
    setFilters((prevFilters: string[]) => {

      if (prevFilters.includes(filter)) {
        return prevFilters.filter((item) => item !== filter);
      }

      return [...prevFilters, filter];
    });
  };

  useEffect(() => {
    fetchMovies(`http://localhost:4000/movies?title_like=${value}`).then((movies) => {
      setMovies(movies);
    });
  }, [debounceValue]);

  return (
    <form className={styles.form}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={styles.control}
        type="text"
        name="search"
        placeholder="Введите название фильма"
      />

      {isFavorite ? <FavoriteIcon className="pointer" onClick={()=>changeList()}/>
        : <FavoriteBorderIcon className="pointer" onClick={()=>changeList()}/>}

      <div ref={anchorFiltrationButton}>
        <Button secondary type="button" onClick={() => setIsModalOpen(true)}>
          Фильтры
        </Button>
      </div>

      <Modal isOpen={isModalOpen} anchor={anchorFiltrationButton} onClose={() => setIsModalOpen(false)}>
        <ul className={styles.modalWindow}>
          {filterList.map((filterName, index) => (
            <li key={index}>
              <Button secondary={!filteredListObj[filterName]} type="button" onClick={() => toggleFilter(filterName)}>
                {filterName}
              </Button>
            </li>
          ))}
        </ul>
      </Modal>
    </form>
  );
};

export default MovieSearch;
