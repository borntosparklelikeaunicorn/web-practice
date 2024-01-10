import {useContext, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '../../Button/Button';
import {MovieContext} from '../../../context/MovieContext';
import styles from './ListPanel.module.scss';

export const ListPanel = () => {
  const {movies} = useContext(MovieContext);
  const navigate = useNavigate();

  const createButton = useCallback(
    () => {
      navigate(`/movie/create`)
    }, []
  );

  return (
    <div className={styles.panel}>
      <span className={styles.info}>Найдено {movies.length} элементов</span>
      <Button onClick={createButton}>+ Добавить</Button>
    </div>
  );
};

export default ListPanel;
