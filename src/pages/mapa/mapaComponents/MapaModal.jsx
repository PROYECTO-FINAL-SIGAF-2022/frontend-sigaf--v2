import { MDBBtn, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalHeader, MDBModalTitle } from "mdb-react-ui-kit";

const MapaModal = ({ optSmModal, setOptSmModal, toggleShow }) => {
  return (
    <MDBModal show={optSmModal} tabIndex="-1" setShow={setOptSmModal}>
        <MDBModalDialog size="xl">
            <MDBModalContent>
            <MDBModalHeader>
                <MDBModalTitle>
                <button
                    className="btn btn-success"
                    style={{ marginLeft: "10px" }}
                >
                    + CULTIVO
                </button>
                </MDBModalTitle>
                <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
                ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">NRO</th>
                    <th scope="col">Cultivo</th>
                    <th scope="col">Fecha De Plantacion</th>
                    <th scope="col">Accion</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Algodón</td>
                    <td>13/10/2022</td>
                    <td style={{ width: "20%" }}>
                        <a href="#" className="table-link">
                        <span className="fa-stack">
                            <i className="fa fa-square fa-stack-2x"></i>
                            <i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                        </span>
                        </a>
                        <a href="#" className="table-link danger">
                        <span className="fa-stack">
                            <i className="fa fa-square fa-stack-2x"></i>
                            <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                        </span>
                        </a>
                    </td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Soja</td>
                    <td>13/10/2022</td>
                    <td style={{ width: "20%" }}>
                        <a href="#" className="table-link">
                        <span className="fa-stack">
                            <i className="fa fa-square fa-stack-2x"></i>
                            <i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                        </span>
                        </a>
                        <a href="#" className="table-link danger">
                        <span className="fa-stack">
                            <i className="fa fa-square fa-stack-2x"></i>
                            <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                        </span>
                        </a>
                    </td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td>Arroz</td>
                    <td>13/10/2022</td>
                    <td style={{ width: "20%" }}>
                        <a href="#" className="table-link">
                        <span className="fa-stack">
                            <i className="fa fa-square fa-stack-2x"></i>
                            <i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                        </span>
                        </a>
                        <a href="#" className="table-link danger">
                        <span className="fa-stack">
                            <i className="fa fa-square fa-stack-2x"></i>
                            <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                        </span>
                        </a>
                    </td>
                    </tr>
                </tbody>
                </table>
            </MDBModalBody>
            </MDBModalContent>
        </MDBModalDialog>
    </MDBModal>
  );
};

export default MapaModal;
