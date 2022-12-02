import React, { useEffect } from 'react'
import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalHeader,
    MDBModalTitle,
  } from "mdb-react-ui-kit";

import { useFetch } from "../../../hooks/useFetch";
import { URL } from "../../../utils/getUrl";

const DetallesModal = ({
    optSmModalDetalles,setOptSmModalDetalles,toggleShowDetalles, item
}) => {

  const [setConfigFetchActividad, fetchDataActividades] = useFetch()
  const [setConfigFetchMaquina, fetchDataMaquina] = useFetch()
  const [setConfigFetchEmpleado, fetchDataEmpleado] = useFetch()
  const [setConfigFetchProducto, fetchDataProducto] = useFetch()
  
  useEffect(()=>{
    setConfigFetchActividad({
      url: `${URL}/actividades/${item?.id_actividad}`,
      headersRequest: {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    });
    setConfigFetchMaquina({
      url: `${URL}/maquinas/${item?.id_maquina}`,
      headersRequest: {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    });
    setConfigFetchEmpleado({
      url: `${URL}/usuarios/${item?.id_usuario}`,
      headersRequest: {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    });
    setConfigFetchProducto({
      url: `${URL}/productos/${item?.id_producto}`,
      headersRequest: {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    });


  },[item])


  return (
    <MDBModal
    staticBackdrop
    stabindex="-1"
    show={optSmModalDetalles}
    setShow={setOptSmModalDetalles}
  >
    <MDBModalDialog centered>
      <MDBModalContent>
        <MDBModalHeader>
          <MDBModalTitle>
            Detalles de la actividad
          </MDBModalTitle>
          <MDBBtn
            className="btn-close"
            color="none"
            onClick={toggleShowDetalles}
          ></MDBBtn>
        </MDBModalHeader>
        <MDBModalBody>
        <div >
              <div className="d-flex justify-content-start">
                
                <div className="userData ml-3 mx-4 my-4">
                <h6 className="d-block">
                    <a href="#">Nombre de la actividad</a>{" "}
                  </h6>
                  <h2
                    className="d-block"
                    style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                  >
                    <a href="#">{fetchDataActividades?.descripcion_actividad}</a>
                  </h2>
                  {/* <h6 className="d-block"><a href="#">300</a> Blog Posts</h6> */}
                </div>
                <div className="ml-auto">
                  <input
                    type="button"
                    className="btn btn-primary d-none"
                    id="btnDiscard"
                    value="Discard Changes"
                  />
                </div>
              </div>

              <div className="row">
                <div className="">
                  <div className="tab-content ml-1" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="basicInfo"
                      role="tabpanel"
                      aria-labelledby="basicInfo-tab"
                    >
                      <div className="row">
                        <div className="">
                          <label style={{ fontWeight: "bold" }}>
                            Fecha de la actividad:
                          </label>
                        </div>
                        <div className="col-md-8 col-6">
                       {item?.fecha_historial}
                        </div>
                      </div>
                      <hr />

                      <div className="row">
                        <div className="">
                          <label style={{ fontWeight: "bold" }}>
                            Empleado a cargo de la actividad:
                          </label>
                        </div>
                        <div className="col-md-8 col-6">
                          {fetchDataEmpleado?.nombre_persona} {fetchDataEmpleado?.apellido_persona}
                        </div>
                      </div>
                      <hr />    
                      <div className="row">
                        <div className="">
                          <label style={{ fontWeight: "bold" }}>
                            Producto a utilizar:
                          </label>
                        </div>
                        <div className="col-md-8 col-6">
                       {fetchDataProducto?.descripcion_producto}, Cantidad aplicada: {item?.cantidad_uso_producto}
                        </div>
                      </div>
                      <hr />  
                      <div className="row">
                        <div className="">
                          <label style={{ fontWeight: "bold" }}>
                            Maquina:
                          </label>
                        </div>
                        <div className="col-md-8 col-6">
                       {fetchDataMaquina?.descripcion_maquina}
                        </div>
                      </div>
                      <hr />          
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </MDBModalBody>
      </MDBModalContent>
    </MDBModalDialog>
  </MDBModal>
  )
}

export default DetallesModal