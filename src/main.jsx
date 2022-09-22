import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App'
import { BrowserRouter } from "react-router-dom";
import Navbar from './components/layouts/Navbar';
import Rutas from './components/routes/Rutas'
import Menu from './pages/Menu';
//import Home from './pages/Home';
//import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
          <Menu/>
          <div class="layout-page">
            <Navbar/>
            <Rutas/> 
          </div>
        </div>
      </div>
    </BrowserRouter>
  </React.StrictMode>
)
