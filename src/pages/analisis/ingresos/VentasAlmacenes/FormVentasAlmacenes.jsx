import { Field, Form, Formik } from "formik";
import React, { useRef, useState, useEffect } from "react";
import * as yup from "yup";

import { Link, useNavigate } from "react-router-dom";
import LayoutContainer from "../../../../components/layouts/LayoutContainer";
import MensajeErrorInput from "../../../../components/layouts/MensajeErrorInput";
import { useFetch } from "../../../../hooks/useFetch";
import { URL } from "../../../../utils/getUrl";

const FormVentasAlmacenes = () => {
  const [
    setFetchAlmacenes,
    fetchDataAlmacenes,
    loadingAlmacenes,
    errorAlmacenes
  ] = useFetch([]);

  const [
    setFetchContabilidad,
    fetchDataContabilidad,
    // loadingContabilidad,
    errorContabilidad
  ] = useFetch([]);
  const [
    setFetchVentaAlmacen,
    fetchDataVentaAlmacen,
    // loadingVentaAlmacen,
    errorVentaAlmacen
  ] = useFetch([]);

  const [descripcionAlmacen, setDescripcionAlmacen] = useState("");
  const formikRef = useRef();
  const navigate = useNavigate();

  const schemaVentaAlmacen = yup.object().shape({
    almacen: yup.string().required("El almacen es requerido"),
    precio_venta: yup
      .number()
      .typeError("El monto total a vender debe ser numerica")
      .min(1, "El monto a vender no puede ser menor a 1")
      .required("El monto a vender es requerida")
  });

  const handleChangetAlmacen = (e) => {
    const id = e.target.selectedIndex;
    const option = e.target.querySelectorAll("option")[id];
    const descripcionAlmacen = option.getAttribute("data-descripcion-almacen");
    setDescripcionAlmacen(descripcionAlmacen);
  };

  const handleSubmit = (values) => {
    const {
      almacen,
      precio_venta
    } = values;

    // console.log(values);

    setFetchVentaAlmacen({
      url: `${URL}/almacenes-vender/${almacen}`,
      headersRequest: {
        method: "PUT",
        body: JSON.stringify({
          precio_venta
        })
      }
    });

    setFetchContabilidad({
      url: `${URL}/contabilidad`,
      headersRequest: {
        method: "POST",
        body: JSON.stringify({
          descripcion_contabilidad: `Se realizo la venta del almacen: ${descripcionAlmacen}`,
          observacion_contabilidad: "-",
          tipo_contabilidad: "ingreso",
          monto_contabilidad: precio_venta,
          id_parcela_cultivo: "1"
        })
      }
    });
  };

  useEffect(() => {
    formikRef.current.setFieldValue("almacen", "");

    setFetchAlmacenes({
      url: `${URL}/almacenes`,
      headersRequest: {
        method: "GET"
      }
    });

    return () => {
      setFetchAlmacenes([]);
    };
  }, []);

  useEffect(() => {
    formikRef.current.setSubmitting(false);
  }, [errorAlmacenes]);

  useEffect(() => {
    if ("msg" in fetchDataVentaAlmacen && "msg" in fetchDataContabilidad) {
      alert("Venta guardada exitosamente");
      navigate("/Ingresos", { state: { tab: "tab4" } });
    }
  }, [fetchDataContabilidad, fetchDataVentaAlmacen]);

  return (
    <LayoutContainer>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row">
            <div className="col-lg-12 mb-4 order-0">
              <div className="card">
                <div className="d-flex align-items-end row">
                  <div className="col-sm-12">
                    <div className="card-body">
                      <Formik
                        innerRef={formikRef}
                        initialValues={{
                          almacen: "",
                          precio_venta: ""
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={schemaVentaAlmacen}
                      >
                        {({ isSubmitting, handleChange, isDirty, isValid }) => (
                          <Form className="form-group">
                            <div className="mb-3">
                              <label className="form-label">
                                Seleccione Almacen
                              </label>
                              <Field
                                as="select"
                                name="almacen"
                                id="almacen"
                                className="form-control"
                                onChange={(e) => {
                                  handleChange(e);
                                  handleChangetAlmacen(e);
                                }}
                              >
                                <option value="" disabled>
                                  Seleccione un almacen
                                </option>
                                {fetchDataAlmacenes?.map((almacen) => (
                                  almacen.tipo_adquisicion === "compra" && (
                                    <option
                                    key={almacen.id_almacen}
                                    value={almacen.id_almacen}
                                    disabled={almacen.precio_venta !== null}
                                    data-descripcion-almacen={almacen.descripcion_almacen}
                                  >
                                    {almacen.descripcion_almacen} {"-"}
                                   ({almacen.tipo_adquisicion})-({almacen.activo ? "activo" : "inactivo"})
                                  </option>
                                  )
                                ))}
                              </Field>

                              <MensajeErrorInput
                                name="campania"
                                className="alert alert-danger mt-2"
                              />
                              {loadingAlmacenes && (
                                <b className="text-warning">
                                  Cargando Almacenes
                                </b>
                              )}
                              {errorAlmacenes?.length > 0 && (
                                <b className="text-warning">
                                {errorAlmacenes}
                                </b>
                              )}
                            </div>
                            <div className="mb-3">
                              <label className="form-label">
                                Ingrese Monto Total
                              </label>
                              <Field
                                name="precio_venta"
                                type="number"
                                className="form-control"
                                placeholder="Por favor ingrese el monto total"
                                aria-describedby="emailHelp"
                              />
                              <MensajeErrorInput
                                name="precio_venta"
                                className="alert alert-danger mt-2"
                              />
                            </div>
                            <div className="mb-3">
                              <Link to="/Ingresos" state={{ tab: "tab4" }}>
                                <button className="btn btn-danger">
                                  Volver
                                </button>
                              </Link>
                              <input
                                type="submit"
                                className="btn btn-success mx-2"
                                disabled={isSubmitting || !isValid}
                                value="Guardar Venta"
                              />
                            </div>
                          </Form>
                        )}
                      </Formik>
                      {/* {errorPacelasCultivos && <h3>{errorPacelasCultivos}</h3>} */}

                      {
                        (errorContabilidad?.length > 0 && errorVentaAlmacen?.length > 0) && (
                          <h3 className="text-danger">Error al guardar la venta</h3>
                        )
                      }

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

export default FormVentasAlmacenes;
