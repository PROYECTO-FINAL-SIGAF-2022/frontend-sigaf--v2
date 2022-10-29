import { MDBBtn, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalHeader, MDBModalTitle } from "mdb-react-ui-kit";
import ModalTabsParcela from "./ModalTabsParcela";

const ModalDatosParcela = ({ optSmModal, setOptSmModal, toggleShow }) => {
  return (
    <MDBModal staticBackdrop stabindex='-1' show={optSmModal} setShow={setOptSmModal}>
    <MDBModalDialog centered>
      <MDBModalContent>
        <MDBModalHeader>
          <MDBModalTitle>Opciones Parcela</MDBModalTitle>
          <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
        </MDBModalHeader>
        <MDBModalBody>
              <ModalTabsParcela/>
        </MDBModalBody>
        {/* <MDBModalFooter>
          <MDBBtn color='secondary' onClick={toggleShow}>
            Close
          </MDBBtn>
          <MDBBtn>Save changes</MDBBtn>
        </MDBModalFooter> */}
      </MDBModalContent>
    </MDBModalDialog>
  </MDBModal>
  );
};

export default ModalDatosParcela;
