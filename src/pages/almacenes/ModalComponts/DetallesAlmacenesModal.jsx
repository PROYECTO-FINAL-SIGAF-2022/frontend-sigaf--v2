import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";

import "./ModalDetalles.css";

import { useEffect, useState } from "react";
const DetallesAlmacenesModal = ({
  item,
  optSmModalDetalles,
  setOptSmModalDetalles,
  toggleShowDetalles,
}) => {
  //console.log(item)
  const [fechaAdquisicionState, setFechaAdquisicionState] = useState("");
  useEffect(() => {
    var fechaAdquisicion = new Date(item.fecha_adquisicion);
    setFechaAdquisicionState(fechaAdquisicion.toLocaleDateString());
  });

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
            <MDBModalTitle>Ver Detalles Del Almacen:</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={toggleShowDetalles}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <div >
              <div className="d-flex justify-content-start">
                <div className="image-container">
                  <img
                    src="https://www.pngmart.com/files/3/Warehouse-PNG-Transparent-Image.png"
                    id="imgProfile"
                    style={{ width: "150px", height: "150px" }}
                    className="img-thumbnail"
                  />
                </div>
                <div className="userData ml-3 mx-4 my-4">
                  <h2
                    className="d-block"
                    style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                  >
                    <a href="#">{item.descripcion_almacen}</a>
                  </h2>
                  <h6 className="d-block">
                    <a href="#">Tipo Adquisicion:</a>{" "}
                    <strong style={{ textTransform: "uppercase" }}>
                      {item.tipo_adquisicion}
                    </strong>
                  </h6>
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
                            Fecha de Adquisicion:
                          </label>
                        </div>
                        <div className="col-md-8 col-6">
                          {fechaAdquisicionState}
                        </div>
                      </div>
                      <hr />

                      <div className="row">
                        <div className="">
                          <label style={{ fontWeight: "bold" }}>
                            Precio de adquisicion:
                          </label>
                        </div>
                        <div className="col-md-8 col-6">
                          $ {item.precio_adquisicion}
                        </div>
                      </div>
                      <hr />

                      {item.precio_venta_almacen ? (
                        <>
                          <div className="row">
                            <div className="">
                              <label style={{ fontWeight: "bold" }}>
                                Venta :
                              </label>
                            </div>
                            <div className="col-md-8 col-6">
                              {item.precio_venta}
                            </div>
                          </div>
                          <hr />
                        </>
                      ) : null}
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

export default DetallesAlmacenesModal;
