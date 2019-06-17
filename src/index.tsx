import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import HomePage from './pages/HomePage';
import Store from './store'
import {LanguageMap} from "./i18n";
import {getChromeLang} from "./store/chrome";

async function initLang() {
    const language = await getChromeLang() || LanguageMap.enUS
    ReactDOM.render(
        <Store.Provider initialState={language}>
            <HomePage/>
        </Store.Provider>
        , document.getElementById('root'));
}

initLang()
