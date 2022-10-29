import { Field, Form, Formik } from "formik";
import React, { useRef, useEffect } from "react";
import * as yup from "yup";
import MensajeErrorInput from "../../../components/layouts/MensajeErrorInput";
import { useFetch } from "../../../hooks/useFetch";

const FormParcelaCultivo = () => {
  const [setFetchParcelaCultivo, fetchDataParcelaCultivo, loadingParcelaCultivo, errorParcelaCultivo] = useFetch();

  const formikRef = useRef();

  const schemaFormParcelaCultivo = yup.object().shape({
    nombre_parcela: yup.string().required("El nombre de la parcela es requerido"),
    id_cultivo: yup.number().required("El cultivo es requerido"),
    id_campania: yup.number().required("La la campaña es requerida"),
    id_unidad_medida: yup.number().required("La unidad medida es requerida"),
    cantidad_sembrada: yup.number().required("La cantidad sembrada es requerida")

  });

  const handleSubmit = (values) => {
    console.log(values);
    const {
      nombre_parcela,
      id_cultivo,
      id_campania,
      id_unidad_medida,
      cantidad_sembrada
    } = values;

    // setFetchParcelaCultivo({
    //   url: `${URL}/proveedores`,
    //   headersRequest: {
    //     method: "POST",
    //     body: JSON.stringify({
    //       nombre_proveedor,
    //       telefono_proveedor,
    //       direccion_proveedor
    //     })
    //   }
    // });
  };

  useEffect(() => {
    formikRef.current.setSubmitting(false);
    // console.log(error);
  }, [errorParcelaCultivo]);

  return (
   <>
     <h4>Ingrese los datos para la parcela</h4>
        <hr />
        <Formik
              innerRef={formikRef}
                initialValues={{
                  nombre_parcela: "",
                  id_cultivo: "",
                  id_campania: "",
                  id_unidad_medida: "",
                  cantidad_sembrada: ""
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
                    id="nombre_parcela"
                    name="nombre_parcela"
                    placeholder="Por favor ingrese un nombre para la parcela"
                    />
                </div>
                <MensajeErrorInput
                    name="nombre_parcela"
                    className="alert alert-danger"
                />
                <div className="mb-3">
                    <label className="form-label">
                    Cultivo
                    </label>
                    <Field
                    as="select"
                    className="form-control"
                    id="id_cultivo"
                    name="id_cultivo"
                    >
                      <option value="">Elija una opcion</option>
                      <option value="1">Red</option>
                      <option value="2">Green</option>
                      <option value="3">Blue</option>
                    </Field>
                </div>
                <MensajeErrorInput
                    name="id_cultivo"
                    className="alert alert-danger"
                />
                <div className="mb-3">
                    <label className="form-label">
                    Campaña
                    </label>
                    <Field
                    as="select"
                    className="form-control"
                    id="id_campania"
                    name="id_campania">
                      <option value="">Elija una opcion</option>
                      <option value="1">Red</option>
                      <option value="2">Green</option>
                      <option value="3">Blue</option>
                    </Field>
                </div>
                <MensajeErrorInput
                    name="id_campania"
                    className="alert alert-danger"
                />
                <div className="mb-3">
                    <label className="form-label">
                    Unidad Medida
                    </label>

                    <Field
                    as="select"
                    className="form-control"
                    id="id_unidad_medida"
                    name="id_unidad_medida">
                      <option value="">Elija una opcion</option>
                      <option value="1">Red</option>
                      <option value="2">Green</option>
                      <option value="3">Blue</option>
                    </Field>
                </div>
                <MensajeErrorInput
                    name="id_unidad_medida"
                    className="alert alert-danger"
                />
                 <div className="mb-3">
                    <label className="form-label">
                    Cantidad Sembrada
                    </label>
                    <Field
                    type="number"
                    className="form-control"
                    id="cantidad_sembrada"
                    name="cantidad_sembrada"
                    placeholder="Por favor ingrese la cantidad sembrada"
                    aria-describedby="emailHelp"
                    />
                </div>
                <MensajeErrorInput
                    name="cantidad_sembrada"
                    className="alert alert-danger"
                />

                <button type="submit" disabled={!(isValid && dirty)} className="btn btn-success">
                    Agregar Parcela
                </button>
                </Form>
        )}
              </Formik>

   </>
  );
};

export default FormParcelaCultivo;
