import Footer from "../../components/layouts/Footer";
import LayoutContainer from "../../components/layouts/LayoutContainer";
import "./FormProveedor.css";

import { Field, Form, Formik } from "formik";
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import MensajeErrorInput from "../../components/layouts/MensajeErrorInput";

import { useFetch } from "../../hooks/useFetch";
import { URL } from "../../utils/getUrl";
import Loading from "../../components/layouts/Loading";
import Alerta from "../../components/layouts/Alerta";

function FormCliente() {
  const { setConfigFetch, fetchData, loading, error } = useFetch();
  const formikRef = useRef();

  const navigate = useNavigate();
  
  /* 
   nombre_proveedor,
      telefono_proveedor,
      direccion_proveedor,
  */
  const schemaFormCliente = yup.object().shape({
    nombre_proveedor: yup.string().required("El nombre del proveedor es requerido"),
    telefono_proveedor: yup.number().required("El telefono del proveedor es requerido"),
    direccion_proveedor: yup.string().required("La direccion del proveedor es requerida"),
  });

  const handleSubmit = (values) => {
    // console.log(values);
    const {
      nombre_proveedor,
      telefono_proveedor,
      direccion_proveedor
    } = values;

    setConfigFetch({
      url: `${URL}/proveedores`,
      headersRequest: {
        method: "POST",
        body: JSON.stringify({
          nombre_proveedor,
          telefono_proveedor,
          direccion_proveedor
        })
      }
    });
  };

  useEffect(() => {
    formikRef.current.setSubmitting(false);
    // console.log(error);
  }, [error]);

  useEffect(() => {
    if (fetchData.length === 0) return;
    navigate("/Proveedores");
  }, [fetchData]);

  return (
    <LayoutContainer>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
        <div className="container-fluid">
		<div className="row main-content bg-success text-center">
			<div className="col-md-4 text-center company__info">
      <h4 className="company_title">EL LOGO DE SIGAF</h4>
				{/* <span className="company__logo"><h2><span className="fa fa-android"></span></h2></span>
				<h4 className="company_title">Your Company Logo</h4> */}
			</div>
			<div className="col-md-8 col-xs-12 col-sm-12 login_form ">
				<div className="container-fluid">
					<div className="row">
						<h2 className="h2-formCliente">Formulario Para Clientes/Proveedores</h2>
					</div>
					<div className="row">
          <Formik
                innerRef={formikRef}
                initialValues={{
                  nombre_proveedor: "",
                  telefono_proveedor: "",
                  direccion_proveedor:""
                }}
                onSubmit={handleSubmit}
                validationSchema={schemaFormCliente}
              >
                {({ isSubmitting }) => (
						<Form id="formAuthentication" className="form-group">
							<div className="row">
                <Field
                        type="text"
                        className="form__input"
                        id="nombre_proveedor"
                        name="nombre_proveedor"
                        placeholder="Por favor ingrese el nombre del proveedor"
                       
                      />
              </div>
              <MensajeErrorInput
                      name="nombre_proveedor"
                      className="alert alert-danger"
              />
							<div className="row">
								
              <Field
                        type="text"
                        className="form__input"
                        id="telefono_proveedor"
                        name="telefono_proveedor"
                        placeholder="Por favor ingrese el número de telefono del proveedor"
                        
                      />

							</div>
              <MensajeErrorInput
                      name="telefono_proveedor"
                      className="alert alert-danger"
                    />
							<div className="row">
								
              <Field
                        type="text"
                        className="form__input"
                        id="direccion_proveedor"
                        name="direccion_proveedor"
                        placeholder="Por favor ingrese la direccion del proveedor"
                        
                      />

							</div>
              <MensajeErrorInput
                      name="direccion_proveedor"
                      className="alert alert-danger"
                    />
							<div className="row">
								<input type="submit"  disabled={isSubmitting} value="Guardar" className="btn_formcliente"/>
                <Link to="/Proveedores">
                <input type="buttom" defaultValue="Cancelar" className="btn_formcliente mx-3"/>
                </Link>
              </div>
              <div className="row">
								
							</div>
              </Form>
                )}
              </Formik>
					</div>
          {loading && <Loading />}

        {error?.errors &&
          error?.errors.map((msgError, i) => (
            <Alerta
              claseAlerta="danger"
              key={i}
              mensajeAlerta={msgError?.msg}
            />
          ))}
				</div>
			</div>
		</div>
	</div>
        </div>
        <Footer />
        <div className="content-backdrop fade"></div>
      </div>
    </LayoutContainer>
  );
}

export default FormCliente;
