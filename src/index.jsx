import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App.jsx'
import {Provider} from "react-redux";
import {store} from "./store/index.js";
import {Toaster} from "react-hot-toast";
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
      <Toaster/>
    </Provider>
  </React.StrictMode>,
)
