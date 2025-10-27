import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './Components.css' // Your new CSS file

import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom' // <-- 1. IMPORT THIS

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter> {/* <-- 2. WRAP YOUR <App /> */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)