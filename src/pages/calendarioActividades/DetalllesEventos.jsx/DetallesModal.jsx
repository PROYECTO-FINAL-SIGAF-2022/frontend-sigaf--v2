import React from 'react'
import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalHeader,
    MDBModalTitle,
  } from "mdb-react-ui-kit";

const DetallesModal = ({
    optSmModalDetalles,setOptSmModalDetalles,toggleShowDetalles
}) => {
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
            Detalles del evento
          </MDBModalTitle>
          <MDBBtn
            className="btn-close"
            color="none"
            onClick={toggleShowDetalles}
          ></MDBBtn>
        </MDBModalHeader>
        <MDBModalBody>
            <div>Prueba</div>
        </MDBModalBody>
      </MDBModalContent>
    </MDBModalDialog>
  </MDBModal>
  )
}

export default DetallesModal