import { Field, Formik, Form } from "formik";
import { Link } from "react-router-dom";
import LayoutContainer from "../../../../../components/layouts/LayoutContainer";

const FormGastosMaquinas = () => {
  return (
    <LayoutContainer>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row">
            <div className="col-lg-12 mb-4 order-0">
              <div className="card">
                <div className="d-flex align-items-end row">
                  <div className="col-sm-7">
                    <div className="card-body">
                    <Formik>
                      <Form id="formAuthentication" className="form-group">
                        <div className="mb-3">
                          <label className="form-label">
                            Seleccione Campaña
                          </label>
                          <Field className="form-control" as="select">
                            <option value="red">2020</option>
                            <option value="green">2021</option>
                            <option value="blue">2023</option>
                          </Field>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">
                            Seleccione Parcela
                          </label>
                          <Field className="form-control" as="select">
                            <option value="red">Parcela 1</option>
                            <option value="green">Parcela 2</option>
                            <option value="blue">Parcela 3</option>
                          </Field>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">
                            Seleccione Personal
                          </label>
                          <Field className="form-control" as="select">
                            <option value="red">Juan</option>
                            <option value="green">Pablito</option>
                            <option value="blue">Dibuneta</option>
                          </Field>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">
                            Seleccione Tipo de Pago
                          </label>
                          <Field className="form-control" as="select">
                            <option value="red">Mensual</option>
                            <option value="green">Diario</option>
                          </Field>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">
                            Monto
                          </label>
                          <Field
                            type="number"
                            className="form-control"
                            placeholder= "Ingrese el valor del pago"
                            aria-describedby="emailHelp"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">
                            Fecha
                          </label>
                          <Field
                            type="date"
                            className="form-control"
                            aria-describedby="emailHelp"
                          />
                        </div>
                        <br></br>
                        <Link to='/Egresos'>
                        <button className="btn btn-danger mx-3">
                          Volver
                        </button>
                        </Link >
                        <Link to='/Egresos'>
                        <button className="btn btn-success">
                          Agregar Personal
                        </button>
                        </Link >
                        </Form>
              </Formik>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-backdrop fade"></div>
      </div>
    </LayoutContainer>
  );
};

export default FormGastosMaquinas;
