import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// import { store } from './compenents/app/store'
// import { Provider } from 'react-redux'

import {ApiProvider} from '@reduxjs/toolkit/query/react'
import {animalApi} from './compenents/api/apiSlice'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApiProvider api={animalApi} >
    <App />
    </ApiProvider>
  </React.StrictMode>,
)
