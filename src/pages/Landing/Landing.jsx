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
import perfil6 from "./styles/img/Team/img-12.png";
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

  const [classNameActivo0, setclassNameActivo0] = useState();
  const [classNameActivo1, setclassNameActivo1] = useState();
  const [classNameActivo2, setclassNameActivo2] = useState();
  const [classNameActivo3, setclassNameActivo3] = useState();
  const [classNameActivo4, setclassNameActivo4] = useState();

  const carrusel = useRef();

  const [index, setIndex] = useState(0);

  const cambiarCarrusel = (num) => {
    switch (num) {
      case 0:
        setclassNameActivo0("active");
        setclassNameActivo1("");
        setclassNameActivo2("");
        setclassNameActivo3("");
        setclassNameActivo4("");
        setIndex(0);
        break;
      case 1:
        setclassNameActivo0("");
        setclassNameActivo1("active");
        setclassNameActivo2("");
        setclassNameActivo3("");
        setclassNameActivo4("");
        setIndex(1);
        break;
      case 2:
        setclassNameActivo0("");
        setclassNameActivo1("");
        setclassNameActivo2("active");
        setclassNameActivo3("");
        setclassNameActivo4("");
        setIndex(2);
        break;
      case 3:
        setclassNameActivo0("");
        setclassNameActivo1("");
        setclassNameActivo2("");
        setclassNameActivo3("active");
        setclassNameActivo4("");
        setIndex(3);
        break;
      case 4:
        setclassNameActivo0("");
        setclassNameActivo1("");
        setclassNameActivo2("");
        setclassNameActivo3("");
        setclassNameActivo4("active");
        setIndex(4);
        break;
      default:
        setclassNameActivo0("active");
        setclassNameActivo1("");
        setclassNameActivo2("");
        setIndex(0);
    }
  };
  console.log(index);

  return (
    <div className="contenedorSigafLandingPage">
      <div className="">
        <header className="header-area">
          <NavbarLanding2 />

          <div
            id="home"
            className="header-hero bg_cover"
            style={{
              backgroundImage: `url(https://i0.wp.com/www.elsol.com.ar/wp-content/uploads/2021/06/1530101016258Agricultura.jpg?fit=2125%2C1414&ssl=1)`,
            }}
          >
            <div className="container">
              <div className="row justify-content-center">
                <div className="">
                  {" "}
                  {/* col-xl-8 col-lg-10 */}
                  <div className="header-content text-center">
                    {/* <h3 className="header-title">Handcrafted Landing Page for Startups and SaaS Businesses</h3>
                            <p className="text">A simple, customizable, and, beautiful SaaS business focused landing page to make your project closer to launch!</p> */}
                    <section className="">
                      <div className="">
                        <div className="contenedorLandingSIGAF">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="header-title">
                                <span>Bienvenido a</span>
                                <h1 className="tituloSigaf">SIGAF</h1>
                                <p className="subTituloSigaf">
                                  Una moderna herramienta computacional al
                                  servicio del agricultor, cuyo uso tiene como
                                  objetivo mejorar y acelerar el acceso de la
                                  información, elemento esencial para la
                                  oportuna toma de decisiones en la gestión
                                  agropecuaria.{" "}
                                </p>
                              </div>
                              <div className="buttons">
                                <Link to="/auth" className="btn btn-success">
                                  Ver Mas
                                </Link>
                                {/* <!--  <a href="#" className="btn btn-outline-secondary ms-3">Live preview</a> --> */}
                              </div>
                            </div>

                            <div className="col-md-6 ">
                              <img src={img1} alt="hero-img" className="w-100" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
            <div className="header-shape">
              <img src={headerSVG} alt="shape" />
            </div>
          </div>
        </header>

        <div id="features-two" className="section" style={{overflow: "hidden"}}>
          <div className="container">
            <div className="row" data-aos="fade-right">
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="img-thumb wow fadeInLeft" data-wow-delay="0.3s">
                  <img
                    className="img-fluid"
                    src={portada1}
                    alt=""
                    style={{ borderRadius: "15%" }}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="text-wrapper wow fadeInRight" data-wow-delay="0.6s">
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
            <div className="row mt" data-aos="fade-left" >
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="text-wrapper wow fadeInRight" data-wow-delay="0.9s">
                  <div>
                    <h3>¿ Qué pasaría ?</h3>
                    <p>
                    Encontrarlo puede llegar a ser engorroso y/o puede llevar mucho tiempo
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12" >
                <div className="img-thumb wow fadeInLeft" data-wow-delay="1.2s">
                  <img
                    className="img-fluid"
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
        <section className="hero">
          <div className="team_section layout_padding">
            <div className="container">
              <h1 className="what_taital">EQUIPO SIGAF</h1>
              <h5 className="what_taital2">SISTEMA INTEGRADO DE GESTIÓN AGROPECUARIA FORMOSEÑO</h5>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <div className="team_section_2 layout_padding">
                <div className="row">
                <div
                    className="col-sm-2"
                    data-aos="fade-right"
                    data-aos-offset="400"
                    data-aos-easing="ease-in-sine"
                  >
                    <img src={perfil6} className="image_7" />
                    <p className="readable_text">Centurion Agustin</p>
                  </div>
                  <div
                    className="col-sm-2"
                    data-aos="fade-right"
                    data-aos-offset="400"
                    data-aos-easing="ease-in-sine"
                  >
                    <img src={perfil1} className="image_7" />
                    <p className="readable_text">Brito Enzo </p>
                  </div>
                  <div
                    className="col-sm-2"
                    data-aos="fade-right"
                    data-aos-offset="400"
                    data-aos-easing="ease-in-sine"
                  >
                    <img src={perfil4} className="image_7" />
                    <p className="readable_text">Delgado Federico</p>
                  </div>
                  <div
                    className="col-sm-2"
                    data-aos="fade-right"
                    data-aos-offset="400"
                    data-aos-easing="ease-in-sine"
                  >
                    <img src={perfil5} className="image_7" />
                    <p className="readable_text">Bogarin Sebastian</p>
                  </div>   
                  <div
                    className="col-sm-2"
                    data-aos="fade-right"
                    data-aos-offset="400"
                    data-aos-easing="ease-in-sine"
                  >
                    <img src={perfil3} className="image_7" />
                    <p className="readable_text">Franco Marcos</p>
                  </div>
                  <div
                    className="col-sm-2"
                    data-aos="fade-right"
                    data-aos-offset="400"
                    data-aos-easing="ease-in-sine"
                  >
                    <img src={perfil2} className="image_7" />
                    <p className="readable_text">Rojas Daniel</p>
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
        <div className="content"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom">
          <div className="">
            <h2 className="my-5 text-center">SIGAF</h2>
            <div className="slider-92911">
              <div className="">
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

                <div className="my-5 text-center">
                  <ul className="thumbnail">
                    <li className={classNameActivo0}>
                      <a
                        onClick={() => {
                          cambiarCarrusel(0);
                        }}
                      >
                        <img src={img1} alt="Image" className="img-fluid" />
                      </a>
                    </li>
                    <li className={classNameActivo1}>
                      <a
                        onClick={() => {
                          cambiarCarrusel(1);
                        }}
                      >
                        <img src={img1} alt="Image" className="img-fluid" />
                      </a>
                    </li>
                    <li className={classNameActivo2}>
                      <a
                        onClick={() => {
                          cambiarCarrusel(2);
                        }}
                      >
                        <img src={img1} alt="Image" className="img-fluid" />
                      </a>
                    </li>
                    <li className={classNameActivo3}>
                      <a
                        onClick={() => {
                          cambiarCarrusel(3);
                        }}
                      >
                        <img src={img1} alt="Image" className="img-fluid" />
                      </a>
                    </li>
                    <li className={classNameActivo4}>
                      <a
                        onClick={() => {
                          cambiarCarrusel(4);
                        }}
                      >
                        <img src={img1} alt="Image" className="img-fluid" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="offer">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="title">
                  <h2>
                    Modulos <br></br>
                    <strong className="black"> Del Sistema</strong>
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="offer-bg">
            <div className="container">
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 ">
                  <div className="offer_box">
                    <h3 className="offer_h3">Establecimientos</h3>
                    <figure>
                      <img src={img5} alt="img" />
                    </figure>
                    <p className="offer_p">
                      Sigaf organiza todos los datos por establecimiento de esta
                      forma la información es presentada de una forma mas
                      ordenada
                    </p>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 margin_ttt">
                  <div className="offer_box">
                    <h3 className="offer_h3">Mapa</h3>
                    <figure>
                      <img src={img6} alt="img" />
                    </figure>
                    <p className="offer_p">
                      Los productores podran georeferenciar sus establecimiento,
                      junto a sus parcelas con datos como: la superficie y los
                      cultivos que se encuentran en dicha parcela...
                    </p>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 margin-lkk">
                  <div className="offer_box">
                    <h3 className="offer_h3">Configuraciones</h3>
                    <figure>
                      <img src={img7} alt="img" />
                    </figure>
                    <p className="offer_p">
                      Se podran registrar , editar y eliminar datos relacionados
                      con las maquinas , personal, productos, proveedores,
                      actividades, almacenes del establecimiento...
                    </p>
                  </div>
                </div>

                <div className="col-md-12">
                  <a className="read-more">Leer Más</a>
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

        <div id="about" className="about">
          <div className="container">
            <div className="row">
              <div className="col-xl-5 col-lg-5 col-md-5 co-sm-l2">
                <div className="about_box">
                  {/* <h2>SIGAF<br></br><strong className="black"> Sistema Integrado de Gestión Agropecuaria Formoseña</strong></h2> */}
                  <h2>
                    <strong className="black">
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
              <div className="col-xl-7 col-lg-7 col-md-7 co-sm-l2">
                <div className="about_img">
                  <figure>
                    <img src={about} alt="img" />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <section className="setup">
        <div className="container">
            <div className="text-header text-center">
                <h3>Funcionades del sistema</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
            </div>
            <div className="items text-center">
                <div className="row">
                    <div className="col-md-4">
                        <div className="icons">
                            <img src={img4} alt="icons"/>
                        </div>
                        <div className="desc">
                            <h5>Create account</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae quas voluptate
                                temporibus velit recusandae nemo</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="icons">
                            <img src={img2} alt="icons"/>
                        </div>
                        <div className="desc">
                            <h5>Setup your design</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae quas voluptate
                                temporibus velit recusandae nemo</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="icons">
                            <img src={img3} alt="icons"/>
                        </div>
                        <div className="desc">
                            <h5>Publish your work</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae quas voluptate
                                temporibus velit recusandae nemo</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="information">
        <div className="container">
            <div className="row info-1">
             
                <div className="col-md-6">
                    <div className="text-information">
                        <h5>Seleccionar un establecimiento</h5>
                        <p>Sigaf organiza todos los datos por establecimiento de esta forma la información es presentada de una forma mas ordenada.</p>
                    </div>
                </div>
             
                <div className="col-md-6">
                    <img src={img5} alt="img-1" className="w-100"/>
                </div>
            </div>
            <div className="row info-2">
            
                <div className="col-md-6">
                    <img src={img6} alt="img-2" className="w-100"/>
                </div>
               
                <div className="col-md-6">
                    <div className="text-information">
                        <h5>Modulo De Mapas</h5>
                        <p>Los productores podran georeferenciar sus establecimiento, junto a sus parcelas con datos como: la superficie y los cultivos que se encuentran en dicha parcela...</p>
                    </div>
                </div>
                
                <div className="row info-1">
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
