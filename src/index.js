import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import './scss/index.scss'
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store'
import {Provider } from 'react-redux'
// import "./NavBar.css";
import "./css/style.css"
import "react-multi-carousel/lib/styles.css";
import "react-phone-input-2/lib/style.css";
import "react-lazy-load-image-component/src/effects/blur.css";

const renderMethod = module.hot ?ReactDOM.render :ReactDOM.hydrate;
renderMethod(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);
// serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
