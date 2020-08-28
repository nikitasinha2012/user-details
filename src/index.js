import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Routes } from './routes';
ReactDOM.render( <div>
    <Routes />
   </div>,document.getElementById('root'));
serviceWorker.unregister();
