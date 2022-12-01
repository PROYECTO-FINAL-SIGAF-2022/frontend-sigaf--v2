import React from 'react'

import './styles/style.css'
import img1 from './styles/img/hero-img.png'
import img2 from './styles/img/icons/icons-2.svg'
import img3 from './styles/img/icons/icons-3.svg'
import img4 from './styles/img/icons/icons-1.svg'
import img5 from './styles/img/image2.png'
import img6 from './styles/img/image1.png'
import img7 from './styles/img/image4.png'
import img8 from './styles/img/offer1.png'
import img9 from './styles/img/offer2.png'
import img10 from './styles/img/offer3.png'
import about from './styles/img/about.png'
import NavbarLanding from '../../components/layouts/NavbarLanding'
import { Link } from 'react-router-dom'
const Landing = () => {
  return (
  <div className='contenedorSigafLandingPage'>
    <div className="container">
     
   <NavbarLanding/>
    <section class="hero">
        <div class="container">
            <div class="contenedorLandingSIGAF">
                <div class="row">
                
                    <div class="col-md-6">
                        <div class="text">
                            <span>Bienvenido a</span>
                          <h1 class="tituloSigaf">SIGAF</h1>
                          <p class="subTituloSigaf">Una moderna herramienta computacional al servicio del agricultor, 
                            cuyo uso tiene como objetivo mejorar y acelerar el acceso de la información, 
                            elemento esencial para la oportuna toma de decisiones en la gestión agropecuaria. </p>
                        </div>
                        <div class="buttons">
                            <Link to="/auth"  class="btn btn-success">Iniciar Sesion</Link>
                           {/* <!--  <a href="#" class="btn btn-outline-secondary ms-3">Live preview</a> --> */}
                        </div>
                    </div>
                   
                    <div class="col-md-6">
                        <img src={img1} alt="hero-img" class="w-100"/>
                    </div>
                </div>
            </div>
        </div>
    </section>

    

    <div class="offer">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="title">
                        <h2>Modulos <br></br><strong class="black"> Del Sistema</strong></h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="offer-bg">
            <div class="container">
                <div class="row">
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 ">
                        <div class="offer_box">
                            <h3 class="offer_h3">Establecimientos</h3>
                            <figure><img src={img5} alt="img" /></figure>
                            <p class="offer_p">Sigaf organiza todos los datos por establecimiento de esta forma la información es presentada de una forma mas ordenada</p>

                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 margin_ttt">
                        <div class="offer_box">
                            <h3 class="offer_h3">Mapa</h3>
                            <figure><img src={img6} alt="img" /></figure>
                            <p class="offer_p">Los productores podran georeferenciar sus establecimiento, junto a sus parcelas con datos como: la superficie y los cultivos que se encuentran en dicha parcela...</p>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 margin-lkk">
                        <div class="offer_box">
                            <h3 class="offer_h3">Configuraciones</h3>
                            <figure><img src={img7} alt="img" /></figure>
                            <p class="offer_p">Se podran registrar , editar y eliminar datos relacionados con las maquinas , personal, productos, proveedores, actividades, almacenes del establecimiento...</p>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <a class="read-more">Leer Más</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
    <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
    <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
    
    <div id="about" class="about">
        <div class="container">
            <div class="row">

                <div class="col-xl-5 col-lg-5 col-md-5 co-sm-l2">
                    <div class="about_box">
                        {/* <h2>SIGAF<br></br><strong class="black"> Sistema Integrado de Gestión Agropecuaria Formoseña</strong></h2> */}
                        <h2><strong class="black"> Sistema Integrado de Gestión Agropecuaria Formoseña</strong></h2>
                        <p>
                        El sistema cuenta con varios módulos diferenciados de acuerdo a la actividad, para mantener un control ordenado y simple. 
                        Cada módulo tiene sus funciones específicas que permiten que nada quede librado al azar. Con este sistema el productor va a poder realizar 
                        a un solo click de distancia, cambios y actualizaciones que puedan surgir en el establecimiento.
                        Además también lo que se busca es poder cubrir con la trazabilidad completa de las actividades realizadas por los mismos

                        </p>
                        <a href="#">Leer Más</a>
                    </div>
                </div>
                <div class="col-xl-7 col-lg-7 col-md-7 co-sm-l2">
                    <div class="about_img">
                        <figure><img src={about} alt="img" /></figure>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* <section class="setup">
        <div class="container">
            <div class="text-header text-center">
                <h3>Funcionades del sistema</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
            </div>
            <div class="items text-center">
                <div class="row">
                    <div class="col-md-4">
                        <div class="icons">
                            <img src={img4} alt="icons"/>
                        </div>
                        <div class="desc">
                            <h5>Create account</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae quas voluptate
                                temporibus velit recusandae nemo</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="icons">
                            <img src={img2} alt="icons"/>
                        </div>
                        <div class="desc">
                            <h5>Setup your design</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae quas voluptate
                                temporibus velit recusandae nemo</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="icons">
                            <img src={img3} alt="icons"/>
                        </div>
                        <div class="desc">
                            <h5>Publish your work</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae quas voluptate
                                temporibus velit recusandae nemo</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="information">
        <div class="container">
            <div class="row info-1">
             
                <div class="col-md-6">
                    <div class="text-information">
                        <h5>Seleccionar un establecimiento</h5>
                        <p>Sigaf organiza todos los datos por establecimiento de esta forma la información es presentada de una forma mas ordenada.</p>
                    </div>
                </div>
             
                <div class="col-md-6">
                    <img src={img5} alt="img-1" class="w-100"/>
                </div>
            </div>
            <div class="row info-2">
            
                <div class="col-md-6">
                    <img src={img6} alt="img-2" class="w-100"/>
                </div>
               
                <div class="col-md-6">
                    <div class="text-information">
                        <h5>Modulo De Mapas</h5>
                        <p>Los productores podran georeferenciar sus establecimiento, junto a sus parcelas con datos como: la superficie y los cultivos que se encuentran en dicha parcela...</p>
                    </div>
                </div>
                
                <div class="row info-1">
                <div Align= "center">
                    <img src={img7} alt="img-1"  style={{ width: '75%'}}/>
                </div>
            </div>
            </div>
        </div>
    </section> */}
    
    
    </div>
  </div>
  )
}

export default Landing