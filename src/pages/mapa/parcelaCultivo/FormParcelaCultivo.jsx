import { Field, Form, Formik } from "formik";
import React, { useRef, useEffect, useState } from "react";
import * as yup from "yup";
import Alerta from "../../../components/layouts/Alerta";
import MensajeErrorInput from "../../../components/layouts/MensajeErrorInput";
import { useFetch } from "../../../hooks/useFetch";
import { URL } from "../../../utils/getUrl";

const FormParcelaCultivo = ({ parcelaSelected, loadParcelas, updateRef, parcelasRef }) => {
  const [setFetchParcelaCultivo, dataParcelasCultivos, loadingParcelaCultivo, errorParcelaCultivo, cleanStates] = useFetch();

  const [parcela, setParcela] = useState();

  const formikRef = useRef();

  const schemaFormParcelaCultivo = yup.object().shape({
    descripcion_parcela: yup.string().required("El nombre de la parcela es requerido")
  });

  const handleSubmit = (values) => {
    cleanStates();
    const {
      descripcion_parcela
    } = values;

    const parcelasNoEditadas = parcelasRef.filter(parcela => parcela.id !== parcelaSelected.id);
    const parcelaEditada = parcelasRef.filter(parcela => parcela.id === parcelaSelected.id)[0];

    parcelaEditada.descripcion_parcela = descripcion_parcela;

    setFetchParcelaCultivo({
      url: `${URL}/parcelas/${parcela.id}`,
      headersRequest: {
        method: "PUT",
        body: JSON.stringify({
          descripcion_parcela,
          georeferencia: JSON.stringify(parcela.georeferencia),
          superficie: parcela.superficie
        })
      }
    });

    updateRef([...parcelasNoEditadas, parcelaEditada]);
  };

  useEffect(() => {
    return () => {
      setFetchParcelaCultivo([]);
      setParcela();
      cleanStates();
    };
  }, []);

  useEffect(() => {
    formikRef.current.setSubmitting(false);
  }, [errorParcelaCultivo]);

  useEffect(() => {
    setParcela(parcelaSelected);
  }, [parcelaSelected]);

  useEffect(() => {
    loadParcelas();
  }, [dataParcelasCultivos]);

  return (
   <>
     <h4>Ingrese los datos para la parcela</h4>
        <hr />
        <Formik
        enableReinitialize={true}
              innerRef={formikRef}
                initialValues={{
                  descripcion_parcela: parcela?.descripcion_parcela ? parcela.descripcion_parcela : ""
                }}
              onSubmit={handleSubmit}
              validationSchema={schemaFormParcelaCultivo}
            >
        {({ isSubmitting, isValid, dirty }) => (
                <Form id="formAuthentication" className="form-group">
                <div className="mb-3">
                    <label className="form-label">
                    Nombre Parcela
                    </label>
                    <Field
                    type="text"
                    className="form-control"
                    id="descripcion_parcela"
                    name="descripcion_parcela"
                    placeholder="Por favor ingrese un nombre para la parcela"
                    />
                </div>
                <MensajeErrorInput
                    name="descripcion_parcela"
                    className="alert alert-danger"
                />

                <button type="submit" disabled={!isValid && !dirty} className="btn btn-warning">
                    Editar Parcela
                </button>
                </Form>
        )}
              </Formik>
            {
              loadingParcelaCultivo && <Alerta
                    claseAlerta="success mt-2"
                    mensajeAlerta={"Datos actualizado"}
                  />
            }
            {errorParcelaCultivo?.errors &&
              errorParcelaCultivo?.errors.map((msgError, i) => (
                  <Alerta
                    claseAlerta="danger mt-3"
                    key={i}
                    mensajeAlerta={msgError?.msg}
                  />
              ))}
   </>
  );
};

export default FormParcelaCultivo;
