import React from 'react'
import logo from '../../pages/Landing/styles/img/Logo/logo 17.png'
import { Link } from 'react-router-dom'
const NavbarLanding2 = () => {
  return (
    <div class="navgition navgition-transparent">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <nav class="navbar navbar-expand-lg">
            <a class="navbar-brand" href="#">
              <img src={logo} alt="Logo" style={{ width: '100px', height: '40px'}}/>
            </a>

            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarOne"
              aria-controls="navbarOne"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="toggler-icon"></span>
              <span class="toggler-icon"></span>
              <span class="toggler-icon"></span>
            </button>

            <div
              class="collapse navbar-collapse sub-menu-bar"
              id="navbarOne"
            >
              <ul class="navbar-nav m-auto">
                <li class="nav-item active">
                  <Link class="page-scroll" to="/landing">
                    INICIO
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="page-scroll" to="/auth">
                    INICIAR SESION
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="page-scroll" to="/registrarse">
                    REGISTRARSE
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
  )
}

export default NavbarLanding2

/* 
<nav class="navbar navbar-expand-lg">
        <div class="container">
            <Link to="/landing" class="navbar-brand">
                
                <img src={logo} alt="brand" style={{ width: '200px'}}/>
            </Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav ms-auto">
                    <Link to="/landing" class="nav-link active" aria-current="page" >Inicio</Link>
                    <Link to="/auth" class="nav-link" >Iniciar Sesion</Link>
                    <Link to="/registrarse" class="nav-link me-5" >Registrarse</Link>
                    
                </div>
           
                </div>
                </div>
            </nav>

*/

/* <div class="navgition navgition-transparent">
            <div class="container">
              <div class="row">
                <div class="col-lg-12">
                  <nav class="navbar navbar-expand-lg">
                    <a class="navbar-brand" href="#">
                      <img src="assets/images/logo.svg" alt="Logo" />
                    </a>

                    <button
                      class="navbar-toggler"
                      type="button"
                      data-toggle="collapse"
                      data-target="#navbarOne"
                      aria-controls="navbarOne"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span class="toggler-icon"></span>
                      <span class="toggler-icon"></span>
                      <span class="toggler-icon"></span>
                    </button>

                    <div
                      class="collapse navbar-collapse sub-menu-bar"
                      id="navbarOne"
                    >
                      <ul class="navbar-nav m-auto">
                        <li class="nav-item active">
                          <a class="page-scroll" href="#home">
                            INICIO
                          </a>
                        </li>
                        <li class="nav-item">
                          <a class="page-scroll" href="#service">
                            INICIAR SESION
                          </a>
                        </li>
                        <li class="nav-item">
                          <a class="page-scroll" href="#pricing">
                            REGISTRARSE
                          </a>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div> */