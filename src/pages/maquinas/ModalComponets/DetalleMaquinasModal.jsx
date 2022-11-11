
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
const DetalleMaquinasModal = ({item,optSmModalDetalles,setOptSmModalDetalles,toggleShowDetalles}) => {

    
    //console.log(item)
    const [fechaAdquisicionState, setFechaAdquisicionState] = useState('');
      useEffect(()=>{
        var fechaAdquisicion = new Date(item.fecha_adquisicion_maquina);
      setFechaAdquisicionState(fechaAdquisicion.toLocaleDateString())
      })
    //console.log(fetchDataProveedor)
      
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
            <h5>Ver Detalles De La Maquina:</h5>
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
            <h4>Nombre de la maquina: <b>{item.descripcion_maquina}</b></h4>
            </div>
            <div>
            <h4>Tipo: <b>{item.tipo_adquisicion_maquina}</b></h4>
            </div>
            
            <div>
            <h4>Precio: <b>{item.precio_adquisicion_maquina}</b></h4>
            </div>
            <div>
            <h4>Fecha de Adquisicion: <b>{fechaAdquisicionState}</b></h4>
            </div>
            {/* <div>
            <h4>precio_venta_maquina: <b>{item.precio_venta_maquina}</b></h4>
            </div> */}
            
          </div>
        </MDBModalBody>
      </MDBModalContent>
    </MDBModalDialog>
  </MDBModal>
  )
}

export default DetalleMaquinasModal