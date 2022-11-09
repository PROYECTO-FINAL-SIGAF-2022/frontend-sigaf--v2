import Footer from "../../components/layouts/Footer";
import LayoutContainer from "../../components/layouts/LayoutContainer";
import "./Maquinas.css";
import { useEffect, useState } from "react";

import Alerta from "../../components/layouts/Alerta";
import Loading from "../../components/layouts/Loading";

import { useFetch } from "../../hooks/useFetch";
import { URL } from "../../utils/getUrl";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Link } from "react-router-dom";


function Maquinas () {
  const [setConfigFetchMaquinas, fetchDataMaquinas, loadingMaquinas, errorMaquinas] = useFetch();
  

  const getMaquinas = () => {
    setConfigFetchMaquinas({
      url: `${URL}/maquinas`,
      headersRequest: {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    });
  };

  useEffect(() => {
    getMaquinas();
  }, []);

  const MySwal = withReactContent(Swal)
  const handleBounceIn = (id) => {
    id
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
        //console.log(id)
          setConfigFetchProductos({
            url: `${URL}/maquinas/${id}`,
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
          //console.log(resultClose)
          getProductos()
        })
       
      }
    })
  }

  return (
    <LayoutContainer>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div style={{ textAlign: "center" }}>
            <Link to="/formulario-maquinas">
              <button
                className="btn btn-success"
                style={{ position: "absolute", left: "80%" }}
              >
                + Maquina
              </button>
            </Link>
          </div>
          <br></br>
          <br></br>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="main-box clearfix">
                  <div className="table-responsive">
                    <table className="table user-list">
                      <thead>
                        <tr>
                          <th className="text-center">
                            <span>Maquina</span>
                          </th>
                          <th className="text-center">
                            <span>Precio</span>
                          </th>
                          <th className="text-center">
                            <span>Fecha de la compra</span>
                          </th>
                          <th className="text-center">
                            <span>Estado</span>
                          </th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                      {loadingMaquinas && <Loading />}

                      {errorMaquinas?.msg && (
                      <Alerta claseAlerta="danger" mensajeAlerta={errorMaquinas?.msg} />
                      )}
                        {
                        fetchDataMaquinas.length > 0 && (
                        <>
                        {
                          //key={proveedor.id_proveedor}
                          fetchDataMaquinas?.map(item => (
                              <tr key={item.id_maquina}>
                              <td>
                                <img
                                  src="https://pngimages.in/uploads/png-thumb/Tractor_png_photo_editing.png"
                                  alt=""
                                />
                                <a href="#" className="user-link">
                                 {item.descripcion_maquina}
                                </a>
                                <span className="user-subhead">Detalle</span>
                              </td>
                              <td className="text-center">
                                <span className="label label-default">
                                  {item.precio_adquisicion_maquina}
                                </span>
                              </td>
                              <td className="text-center">
                                <span className="label label-default">
                                  {item.fecha_adquisicion_maquina}
                                </span>
                              </td>
                              <td className="text-center">
                                <span className="label label-default" style={{textTransform: "uppercase", color: "green" }}>
                                    {item.tipo_adquisicion_maquina}
                                </span>
                              </td>
                              <td style={{ width: "20%" }}>
                                <a href="#" className="table-link">
                                  <span className="fa-stack">
                                    <i className="fa fa-square fa-stack-2x"></i>
                                    <i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                                  </span>
                                </a>
                                <a href="#" className="table-link">
                                  <span className="fa-stack">
                                    <i className="fa fa-square fa-stack-2x "></i>
                                    <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                  </span>
                                </a>
                                <a href="#" className="table-link danger" onClick={()=>{handleBounceIn(item?.id_maquina)}}>
                                  <span className="fa-stack">
                                    <i className="fa fa-square fa-stack-2x"></i>
                                    <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                  </span>
                                </a>
                              </td>
                            </tr>
                              ))
                            }
                            </>
                            )
                        }
                        
                      </tbody>
                    </table>
                  </div>
                  <br></br>
                  <br></br>
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
        </div>
        <Footer />
        <div className="content-backdrop fade"></div>
      </div>
    </LayoutContainer>
  );
}

export default Maquinas;
