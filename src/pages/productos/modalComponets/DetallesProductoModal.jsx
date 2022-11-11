
import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalHeader,
    MDBModalTitle,
  } from "mdb-react-ui-kit";

  import { useFetch } from "../../../hooks/useFetch";
  import { URL } from "../../../utils/getUrl";
  import { useEffect, useState } from "react";
const DetallesProductoModal = ({item,optSmModalDetalles,setOptSmModalDetalles,toggleShowDetalles}) => {

    const [setConfigFetchProveedor, fetchDataProveedor] = useFetch();
   const [setConfigFetchTipoProductos, fetchDataTipoProductos] = useFetch();
   const [setConfigFetchUnidadMedida, fetchDataUnidadMedida] = useFetch();
   const [setConfigFetchAlmacen, fetchDataAlmacen] = useFetch();
    //console.log(item)
    const [fechaVencimientoState, setFechaVencimientoState] = useState('');
    const [fechaCompaState, setFechaCompaState] = useState('');
    useEffect(()=>{
        //console.log(fetchDataProductos.id_proveedor)
       /*   */
       setConfigFetchProveedor({
        url: `${URL}/proveedores/${item.id_proveedor}`,
        headersRequest: {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        },
      });
      setConfigFetchTipoProductos({
        url: `${URL}/tipo-productos/${item.id_tipo_producto}`,
        headersRequest: {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        },
      });
      setConfigFetchUnidadMedida({
        url: `${URL}/unidades-medidas/${item.id_tipo_producto}`,
        headersRequest: {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        },
      });
      setConfigFetchAlmacen({
        url: `${URL}/almacenes/${item.id_almacen}`,
        headersRequest: {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        },
      });
      var fechaVencimiento = new Date(item.fecha_vencimiento_producto);
      setFechaVencimientoState(fechaVencimiento.toLocaleDateString()) 
    
      var fechaCompra = new Date(item.fecha_compra);
      setFechaCompaState(fechaCompra.toLocaleDateString()) 
    },[item])

    //console.log(fetchDataProveedor)
      
  return (
    <MDBModal
    staticBackdrop
    stabindex="-1"
    show={optSmModalDetalles}
    setShow={setOptSmModalDetalles}
  >
    <MDBModalDialog centered>
      <MDBModalContent>
        <MDBModalHeader>
          <MDBModalTitle>
            <h5>Ver Detalles Del Producto:</h5>
          </MDBModalTitle>
          <MDBBtn
            className="btn-close"
            color="none"
            onClick={toggleShowDetalles}
          ></MDBBtn>
        </MDBModalHeader>
        <MDBModalBody>
          <div className="container">
            <div>
            <h4>Nombre del Producto: <b>{item.descripcion_producto}</b></h4>
            </div>
            <div>
            <h4>Cantidad: <b>{item.cantidad_producto}</b></h4>
            </div>
            <div>
            <h4>Fecha de Compra: <b>{fechaCompaState}</b></h4>
            </div>
            <div>
            <h4>Fecha de Vencimiento: <b>{fechaVencimientoState}</b></h4>
            </div>
            <div>
            <h4>Almacen: <b>{fetchDataAlmacen.descripcion_almacen}</b></h4>
            </div>
            <div>
            <h4>Proveedor: <b>{fetchDataProveedor.nombre_proveedor}</b></h4>
            </div>
            <div>
            <h4>Tipo de producto: <b>{fetchDataTipoProductos.descripcion_tipo_producto}</b></h4>
            </div>
            <div>
            <h4>Unidad De Medida: <b>{fetchDataUnidadMedida.descripcion_unidad_medida}</b></h4>
            </div>
          </div>
        </MDBModalBody>
      </MDBModalContent>
    </MDBModalDialog>
  </MDBModal>
  )
}

export default DetallesProductoModal