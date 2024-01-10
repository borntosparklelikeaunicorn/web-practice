import React from 'react';
import 'normalize.css';
import './App.module.scss';
import {Main} from '../Main/Main';
import {Routes, Route} from 'react-router-dom';
import MovieInfo from '../../pages/MovieInfo/MovieInfo';
import MovieEdit from '../../pages/MovieEdit/MovieEdit';
import MovieNotSelected from '../../pages/MovieNotSelected/MovieNotSelected';

function App() {
  return (
    <Routes>
      <Route element={<Main />} path={'/*'}>
        <Route path={'movie/:id'} element={<MovieInfo />}></Route>
        <Route path={'movie/:id/edit'} element={<MovieEdit />}></Route>
        <Route path={'movie/create'} element={<MovieEdit />}></Route>
        <Route path={'movie'} element={<MovieNotSelected />}></Route>
        <Route path={''} element={<MovieNotSelected />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
