import { Card } from "reactstrap";
import React, { useState, Fragment } from "react";
import Button from "react-bootstrap/Button";
import "./Precios.css";
import { MDBBtn, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalHeader, MDBModalTitle } from "mdb-react-ui-kit";
import { Field, Form, Formik } from "formik";

const ProductosTabContent = () => {
  /* const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true); */
  const [optSmModal, setOptSmModal] = useState(false);

  const toggleShow = () => setOptSmModal(!optSmModal);

  return (
    <Fragment>
      <Card>
        <>
        <table className="table user-list">
            <thead>
                <tr>
                    <th className="text-center" style={{ width: "40%" }}>
                    <span>Producto</span>
                    </th>
                    <th className="text-center">
                    <span>Precio</span>
                    </th>

                </tr>
            </thead>
        <tbody>
            <tr>
                <td className="text-center" >
                <a>
                    Fertilizante
                </a>
                </td>
                <td className="text-center">
                <a onClick={toggleShow} className="user-link">
                  $2500
                </a>
                <MDBModal staticBackdrop stabindex='-1' show={optSmModal} setShow={setOptSmModal}>
                  <MDBModalDialog centered>
                    <MDBModalContent>
                      <MDBModalHeader>
                        <MDBModalTitle>Fertilizante</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                      </MDBModalHeader>
                      <MDBModalBody>
                      </MDBModalBody>
                      <div className="col-lg-12 mb-5 order-0">
                      <div className="col-sm-12">
                      <div className="card-body align-center">
                      <Formik>
                        <Form className= "form-group">
                          <div className= "mb-3">
                            <label className= "form-label">Nuevo Precio</label>
                            <Field
                              type= "number"
                              className= "form-control"
                              placeholder= "Ingrese el Nuevo Precio"
                            />
                          </div>
                          <div className= "mb-3">
                            <label className= "form-label">Valido a partir de</label>
                            <Field
                              type= "date"
                              className= "form-control"
                            />
                          </div>
                          <br></br>
                          <Button onClick={toggleShow}>
                            Guardar
                          </Button>
                        </Form>
                      </Formik>
                      </div>
                      </div>
                      </div>
                      {/* <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={toggleShow}>
                          Close
                        </MDBBtn>
                        <MDBBtn>Save changes</MDBBtn>
                      </MDBModalFooter> */}
                    </MDBModalContent>
                  </MDBModalDialog>
                </MDBModal>
                {/* <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      <h4>Agustin Centurion</h4>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h1>hola</h1>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                      Guardar
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                      Salir
                    </Button>
                  </Modal.Footer>
                </Modal> */}
                </td>
            </tr>
        </tbody>
        </table>
        </>
      </Card>
    </Fragment>
  );
};

export default ProductosTabContent;
