import { Card } from "reactstrap";
import React, { useState, Fragment } from "react";
import Button from "react-bootstrap/Button";
import "./Index.css";
import { MDBBtn, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalHeader, MDBModalTitle } from "mdb-react-ui-kit";
import { Field, Form, Formik } from "formik";

const MaquinasTabContent = () => {
  const [optSmModal, setOptSmModal] = useState(false);

  const toggleShow = () => setOptSmModal(!optSmModal);

  return (
    <Fragment>
      <Card>
        <>
        <table className="table user-list">
            <thead>
                <tr>
                    <th className="text-center">
                    <span>Maquina</span>
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
                    Tractor
                </a>
                </td>
                <td className="text-center">
                <a onClick={toggleShow} className="user-link">
                  $25000
                </a>
                <MDBModal staticBackdrop stabindex='-1' show={optSmModal} setShow={setOptSmModal}>
                  <MDBModalDialog centered>
                    <MDBModalContent>
                      <MDBModalHeader>
                        <MDBModalTitle>
                          <i className="menu-icon tf-icons bx bx-rocket"></i>
                            Tractor 
                        </MDBModalTitle>
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
                    </MDBModalContent>
                  </MDBModalDialog>
                </MDBModal>
                </td>
            </tr>
        </tbody>
        </table>
        </>
      </Card>
    </Fragment>
  );
};

export default MaquinasTabContent;
