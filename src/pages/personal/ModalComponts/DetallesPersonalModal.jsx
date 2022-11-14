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
    //console.log(item)
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
        <div className="container">
          <div>
          <h4>Nombre Completo: <b>{item.nombre_persona} {item.apellido_persona}</b></h4>
          </div>
          <div>
          <h4>DNI: <b>{item.dni_persona}</b></h4>
          </div>
          <div>
          <h4>Fecha de Nacimiento: <b>{item.fecha_nac_persona}</b></h4>
          </div>
          <div>
          <h4>Email: <b>{item.email_persona}</b></h4>
          </div>
          <div>
          <h4>Nro De Telefono: <b>{item.telefono_persona}</b></h4>
          </div>
          <div>
          <h4>Username: <b>{item.username_usuario}</b></h4>
          </div>
        </div>
      </MDBModalBody>
    </MDBModalContent>
  </MDBModalDialog>
</MDBModal>
)
}

export default DetallesPersonalModal