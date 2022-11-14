import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";

import { useEffect, useState } from "react";

const DetallesPersonalModal = ({item,optSmModalDetalles,setOptSmModalDetalles,toggleShowDetalles}) => {

  
  //console.log(item)
  /* const [fechaAdquisicionState, setFechaAdquisicionState] = useState('');
    useEffect(()=>{
      var fechaAdquisicion = new Date(item.fecha_adquisicion_maquina);
    setFechaAdquisicionState(fechaAdquisicion.toLocaleDateString())
    }) */
    console.log(item)
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
          <h5>Ver Detalles Del Personal:</h5>
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
                <div className="image-container">
                  <img
                    src="https://www.pngmart.com/files/22/User-Avatar-Profile-PNG.png"
                    style={{ width: "150px", height: "120px" }}
                    className="img-thumbnail"
                  />
                </div>
                <div className="userData ml-3 mx-4 my-4">
                  <h2
                    className="d-block"
                    style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                  >
                    <a href="#">{item.nombre_persona} {item.apellido_persona}</a>
                  </h2>
                  <h6 className="d-block">
                    <a href="#">Username:</a>{" "}
                    <strong >
                    {item.username_usuario}
                    </strong>
                  </h6>
                  <h6 className="d-block">
                    <a href="#">Dni:</a>{" "}
                    <strong style={{ textTransform: "uppercase" }}>
                    {item.dni_persona}
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
                            Fecha de Nacimiento:
                          </label>
                        </div>
                        <div className="col-md-8 col-6">
                        {item.fecha_nac_persona}
                        </div>
                      </div>
                      <hr />

                      <div className="row">
                        <div className="">
                          <label style={{ fontWeight: "bold" }}>
                            Email:
                          </label>
                        </div>
                        <div className="col-md-8 col-6">
                        {item.email_persona}
                        </div>
                      </div>
                      <hr />

                      <div className="row">
                        <div className="">
                          <label style={{ fontWeight: "bold" }}>
                            Nro De Telefono:
                          </label>
                        </div>
                        <div className="col-md-8 col-6">
                        +54 {item.telefono_persona}
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

export default DetallesPersonalModal