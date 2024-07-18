import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux";
import {store} from "./store/store.ts";

// const store = createStore(reducers);


// export type AppDispatch = typeof store.dispatch;

/**
 * Renders the App component to the root element in the DOM
 * @function Main
 * @param {HTMLElement} root - The root element in the DOM
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
    <App />
      </Provider>
  </React.StrictMode>,
)
