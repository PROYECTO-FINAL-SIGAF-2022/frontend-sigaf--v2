import { Field, Formik, Form } from "formik";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LayoutContainer from "../../../../../components/layouts/LayoutContainer";

import { useFetch } from "../../../../../hooks/useFetch";
import { URL } from "../../../../../utils/getUrl";

  const FormGastosMaquinas = () => {
  const [isSend, setIsSend] = useState(false)
  const [preview, setPreview] = useState("");
  const [maquina, setMaquina] = useState("");
  const [setConfigFetchMaquinas, fetchDataMaquinas] = useFetch();
  const [setConfigFetchContabilidad, fetchDataContabilidad] = useFetch();

  const formikRef = useRef();

  const getMaquinas = () => {
    setConfigFetchMaquinas({
      url: `${URL}/maquinas`,
      headersRequest: {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const {
      descripcion_contabilidad,
      monto_contabilidad
    } = values;

    setConfigFetchContabilidad({
      url: `${URL}/contabilidad`,
      headersRequest: {
        method: "POST",
        body: JSON.stringify({
          descripcion_contabilidad:`${preview}: ${maquina}`,
          observacion_contabilidad: "-",
          tipo_contabilidad: "egreso",
          monto_contabilidad,
          id_parcela_cultivo: 1
        })
      }
    });
    setIsSend(true)
  };

  useEffect(() => {
    getMaquinas();
  }, []);

  useEffect(()=> {
    if (!isSend) return;
    navigate("/Egresos", { state: { tab: "tab3" } });
  }, [isSend])

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
                  <Formik
                  innerRef={formikRef}
                  initialValues={{
                    descripcion_contabilidad: "",
                    monto_contabilidad: "",
                    maquinas: ""
                  }}
                  onSubmit={handleSubmit}
                  >
                    {({handleChange})=>(
                      <Form id="formAuthentication" className="form-group">
                      <div className="mb-3">
                        <label className="form-label">
                          Seleccione Maquina
                        </label>
                        <Field
                          className="form-control"
                          as="select"
                          name="maquinas"
                          onChange={(e) => {
                            handleChange(e);
                            setMaquina(e.target.value)
                          }}
                        >
                          <option value="" disabled>
                            Seleccionar Maquina...
                          </option>
                          {fetchDataMaquinas?.map((item) => {
                            return (
                              <option
                                key={item.id_maquina}
                                value={item.descripcion_maquina}
                              >
                                {item.descripcion_maquina}
                              </option>
                            );
                          })}
                        </Field> 
                      </div>
                      <div className= "mb-3">
                          <label className= "form-label" >Observaciones</label>
                          <Field
                            type= "text"
                            className= "form-control"
                            placeholder= "Ingrese el detalle del gasto"
                            name="descripcion_contabilidad"
                            onChange={(e) => {
                              handleChange(e);
                              setPreview(e.target.value)
                            }}
                          />
                          <span><b>Preview:</b>{` ${preview}: ${maquina}`}</span>
                      </div>
                      <div className= "mb-3">
                          <label className= "form-label">Precio</label>
                          <Field
                            type= "number"
                            className= "form-control"
                            placeholder= "Ingrese el precio del gasto"
                            name="monto_contabilidad"
                          />
                      </div>
                      <br></br>
                      <Link to='/Egresos' state={{ tab: "tab3" }}>
                      <button className="btn btn-danger mx-3">
                        Volver
                      </button>
                      </Link >
                      <button className="btn btn-success" type="submit">
                        Agregar Costo
                      </button>
                      </Form>
                    )}
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
