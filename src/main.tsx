import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import questionSlice from "./store/slices/questionSlice.ts";
import navigationSlice from "./store/slices/navigationSlice.ts";

// const store = createStore(reducers);

const store = configureStore({
    reducer: {
        questionSlice: questionSlice,
        navigationSlice: navigationSlice
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
