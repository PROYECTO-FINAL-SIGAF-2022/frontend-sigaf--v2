import React from 'react'
import logo from '../../pages/Landing/styles/img/Logo/logo 15.png'
import { Link } from 'react-router-dom'
const NavbarLanding = () => {
  return (
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
                {/* <!-- <a href="#" class="btn btn-outline-secondary shadow-sm d-sm d-block">Try for free</a> --> */}
            </div>
        </div>
    </nav>
  )
}

export default NavbarLanding