import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovies } from '../../components/App/App.service';
import Button from '../../components/Button/Button';
import styles from './MovieEdit.module.scss';
import { MovieContext } from '../../context/MovieContext';

const MovieEdit = () => {
  const pathName = window.location.pathname;
  const isEditPage = pathName !== "/movie/create";

  const { id } = useParams();
  const navigate = useNavigate();
  const { setMovies } = useContext(MovieContext);

  const [genresList, setGenresList] = useState([]);
  useEffect(() => {
    fetchMovies(`http://localhost:4000/genres`).then((res) => {
      setGenresList(res);
    });
  }, []);

  const [genresListState, setGenresListState] = useState([]);

  const genresListObj = {};
  genresList.forEach(function (item) {
    genresListObj[item] = !!genresListState.includes(item);
  });

  const toggleGenre = (genre: string) => {
    setGenresListState((prevGenre: string[]) => {

      if (prevGenre.includes(genre)) {
        return prevGenre.filter((item) => item !== genre);
      }

      return [...prevGenre, genre];
    });
  };

  const [form, setForm] = useState({
    title: '',
    year: '',
    runtime: '',
    genres: [],
    director: '',
    actors: '',
    plot: '',
    posterUrl: '',
  });

  
    useEffect(() => {
      if (isEditPage)
      {
        fetchMovies(`http://localhost:4000/movies/${id}`).then((movie) => {
          setForm(movie);
          movie.genres.map((genreName) => {toggleGenre(genreName)});

        });
      }
      else
      {
        const baseForm = {
          title: '',
          year: '',
          runtime: '',
          genres: [],
          director: '',
          actors: '',
          plot: '',
          posterUrl: '',
        }
        setForm(baseForm);
        setGenresListState([]);
      }
    }, [id]);

  const onChangeForm = useCallback( (e: { target: { name: any; value: any; }; }) =>  setForm({ ...form, [e.target.name]: e.target.value }), [form]);

  const onSubmitForm = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    form.genres = genresListState;

    await fetchMovies(isEditPage ?  `http://localhost:4000/movies/${id}` : 'http://localhost:4000/movies', {
      method: isEditPage ? 'PATCH' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...form }),
    });

    await fetchMovies(`http://localhost:4000/movies`)
    .then((movies) => { 
      setMovies(movies); 
    });

    navigate(isEditPage ? `/movie/${id}` : `/`);
  };

  return (
    <section className={styles.container}>
      <form className={styles.inputForm} onSubmit={onSubmitForm}>
        <h3 className={styles.title}>{isEditPage ? `Редактирование фильма #${id}` : `Добавление фильма`}</h3>
        <Input onChange={onChangeForm} value={form.title} name={'title'} />
        <Input onChange={onChangeForm} value={form.year} name={'year'} />
        <Input onChange={onChangeForm} value={form.runtime} name={'runtime'} />

        <h5 className={styles.titleInputs}>{nameField['genres']}</h5>
        <div className={styles.genresList}>
          {genresList.map((genreName, index) => (
              <Button key={index} secondary={!genresListObj[genreName]} type="button" onClick={() => toggleGenre(genreName)}>
                {genreName}
              </Button>
            ))}
        </div>

        <Input onChange={onChangeForm} value={form.director} name={'director'} />
        <Input onChange={onChangeForm} value={form.actors} name={'actors'} />
        <InputTextarea onChange={onChangeForm} value={form.plot} name={'plot'} />
        <Input onChange={onChangeForm} value={form.posterUrl} name={'posterUrl'} />

        <Button type={'submit'}>{isEditPage ? "Сохранить" : "Добавить"}</Button>
      </form>
    </section>
  );
};

const nameField = {
  title: 'Название',
  year: 'Год выпуска',
  runtime: 'Длительность',
  genres: 'Жанры',
  director: 'Режиссер',
  actors: 'Актеры',
  plot: 'Описание',
  posterUrl: 'Ссылка на обложку',
};

const Input = ({ name, value, onChange }) => {
  return (
    <>
      <h5 className={styles.titleInputs}>{nameField[name]}</h5>
      <input className={styles.inputs} name={name} value={value} onChange={onChange}  placeholder={nameField[name]} />
    </>
  );
};

const InputTextarea = ({ name, value, onChange }) => {
  return (
    <>
      <h5 className={styles.titleInputs}>{nameField[name]}</h5>
      <textarea className={styles.inputsTextarea} name={name} value={value} onChange={onChange}  placeholder={nameField[name]} />
    </>
  );
};

export default MovieEdit;
