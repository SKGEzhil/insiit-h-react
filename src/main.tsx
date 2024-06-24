import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createStore} from "redux";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import questionSlice from "./store/slices/questionSlice.ts";

// const store = createStore(reducers);

const store = configureStore({
    reducer: {
        questionSlice: questionSlice
    }
})

export type AppDispatch = typeof store.dispatch;


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
    <App />
      </Provider>
  </React.StrictMode>,
)
