import Footer from "../../components/layouts/Footer";
import LayoutContainer from "../../components/layouts/LayoutContainer";
import "./Proveedor.css";

import { useEffect, useState } from "react";

import Alerta from "../../components/layouts/Alerta";
import Loading from "../../components/layouts/Loading";

import { useFetch } from "../../hooks/useFetch";
import { URL } from "../../utils/getUrl";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Proveedor () {
  const [setConfigFetchProveedores, fetchDataProveedores, loadingProveedores, errorProveedores] = useFetch();
  

  const getProveedores = () => {
    setConfigFetchProveedores({
      url: `${URL}/proveedores`,
      headersRequest: {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    });
  };

  useEffect(() => {
    getProveedores();
  }, []);

  //console.log(fetchDataProveedores)

  

  const MySwal = withReactContent(Swal)
  const handleBounceIn = (id) => {
    const idEliminar = id
    //console.log(idEliminar)
    return MySwal.fire({
      title: 'Seguro que lo quiere eliminar?',
      text: "Se eliminara permanentemente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar!',
    }).then((result) => {
      console.log(result.isDismissed)
      if (result.isConfirmed) {
        console.log(idEliminar)
          setConfigFetchProveedores({
            url: `${URL}/proveedores/${idEliminar}`,
            headersRequest: {
              method: "DELETE",
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
            }
          }); 
        Swal.fire(
          'Eliminado!',
          'El archivo fue eliminado.',
          'success'
        ).then((resultClose) => {
          console.log(resultClose)
          getProveedores()
        })
       
      }
    })
  }

  return (
    <LayoutContainer>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 mx-auto mb-4">
                <div className="section-title text-center ">
                {loadingProveedores && <Loading />}

                  {errorProveedores?.msg && (
                  <Alerta claseAlerta="danger" mensajeAlerta={errorProveedores?.msg} />
                  )}
                  <h3 className="top-c-sep">LISTA DE PROVEEDORES</h3>
                  <p>Descripcion de lo que sea Texto.</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-10 mx-auto">
                <div className="career-search mb-60">
                  <div className="filter-result">
                    <div className="d-md-flex text-capitalize ">
                      <p className="mb-30 ff-montserrat">
                        Total De Clientes : 
                      </p>
                    </div>
                    <div className="d-md-flex text-capitalize">
                      <Link to="/Formulario-proveedor" className="menu-link">
                        <button className="btn btn-infobtn  btn-outline-info">
                          Agregar Nuevo Cliente
                        </button>
                      </Link>
                    </div>
                    <br></br>
                    {
                        fetchDataProveedores.length > 0 && (
                        <>
                        {
                          //key={proveedor.id_proveedor}
                            fetchDataProveedores?.map(item => (
                              <div className="job-box d-md-flex align-items-center justify-content-between mb-30" key={item.id_proveedor}>
                              <div className="job-left my-4 d-md-flex align-items-center flex-wrap">
                                <div className="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                                  {/* Modo Ejemplo */}
                                  {item?.nombre_proveedor[0]}
                                  {item?.nombre_proveedor[10]}
                                </div>
                                <div className="job-content">
                                  <h5 className="text-md-left text-center">
                                    {item?.nombre_proveedor}
                                  </h5>
                                  <ul className="d-md-flex text-capitalize ff-open-sans">
                                    <li className="mr-md-4 mx-3">
                                      <i className="zmdi zmdi-pin mr-2"></i>{" "}
                                      {item?.direccion_proveedor}
                                    </li>
  
                                    <li className="mr-md-4">
                                      <i className="zmdi zmdi-smartphone mr-2"></i>{" "}
                                      +54
                                      {item?.telefono_proveedor}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="d-md-flex text-capitalize ff-open-sans">
                                
                                <Link className="btn  d-block w-100  btn-info mx-3"  to ={{pathname:'/actualizar-proveedor/' + item.id_proveedor}}
                                >
                                  Editar
                                </Link>
                                
                                <button
                                  className="btn  d-block w-100 btn-danger"
                                  onClick={()=>{handleBounceIn(item?.id_proveedor)}}
                                >
                                  Eliminar
                                </button>
                              </div>
                            </div>
                            ))
                        }
                        </>
                        )
                    }
                  </div>
                  
                </div>

                <nav aria-label="Page navigation">
                  <ul className="pagination pagination-reset justify-content-center">
                    <li className="page-item disabled">
                      <a
                        className="page-link"
                        href="#"
                        tabIndex="-1"
                        aria-disabled="true"
                      >
                        <i className="zmdi zmdi-long-arrow-left"></i>
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item d-none d-md-inline-block">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item d-none d-md-inline-block">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        ...
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        8
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        <i className="zmdi zmdi-long-arrow-right"></i>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <Footer />

        <div className="content-backdrop fade"></div>
      </div>
    </LayoutContainer>
  );
}

export default Proveedor;
