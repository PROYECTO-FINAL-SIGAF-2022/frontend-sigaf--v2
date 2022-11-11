import { useEffect, useState, useRef } from "react";
import * as yup from "yup";
import MensajeErrorInput from "../../../components/layouts/MensajeErrorInput";
import Loading from "../../../components/layouts/Loading";
import Alerta from "../../../components/layouts/Alerta";

import { useFetch } from "../../../hooks/useFetch";
import { URL } from "../../../utils/getUrl";
import { Field, Form, Formik } from "formik";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";

const UpdateProductoModal = ({optSmModalEdit,setoptSmModalEdit,toggleShowEdit,datosProducto, getProductos}) => {
  //console.log(datosProducto);

  const [setConfigFetchProductoPUT,fetchDataProductoPUT, loadingPUT, errorPut] = useFetch();

  const [setConfigFetchTipoProductos, fetchDataTipoProductos] = useFetch();
  const [setConfigFetchProveedores, fetchDataProveedores] = useFetch();
  const [setConfigFetchUnidadMedida, fetchDataUnidadMedida] = useFetch();

  const formikRef = useRef();

  const schemaFormProductos = yup.object().shape({
    descripcion_producto: yup.string().required("La descripcion del producto es requerida"),
    fecha_vencimiento_producto: yup.date().required("La fecha de vencimiento es requerida"),
    cantidad_producto: yup.number().required("La cantidad del producto es requerida"),
    precio_total_producto: yup.number().required("El Precio es requerido"),
    id_proveedor: yup.number().required("Seleccione un proveedor"),
    id_tipo_producto: yup.number().required("Seleccione un tipo de producto"),
    id_unidad_medida: yup.number().required("Seleccione una unidad de medida")
  });

  const getUnidadMedida = () => {
    setConfigFetchUnidadMedida({
      url: `${URL}/unidades-medidas`,
      headersRequest: {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    })
  }

  const getProveedores = () => {
    setConfigFetchProveedores({
      url: `${URL}/proveedores`,
      headersRequest: {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    })
  }

  const getTipoProductos = () => {
    setConfigFetchTipoProductos({
      url: `${URL}/tipo-productos`,
      headersRequest: {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    })
  }
  useEffect(()=>{
    getTipoProductos(),
    getUnidadMedida(),
    getProveedores()
  },[]);


    const handleSubmit = (values) => {
    // console.log(values);
    const {
      descripcion_producto,
      fecha_vencimiento_producto,
      cantidad_producto,
      precio_total_producto,
      id_proveedor,
      id_tipo_producto,
      id_unidad_medida
    } = values;

    
    setConfigFetchProductoPUT({
      url: `${URL}/productos/${datosProducto.id_producto}`,
      headersRequest: {
        method: "PUT",
        body: JSON.stringify({
            descripcion_producto,
            fecha_vencimiento_producto,
            cantidad_producto,
            precio_total_producto,
            id_proveedor,
            id_tipo_producto,
            id_unidad_medida,
            id_almacen:1
        })
      }
    }); 
  };

 useEffect(()=>{
  getProductos()
 },[fetchDataProductoPUT])

 //console.log(datosProducto?.descripcion_producto)
 /* const [fechaVencimiento, setFechaVencimiento] = useState('')
 useEffect(()=>{

 var fecha = new Date(datosProducto.fecha_vencimiento_producto);
setFechaVencimiento(fecha.toLocaleDateString()) 
 },[]) */
  return (
    <MDBModal
      staticBackdrop
      stabindex="-1"
      show={optSmModalEdit}
      setShow={setoptSmModalEdit}
    >
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>
              <h5>Editar Datos del Producto:</h5>
            </MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={toggleShowEdit}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
                  <div >
                    <div className="card-body">
                    <Formik
                      innerRef={formikRef}
                      enableReinitialize={true}
                      initialValues={{
                        descripcion_producto: datosProducto?.descripcion_producto,
                        fecha_vencimiento_producto: datosProducto?.fecha_vencimiento_producto,
                        cantidad_producto: datosProducto?.cantidad_producto,
                        precio_total_producto: datosProducto?.precio_total_producto,
                        id_proveedor: datosProducto?.id_proveedor,
                        id_tipo_producto: datosProducto?.id_tipo_producto,
                        id_unidad_medida: datosProducto.id_unidad_medida,
                      }}
                      onSubmit={handleSubmit}
                      validationSchema={schemaFormProductos}
                    >
                {({ isSubmitting, dirty }) => (
                      <Form id="formAuthentication" className="form-group">
                        <div className="mb-3">
                          <label  className="form-label">
                            Nombre Del Producto
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            id="descripcion_producto"
                            name="descripcion_producto"
                            placeholder="Por favor ingrese el nombre del producto"
                            aria-describedby="emailHelp"
                          />
                          <div id="emailHelp" className="form-text">
                            Agregar un nombre descriptivo
                          </div>
                        </div>
                        <MensajeErrorInput
                          name="descripcion_producto"
                          className="alert alert-danger"
                        />
                        <div className="mb-3">
                          <label className="form-label">
                            Fecha de Vencimiento
                          </label>
                          <Field
                            type="date"
                            className="form-control"
                            id="fecha_vencimiento_producto"
                            name="fecha_vencimiento_producto"
                            placeholder="Por favor la fecha de vencimiento"
                            aria-describedby="emailHelp"
                          />
                        </div>
                        <MensajeErrorInput
                          name="fecha_vencimiento_producto"
                          className="alert alert-danger"
                        />
                        <div className="mb-3">
                          <label className="form-label">
                            Cantidad de productos
                          </label>
                          <Field
                            type="number"
                            className="form-control"
                            id="cantidad_producto"
                            name="cantidad_producto"
                            placeholder="Por favor ingrese la cantidad del producto"
                            aria-describedby="emailHelp"
                          />
                        </div>
                        <MensajeErrorInput
                          name="cantidad_producto"
                          className="alert alert-danger"
                        />
                        <div className="mb-3">
                          <label className="form-label">
                            Precio del producto
                          </label>
                          <Field
                            type="number"
                            className="form-control"
                            id="precio_total_producto"
                            name="precio_total_producto"
                            placeholder="Por favor ingrese el precio del producto"
                          />
                        </div>
                        <MensajeErrorInput
                          name="precio_total_producto"
                          className="alert alert-danger"
                        />
                        <div className="mb-3">
                          <label  className="form-label">
                            Tipo De Producto
                          </label>
                          <Field
                            as="select"
                            className="form-select"
                            id="id_tipo_producto"
                            name="id_tipo_producto"
                            // defaultValue = ""
                          >
                            <option disabled value="">Lista Tipos Productos</option>
                            {
                            fetchDataTipoProductos?.map((item) => {
                              return(
                                <option key={ `${item.id_tipo_producto}-${id_tipo_producto}`} value={item.id_tipo_producto}>{item.descripcion_tipo_producto}</option>
                              )
                            })
                          }
                           
                          </Field>
                        </div>
                        <MensajeErrorInput
                          name="id_tipo_producto"
                          className="alert alert-danger"
                        />
                        <div className="mb-3">
                            <label  className="form-label">
                              Proveedor
                            </label>
                            <Field
                              as="select"
                              className="form-select"
                              id="id_proveedor"
                              name="id_proveedor"
                              // defaultValue = ""
                            >
                              <option disabled value="">Lista Proveedores</option>
                              {
                            fetchDataProveedores?.map((item) => {
                              return(
                                <option  key={`${item?.id_proveedor}-${id_proveedor}`} value={item?.id_proveedor}>{item?.nombre_proveedor}</option>
                              )
                            })
                          }
                            </Field>
                          </div>
                          <MensajeErrorInput
                            name="id_proveedor"
                            className="alert alert-danger"
                          />
                        <div className="mb-3">
                            <label  className="form-label">
                              Unidad de medida
                            </label>
                            <Field
                              as="select"
                              className="form-select"
                              id="id_unidad_medida"
                              name="id_unidad_medida"
                              // defaultValue = ""
                            >
                              <option disabled value="">Seleccionar una unidad de medida</option>
                              {
                            fetchDataUnidadMedida?.map((item) => {
                              return(
                                <option key={`${item.id_tipo_producto}-${id_unidad_medida}`}  value={item.id_unidad_medida}>{item.descripcion_unidad_medida}</option>
                              )
                            })
                          }
                            </Field>
                          </div>
                          <MensajeErrorInput
                            name="id_unidad_medida"
                            className="alert alert-danger"
                          />
                        
                        <button type="submit" disabled={!dirty} className="btn btn-success">
                          Editar Producto
                        </button>
                        </Form>
                )}
              </Formik>
                    </div>
                  </div>
                  {loadingPUT && <Loading />}

                {errorPut?.errorPut &&
                  errorPut?.errors.map((msgError, i) => (
                    <Alerta
                      claseAlerta="danger"
                      key={i}
                      mensajeAlerta={msgError?.msg}
                    />
                  ))}
               
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

export default UpdateProductoModal;

{/* 

{loading && <Loading />}

                {error?.errors &&
                  error?.errors.map((msgError, i) => (
                    <Alerta
                      claseAlerta="danger"
                      key={i}
                      mensajeAlerta={msgError?.msg}
                    />
                    
*/}