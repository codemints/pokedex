import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CardProvider } from '@src/CardContext'

import '@scss/main.scss'
import '@ico/font-awesome/scss/fontawesome.scss'
import '@ico/font-awesome/scss/regular.scss'
import '@ico/font-awesome/scss/solid.scss'
import '@ico/font-awesome/scss/brands.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CardProvider>
      <App />
    </CardProvider>
  </React.StrictMode>
)
