import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import HomePage from './pages/HomePage';
import Store from './store'

ReactDOM.render(
    <Store.Provider>
        <HomePage/>
    </Store.Provider>
    , document.getElementById('root'));

