import { Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import LayoutContainer from "../../../../components/layouts/LayoutContainer";
import MensajeErrorInput from "../../../../components/layouts/MensajeErrorInput";
import { useFetch } from "../../../../hooks/useFetch";
import { URL } from "../../../../utils/getUrl";

const FormVentasCosechas = () => {
  const [cantidadCosechada, setCantidadCosechada] = useState("");
  const [cantidadSembrada, setCantidadSembrada] = useState("");
  const [cantidadVendida, setCantidadVendida] = useState("");
  const [cantidadDisponible, setCantidadDisponible] = useState("");
  const [unidadMedidaVender, setUnidadMedidaVender] = useState("");
  const [nombreCultivo, setNombreCultivo] = useState("");

  const [errorStock, setErrorStock] = useState("");

  const [
    setFetchCampanias,
    fetchDataCampanias,
    loadingCampanias,
    errorCampanias
  ] = useFetch([]);
  const [
    setFetchPacelasCultivos,
    fetchDataPacelasCultivos,
    loadingPacelasCultivos,
    errorPacelasCultivos
  ] = useFetch([]);

  const [
    setFetchVentaCosecha,
    fetchDataVentaCosecha,
    // loadingVentaCosecha,
    errorVentaCosecha
  ] = useFetch([]);

  const [
    setFetchVentaContabilidad,
    fetchDataVentaContabilidad,
    // loadingVentaContabilidad,
    errorVentaContabilidad
  ] = useFetch([]);

  const formikRef = useRef();
  const navigate = useNavigate();

  const schemaIngresosCultivos = yup.object().shape({
    campania: yup.string().required("La campaña es requerida"),
    parcela_cultivo: yup.string().required("La parcela cultivo es requerido"),
    cantidad_vendida: yup
      .number()
      .typeError("La cantidad a vender debe ser numerica")
      .min(1, "La cantidad a vender no puede ser menor a 1")
      .required("La cantidad a vender es requerida"),
    monto_total_vendido: yup
      .number()
      .typeError("El monto total a vender debe ser numerica")
      .min(1, "El monto a vender no puede ser menor a 1")
      .required("El monto a vender es requerida")
  });

  const hanldeChangeCampania = (e) => {
    const idCampania = e.target.value;
    setFetchPacelasCultivos({
      url: `${URL}/contabilidad-ingresos/${idCampania}`,
      headersRequest: {
        method: "GET"
      }
    });
    setCantidadCosechada("");
    setCantidadSembrada("");
    setCantidadVendida("");
    setCantidadDisponible("");
    setCantidadDisponible("");
    setUnidadMedidaVender("");
    setNombreCultivo("");
    formikRef.current.setFieldValue("parcela_cultivo", "");
  };

  const hanldeChangeParcelaCultivo = (e) => {
    const id = e.target.selectedIndex;
    const option = e.target.querySelectorAll("option")[id];
    const cantidadCosechada = option.getAttribute("data-cantidad-cosechada");
    const cantidadSembrada = option.getAttribute("data-cantidad-sembrada");
    const cantidadTotalVendida = option.getAttribute("data-cantidad-vendida");
    const cantidadUnidadMedidaVender = option.getAttribute("data-unidad-medida");
    const cantidadTotalDisponible = option.getAttribute("data-cantidad-disponible");
    const nombreCultivo = option.getAttribute("data-nombre-cultivo");
    // const unidadMedidaCosechada = option.getAttribute("data-unidad-medida-cosechada");

    // const unidadMedidaSembrada = option.getAttribute("data-unidad-medida-sembrada");

    if (!JSON.parse(cantidadCosechada.split("-")[0])) {
      setCantidadCosechada("Aun no se ha realizado una cosecha");
    } else {
      setCantidadCosechada(cantidadCosechada);
    }

    if (!JSON.parse(cantidadSembrada.split("-")[0])) {
      setCantidadSembrada("Aun no se ha realizado una siembra");
    } else {
      setCantidadSembrada(cantidadSembrada);
    }

    setCantidadVendida(cantidadTotalVendida);
    setCantidadDisponible(cantidadTotalDisponible);
    setUnidadMedidaVender(cantidadUnidadMedidaVender);
    setNombreCultivo(nombreCultivo);
  };

  const handleChangeCantidadVenta = (e) => {
    const cantiadadAVender = e.target.value;

    if (cantiadadAVender > parseInt(cantidadDisponible.split("-")[0])) {
      setErrorStock("El monto a vender es mayor al stock disponible");
      return;
    }
    setErrorStock("");
  };

  const handleSubmit = (values) => {
    const {
      cantidad_vendida,
      monto_total_vendido,
      parcela_cultivo
    } = values;

    setFetchVentaCosecha({
      url: `${URL}/cosechas`,
      headersRequest: {
        method: "POST",
        body: JSON.stringify({
          cantidad_total_vendida: cantidad_vendida,
          precio_venta: monto_total_vendido,
          id_parcela_cultivo: parcela_cultivo,
          id_unidad_medida: unidadMedidaVender
        })
      }
    });

    setFetchVentaContabilidad({
      url: `${URL}/contabilidad`,
      headersRequest: {
        method: "POST",
        body: JSON.stringify({
          descripcion_contabilidad: `Se realizo la venta de ${cantidad_vendida}-${unidadMedidaVender} del cultivo de ${nombreCultivo}`,
          observacion_contabilidad: "-",
          tipo_contabilidad: "ingreso",
          monto_contabilidad: monto_total_vendido,
          id_parcela_cultivo: parcela_cultivo
        })
      }
    });
  };
  useEffect(() => {
    setFetchCampanias({
      url: `${URL}/campanias`,
      headersRequest: {
        method: "GET"
      }
    });

    return () => {
      setFetchCampanias([]);
    };
  }, []);

  useEffect(() => {
    formikRef.current.setSubmitting(false);
  }, [errorCampanias]);

  useEffect(() => {
    formikRef.current.setSubmitting(false);
  }, [errorCampanias]);

  useEffect(() => {
    if ("cosechaCreado" in fetchDataVentaCosecha) {
      alert("Venta guardada exitosamente");
      navigate("/Ingresos", { state: { tab: "tab2" } });
    }
  }, [fetchDataVentaContabilidad]);
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
                          campania: "",
                          parcela_cultivo: "",
                          cantidad_vendida: "",
                          monto_total_vendido: ""
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={schemaIngresosCultivos}
                      >
                        {({ isSubmitting, handleChange, isDirty, isValid }) => (
                          <Form className="form-group">
                            <div className="mb-3">
                              <label className="form-label">
                                Seleccione Campaña
                              </label>
                              <Field
                                as="select"
                                name="campania"
                                id="campania"
                                className="form-control"
                                onChange={(e) => {
                                  handleChange(e);
                                  hanldeChangeCampania(e);
                                }}
                              >
                                <option value="" disabled>
                                  Campaña
                                </option>
                                {fetchDataCampanias?.map((campania) => (
                                  <option
                                    key={campania.id_campania}
                                    value={campania.id_campania}
                                  >
                                    {campania.descripcion_campania}
                                  </option>
                                ))}
                              </Field>

                              <MensajeErrorInput
                                name="campania"
                                className="alert alert-danger mt-2"
                              />
                              {loadingCampanias && (
                                <b className="text-warning">
                                  Cargando Campañas
                                </b>
                              )}
                            </div>
                            <div className="mb-3">
                              <label className="form-label">
                                Seleccione una parcela cultivo
                              </label>
                              <Field
                                name="parcela_cultivo"
                                className="form-control mb-2"
                                as="select"
                                // defaultValue={errorPacelasCultivos ? "" : ""}
                                onChange={(e) => {
                                  handleChange(e);
                                  hanldeChangeParcelaCultivo(e);
                                }}
                              >
                                <option value="" disabled>
                                  Seleccione una parcela cultivo
                                </option>

                                {fetchDataPacelasCultivos?.map(
                                  (parcelaCultivo) => (
                                    <option
                                      key={parcelaCultivo.id_parcela_cultivo}
                                      value={parcelaCultivo.id_parcela_cultivo}
                                      data-cantidad-cosechada={`${parcelaCultivo.cantidad_total_cosechada}-${parcelaCultivo.unidadMedidaTotalCosechada.descripcion_unidad_medida}`}
                                      data-cantidad-sembrada={`${parcelaCultivo.cantidad_sembrada}-${parcelaCultivo.unidadMedidaTotalSembrada.descripcion_unidad_medida}`}
                                      data-cantidad-vendida={
                                        parcelaCultivo.sumaTotalCantidadVendida
                                      }
                                      data-cantidad-disponible={
                                        parcelaCultivo.sumaTotalCantidadStock
                                      }

                                      data-unidad-medida={
                                        parcelaCultivo.unidadMedidaTotalCosechada.id_unidad_medida
                                      }

                                      data-nombre-cultivo={
                                        parcelaCultivo.cultivo.descripcion_cultivo
                                      }
                                    >
                                      {parcelaCultivo.parcela.descripcion_parcela}{" "}
                                      {"-"}
                                      (
                                      {
                                        parcelaCultivo.cultivo.descripcion_cultivo
                                      }
                                      ){"-"}({parcelaCultivo.activo ? "Activo" : "Inactivo"})
                                    </option>
                                  )
                                )}
                              </Field>
                              {loadingPacelasCultivos && (
                                <b className="text-warning">
                                  Cargando Campañas
                                </b>
                              )}

                              {cantidadCosechada &&
                                cantidadSembrada &&
                                cantidadVendida &&
                                cantidadDisponible && (
                                  <>
                                    <span className="badge rounded-pill bg-warning mt-2">
                                      Cantidad sembrada: {cantidadSembrada}
                                    </span>
                                    <br />
                                    <span className="badge rounded-pill bg-success mt-2">
                                      Cantidad cosechada: {cantidadCosechada}
                                    </span>

                                    <br />
                                    <span className="badge rounded-pill bg-success mt-2">
                                      Cantidad vendida: {cantidadVendida}
                                    </span>

                                    <br />
                                    <span className="badge rounded-pill bg-success mt-2">
                                      Cantidad disponible: {cantidadDisponible}
                                    </span>
                                  </>
                              )}
                              <MensajeErrorInput
                                name="parcela_cultivo"
                                className="alert alert-danger mt-4"
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">
                                Ingrese Cantidad A Vender
                              </label>
                              <Field
                                name="cantidad_vendida"
                                type="number"
                                className="form-control"
                                placeholder="Ingrese la cantidad vendida"
                                onChange={(e) => {
                                  handleChange(e);
                                  handleChangeCantidadVenta(e);
                                }}
                              />

                              <MensajeErrorInput
                                name="cantidad_vendida"
                                className="alert alert-danger mt-2"
                              />

                              {errorStock && (
                                <div className="alert alert-danger mt-2" role="alert">
                                  {errorStock}
                                </div>
                              )}
                            </div>
                            <div className="mb-3">
                              <label className="form-label">
                                Ingrese Monto Total
                              </label>
                              <Field
                                name="monto_total_vendido"
                                type="number"
                                className="form-control"
                                placeholder="Por favor ingrese el monto total"
                                aria-describedby="emailHelp"
                              />
                              <MensajeErrorInput
                                name="monto_total_vendido"
                                className="alert alert-danger mt-2"
                              />
                            </div>
                            <div className="mb-3">
                              <Link to="/Ingresos" state={{ tab: "tab2" }}>
                                <button className="btn btn-danger">
                                  Volver
                                </button>
                              </Link>
                              <input
                                type="submit"
                                className="btn btn-success mx-2"
                                disabled={!parseInt(cantidadCosechada) || isSubmitting || !isValid}
                                value="Guardar Venta"
                              />
                            </div>
                          </Form>
                        )}
                      </Formik>
                      {errorPacelasCultivos && <h3>{errorPacelasCultivos}</h3>}
                      {/* {
                        ("cosechaCreado" in fetchDataVentaCosecha && "contabilidadAgregada" in fetchDataVentaContabilidad) && (
                          <h3 className="text-success"></h3>
                        )
                      } */}
                      {
                        (errorVentaContabilidad?.length > 0 && errorVentaCosecha?.length > 0) && (
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

export default FormVentasCosechas;
