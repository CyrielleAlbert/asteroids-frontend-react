import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Home, AsteroidDetailsPage } from './src/pages';
import './src/index.css';
import * as Router from './src/router';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Navigate to={Router.path.home} />} />
        <Route path={Router.path.home} element={<Home />} />
        <Route path={Router.path.asteroid} element={<AsteroidDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};
