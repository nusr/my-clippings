import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from '../pages/HomePage';
import Store from '../store'

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Store.Provider><HomePage/></Store.Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});
