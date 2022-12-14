import Footer from "../../components/layouts/Footer";
import LayoutContainer from "../../components/layouts/LayoutContainer";
import "./Almacenes.css";
import { useEffect, useState } from "react";
import Alerta from "../../components/layouts/Alerta";
import Loading from "../../components/layouts/Loading";

import { useFetch } from "../../hooks/useFetch";
import { URL } from "../../utils/getUrl";

import { Link } from "react-router-dom";
import DetallesAlmacenesModal from "./ModalComponts/DetallesAlmacenesModal";
import UpdateAlmacenModal from "./ModalComponts/UpdateAlmacenModal";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
function Almacenes() {
  const [optSmModalDetalles, setOptSmModalDetalles] = useState(false);
  const [setConfigFetchAlmacenesDelete] = useFetch();
  const [optSmModalEdit, setOptSmModalEdit] = useState(false);

  const [datosAlmacen, setDatosAlmacen] = useState("");
  const [datosAlmacenEdit, setDatosAlmacenEdit] = useState("");

  const toggleShowDetalles = (item) => {
    //console.log(item)
    setDatosAlmacen(item);
    setOptSmModalDetalles(!optSmModalDetalles);
  };
  const toggleShowEdit = (item) => {
    // console.log(item)
      setDatosAlmacenEdit(item);
     setOptSmModalEdit(!optSmModalEdit);
     //console.log(item)
   };

  const [
    setConfigFetchAlmacen,
    fetchDataAlmacen,
    loadingAlmacen,
    errorAlmacen,
  ] = useFetch();

  const getAlmacen = () => {
    setConfigFetchAlmacen({
      url: `${URL}/almacenes`,
      headersRequest: {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    });
  };

  useEffect(() => {
    getAlmacen();
  }, []);

  const MySwal = withReactContent(Swal)
  const handleBounceIn = (id) => {
    
    //console.log(id)
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
      //console.log(result.isDismissed)
      if (result.isConfirmed) {
        //console.log(id)
        setConfigFetchAlmacenesDelete({
            url: `${URL}/almacenes/${id}`,
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
          getAlmacen()
        })
       
      }
    })
  }

  return (
    <LayoutContainer>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div style={{ textAlign: "center" }}>
            <Link to="/formulario-almacen">
              <button
                className="btn btn-success"
                style={{ position: "absolute", left: "80%" }}
              >
                + Almacen
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
                            <span>Nombre Del Almacen</span>
                          </th>
                          <th className="text-center">
                            <span>Fecha De Adquisicion </span>
                          </th>
                          <th className="text-center">
                            <span>Precio De Adquisicion</span>
                          </th>
                          <th className="text-center">
                            <span>Tipo De Adquisicion</span>
                          </th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loadingAlmacen && <Loading />}
                        {errorAlmacen?.msg && (
                          <Alerta
                            claseAlerta="danger"
                            mensajeAlerta={errorAlmacen?.msg}
                          />
                        )}
                        {fetchDataAlmacen?.length > 0 && (
                          <>
                            {
                              //key={proveedor.id_proveedor}
                              fetchDataAlmacen?.map((item) => {
                                let options = {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                };
                                
                                const fecha = new Date(item?.fecha_adquisicion);
                                const fechaConvertida = fecha.toLocaleDateString(
                                  "es-ES",
                                  options
                                );

                                return(
                                  <tr>
                                  <td>
                                    <img
                                      src="https://www.pngmart.com/files/3/Warehouse-PNG-Transparent-Image.png"
                                      alt=""
                                    />
                                    <a href="#" className="user-link">
                                      {item?.descripcion_almacen}
                                    </a>
                                    <span className="user-subhead">
                                      Detalle
                                    </span>
                                  </td>
                                  <td className="text-center">
                                    <span className="label label-default">
                                    {fechaConvertida}
                                    </span>
                                  </td>
                                  <td className="text-center">
                                    <span className="label label-default">
                                      $ {item?.precio_adquisicion}
                                    </span>
                                  </td>
                                  <td className="text-center">
                                    <span className="label label-default" style={{textTransform: "uppercase", color: "green" }}>
                                      {item?.tipo_adquisicion}
                                    </span>
                                  </td>
                                  <td style={{ width: "20%" }}>
                                    <a href="#" className="table-link" onClick={() => {
                                    toggleShowDetalles(item);
                                  }}>
                                      <span className="fa-stack">
                                        <i className="fa fa-square fa-stack-2x"></i>
                                        <i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                                      </span>
                                    </a>
                                    <a href="#" className="table-link" onClick={()=>{
                                      toggleShowEdit(item)
                                    }}>
                                      <span className="fa-stack">
                                        <i className="fa fa-square fa-stack-2x "></i>
                                        <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                      </span>
                                    </a>
                                    <a href="#" className="table-link danger" onClick={()=>{handleBounceIn(item?.id_almacen)}}>
                                      <span className="fa-stack">
                                        <i className="fa fa-square fa-stack-2x"></i>
                                        <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                      </span>
                                    </a>
                                  </td>
                                </tr>
                                )
                              })
                            }
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <UpdateAlmacenModal
                  optSmModalEdit={optSmModalEdit}
                  setOptSmModalEdit={setOptSmModalEdit}
                  toggleShowEdit={toggleShowEdit}
                  datosAlmacen = {datosAlmacenEdit}
                  getAlmacen = {getAlmacen}
                  />
                  <DetallesAlmacenesModal
                  optSmModalDetalles={optSmModalDetalles}
                  setOptSmModalDetalles={setOptSmModalDetalles}
                  toggleShowDetalles={toggleShowDetalles}
                  item={datosAlmacen}
                  />
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

export default Almacenes;
