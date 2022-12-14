import React, { useState, useCallback, useRef, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import "./styles/style.css";
import img1 from "./styles/img/hero-img.png";
import img2 from "./styles/img/icons/icons-2.svg";
import img3 from "./styles/img/icons/icons-3.svg";
import img4 from "./styles/img/icons/icons-1.svg";
import img5 from "./styles/img/image2.png";
import img6 from "./styles/img/image1.png";
import img7 from "./styles/img/image4.png";
import img8 from "./styles/img/offer1.png";
import img9 from "./styles/img/offer2.png";
import img10 from "./styles/img/offer3.png";
import about from "./styles/img/about.png";
import NavbarLanding from "../../components/layouts/NavbarLanding";
import NavbarLanding2 from "../../components/layouts/NavbarLanding2";
import { Link } from "react-router-dom";

import Carousel from "react-bootstrap/Carousel";

import perfil1 from "./styles/img/Team/img-7.png";
import perfil2 from "./styles/img/Team/img-8.png";
import perfil3 from "./styles/img/Team/img-9.png";
import perfil4 from "./styles/img/Team/img-10.png";
import perfil5 from "./styles/img/Team/img-11.png";
import headerSVG from "./styles/img/icons/header-shape.svg";

import about2 from "./styles/img/about-img.jpg";
import portada1 from "./styles/img/Nueva carpeta/Portada1.png";
import portada2 from "./styles/img/Nueva carpeta/Portada3.png";
import imgTec from "./styles/img/Carrusel/Compo.png";
import imgTec2 from "./styles/img/Carrusel/Agricultura.png";
import imgTec3 from "./styles/img/Carrusel/Agricultura2.png";
import imgTec4 from "./styles/img/Carrusel/Agricultura3.png";
import imgTec5 from "./styles/img/Carrusel/Compu.png";
const Landing = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const [classActivo0, setClassActivo0] = useState();
  const [classActivo1, setClassActivo1] = useState();
  const [classActivo2, setClassActivo2] = useState();
  const [classActivo3, setClassActivo3] = useState();
  const [classActivo4, setClassActivo4] = useState();

  const carrusel = useRef();

  const [index, setIndex] = useState(0);

  const cambiarCarrusel = (num) => {
    switch (num) {
      case 0:
        setClassActivo0("active");
        setClassActivo1("");
        setClassActivo2("");
        setClassActivo3("");
        setClassActivo4("");
        setIndex(0);
        break;
      case 1:
        setClassActivo0("");
        setClassActivo1("active");
        setClassActivo2("");
        setClassActivo3("");
        setClassActivo4("");
        setIndex(1);
        break;
      case 2:
        setClassActivo0("");
        setClassActivo1("");
        setClassActivo2("active");
        setClassActivo3("");
        setClassActivo4("");
        setIndex(2);
        break;
      case 3:
        setClassActivo0("");
        setClassActivo1("");
        setClassActivo2("");
        setClassActivo3("active");
        setClassActivo4("");
        setIndex(3);
        break;
      case 4:
        setClassActivo0("");
        setClassActivo1("");
        setClassActivo2("");
        setClassActivo3("");
        setClassActivo4("active");
        setIndex(4);
        break;
      default:
        setClassActivo0("active");
        setClassActivo1("");
        setClassActivo2("");
        setIndex(0);
    }
  };
  console.log(index);

  return (
    <div className="contenedorSigafLandingPage">
      <div className="">
        <header class="header-area">
          <NavbarLanding2 />

          <div
            id="home"
            class="header-hero bg_cover"
            style={{
              backgroundImage: `url(https://i0.wp.com/www.elsol.com.ar/wp-content/uploads/2021/06/1530101016258Agricultura.jpg?fit=2125%2C1414&ssl=1)`,
            }}
          >
            <div class="container">
              <div class="row justify-content-center">
                <div class="">
                  {" "}
                  {/* col-xl-8 col-lg-10 */}
                  <div class="header-content text-center">
                    {/* <h3 class="header-title">Handcrafted Landing Page for Startups and SaaS Businesses</h3>
                            <p class="text">A simple, customizable, and, beautiful SaaS business focused landing page to make your project closer to launch!</p> */}
                    <section class="">
                      <div class="">
                        <div class="contenedorLandingSIGAF">
                          <div class="row">
                            <div class="col-md-6">
                              <div class="header-title">
                                <span>Bienvenido a</span>
                                <h1 class="tituloSigaf">SIGAF</h1>
                                <p class="subTituloSigaf">
                                  Una moderna herramienta computacional al
                                  servicio del agricultor, cuyo uso tiene como
                                  objetivo mejorar y acelerar el acceso de la
                                  información, elemento esencial para la
                                  oportuna toma de decisiones en la gestión
                                  agropecuaria.{" "}
                                </p>
                              </div>
                              <div class="buttons">
                                <Link to="/auth" class="btn btn-success">
                                  Ver Mas
                                </Link>
                                {/* <!--  <a href="#" class="btn btn-outline-secondary ms-3">Live preview</a> --> */}
                              </div>
                            </div>

                            <div class="col-md-6 ">
                              <img src={img1} alt="hero-img" class="w-100" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
            <div class="header-shape">
              <img src={headerSVG} alt="shape" />
            </div>
          </div>
        </header>

        <div id="features-two" class="section" style={{overflow: "hidden"}}>
          <div class="container">
            <div class="row" data-aos="fade-right">
              <div class="col-lg-6 col-md-12 col-sm-12">
                <div class="img-thumb wow fadeInLeft" data-wow-delay="0.3s">
                  <img
                    class="img-fluid"
                    src={portada1}
                    alt=""
                    style={{ borderRadius: "15%" }}
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-12 col-sm-12">
                <div class="text-wrapper wow fadeInRight" data-wow-delay="0.6s">
                  <div>
                    <h3>¡ El registro de sus actividades diarias !</h3>
                    <p className="">
                      Normalmente se utilizan herramientas como Excel o el mismo
                      Papel y Lápiz
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt" data-aos="fade-left" >
              <div class="col-lg-6 col-md-12 col-sm-12">
                <div class="text-wrapper wow fadeInRight" data-wow-delay="0.9s">
                  <div>
                    <h3>¿ Qué pasaría ?</h3>
                    <p>
                    Encontrarlo puede llegar a ser engorroso y/o puede llevar mucho tiempo
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-12 col-sm-12" >
                <div class="img-thumb wow fadeInLeft" data-wow-delay="1.2s">
                  <img
                    class="img-fluid"
                    src={portada2}
                    alt=""
                    style={{ borderRadius: "15%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <br></br>
        {/* TEAM */}
        <section class="hero">
          <div class="team_section layout_padding">
            <div class="container">
              <h1 class="what_taital">EQUIPO SIGAF</h1>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <div class="team_section_2 layout_padding">
                <div class="row">
                <div
                    class="col-sm-2"
                    data-aos="fade-right"
                    data-aos-offset="400"
                    data-aos-easing="ease-in-sine"
                  >
                    <img src={perfil4} class="image_7" />
                    <p class="readable_text">Centurion Agustin</p>
                  </div>
                  <div
                    class="col-sm-2"
                    data-aos="fade-right"
                    data-aos-offset="400"
                    data-aos-easing="ease-in-sine"
                  >
                    <img src={perfil1} class="image_7" />
                    <p class="readable_text">Brito Enzo </p>
                  </div>
                  <div
                    class="col-sm-2"
                    data-aos="fade-right"
                    data-aos-offset="400"
                    data-aos-easing="ease-in-sine"
                  >
                    <img src={perfil4} class="image_7" />
                    <p class="readable_text">Delgado Federico</p>
                  </div>
                  <div
                    class="col-sm-2"
                    data-aos="fade-right"
                    data-aos-offset="400"
                    data-aos-easing="ease-in-sine"
                  >
                    <img src={perfil5} class="image_7" />
                    <p class="readable_text">Bogarin Sebastian</p>
                  </div>   
                  <div
                    class="col-sm-2"
                    data-aos="fade-right"
                    data-aos-offset="400"
                    data-aos-easing="ease-in-sine"
                  >
                    <img src={perfil3} class="image_7" />
                    <p class="readable_text">Franco Marcos</p>
                  </div>
                  <div
                    class="col-sm-2"
                    data-aos="fade-right"
                    data-aos-offset="400"
                    data-aos-easing="ease-in-sine"
                  >
                    <img src={perfil2} class="image_7" />
                    <p class="readable_text">Rojas Daniel</p>
                  </div>

                  
                  
                </div>
              </div>
            </div>
          </div>
        </section>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div class="content"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom">
          <div class="">
            <h2 class="my-5 text-center">SIGAF</h2>
            <div class="slider-92911">
              <div class="">
                <Carousel
                  interval={null}
                  ref={carrusel}
                  activeIndex={index}
                  nextIcon={false}
                  prevIcon={false}
                >
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={imgTec3}
                      alt="Second slide"
                    />

                    <Carousel.Caption>
                      <h3 style={{fontSize:"40px" }}>El productor y la complejidad de la gestión de sus establecimientos</h3>
                     
                    </Carousel.Caption>
                  </Carousel.Item>

                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={imgTec}
                      alt="Second slide"
                    />
                    <Carousel.Caption>
                      <h1 style={{fontSize:"40px" }}>Información, requerimientos y decisiones </h1>
                      
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={imgTec2}
                      alt="Second slide"
                    />

                    <Carousel.Caption>
                      <h3 style={{fontSize:"40px" }}>A partir de numerosas entrevistas a
productores de la región, y comprendiendo sus necesidades</h3>
                      
                    </Carousel.Caption>
                  </Carousel.Item>
                  
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={imgTec4}
                      alt="Second slide"
                    />

                    <Carousel.Caption>
                      <h3 style={{fontSize:"40px" }}>¿ Por qué lo hacen de esta forma ?</h3>
                     
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={imgTec5}
                      alt="Second slide"
                    />

                    {/* <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </Carousel.Caption> */}
                  </Carousel.Item>
                </Carousel>

                <div class="my-5 text-center">
                  <ul class="thumbnail">
                    <li class={classActivo0}>
                      <a
                        onClick={() => {
                          cambiarCarrusel(0);
                        }}
                      >
                        <img src={img1} alt="Image" class="img-fluid" />
                      </a>
                    </li>
                    <li class={classActivo1}>
                      <a
                        onClick={() => {
                          cambiarCarrusel(1);
                        }}
                      >
                        <img src={img1} alt="Image" class="img-fluid" />
                      </a>
                    </li>
                    <li class={classActivo2}>
                      <a
                        onClick={() => {
                          cambiarCarrusel(2);
                        }}
                      >
                        <img src={img1} alt="Image" class="img-fluid" />
                      </a>
                    </li>
                    <li class={classActivo3}>
                      <a
                        onClick={() => {
                          cambiarCarrusel(3);
                        }}
                      >
                        <img src={img1} alt="Image" class="img-fluid" />
                      </a>
                    </li>
                    <li class={classActivo4}>
                      <a
                        onClick={() => {
                          cambiarCarrusel(4);
                        }}
                      >
                        <img src={img1} alt="Image" class="img-fluid" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="offer">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="title">
                  <h2>
                    Modulos <br></br>
                    <strong class="black"> Del Sistema</strong>
                  </h2>
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
                    <figure>
                      <img src={img5} alt="img" />
                    </figure>
                    <p class="offer_p">
                      Sigaf organiza todos los datos por establecimiento de esta
                      forma la información es presentada de una forma mas
                      ordenada
                    </p>
                  </div>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 margin_ttt">
                  <div class="offer_box">
                    <h3 class="offer_h3">Mapa</h3>
                    <figure>
                      <img src={img6} alt="img" />
                    </figure>
                    <p class="offer_p">
                      Los productores podran georeferenciar sus establecimiento,
                      junto a sus parcelas con datos como: la superficie y los
                      cultivos que se encuentran en dicha parcela...
                    </p>
                  </div>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 margin-lkk">
                  <div class="offer_box">
                    <h3 class="offer_h3">Configuraciones</h3>
                    <figure>
                      <img src={img7} alt="img" />
                    </figure>
                    <p class="offer_p">
                      Se podran registrar , editar y eliminar datos relacionados
                      con las maquinas , personal, productos, proveedores,
                      actividades, almacenes del establecimiento...
                    </p>
                  </div>
                </div>

                <div class="col-md-12">
                  <a class="read-more">Leer Más</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div id="about" class="about">
          <div class="container">
            <div class="row">
              <div class="col-xl-5 col-lg-5 col-md-5 co-sm-l2">
                <div class="about_box">
                  {/* <h2>SIGAF<br></br><strong class="black"> Sistema Integrado de Gestión Agropecuaria Formoseña</strong></h2> */}
                  <h2>
                    <strong class="black">
                      {" "}
                      Sistema Integrado de Gestión Agropecuaria Formoseña
                    </strong>
                  </h2>
                  <p>
                    El sistema cuenta con varios módulos diferenciados de
                    acuerdo a la actividad, para mantener un control ordenado y
                    simple. Cada módulo tiene sus funciones específicas que
                    permiten que nada quede librado al azar. Con este sistema el
                    productor va a poder realizar a un solo click de distancia,
                    cambios y actualizaciones que puedan surgir en el
                    establecimiento. Además también lo que se busca es poder
                    cubrir con la trazabilidad completa de las actividades
                    realizadas por los mismos
                  </p>
                  <a href="#">Leer Más</a>
                </div>
              </div>
              <div class="col-xl-7 col-lg-7 col-md-7 co-sm-l2">
                <div class="about_img">
                  <figure>
                    <img src={about} alt="img" />
                  </figure>
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
  );
};

export default Landing;
