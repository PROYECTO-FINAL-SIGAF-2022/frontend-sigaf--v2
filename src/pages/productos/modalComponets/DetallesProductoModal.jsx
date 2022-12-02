
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
          <div >
              <div className="d-flex justify-content-start">
                <div className="image-container">
                {
                                    fetchDataTipoProductos?.descripcion_tipo_producto == "Fertilizante" ? 
                                    <img
                                    src="https://cdn-icons-png.flaticon.com/512/2713/2713463.png"
                                    alt=""
                                    style={{ width: "150px", height: "150px" }}
                                    />
                                    : fetchDataTipoProductos?.descripcion_tipo_producto == "Semilla" ?
                                    <img
                                      src="https://cdn.pixabay.com/photo/2014/12/22/00/04/bag-576711_960_720.png"
                                      alt=""
                                      style={{ width: "150px", height: "150px" }}
                                    />
                                    
                                  : fetchDataTipoProductos?.descripcion_tipo_producto == "Estiercol" ?
                                  <img
                                    src="https://images.vexels.com/media/users/3/177604/isolated/preview/d78fad5055508b80f4cd7917a874ec9f-el-tarro-puede-cubrir-plano.png"
                                    alt=""
                                    style={{ width: "150px", height: "150px" }}
                                  />
                                  : null
                                  }
                    
                </div>
                <div className="userData ml-3 mx-4 my-4">
                  <h2
                    className="d-block"
                    style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                  >
                    <a href="#">{item?.descripcion_producto}</a>
                  </h2>
                  <h6 className="d-block">
                    <a href="#">Tipo:</a>{" "}
                    <strong >
                    {fetchDataTipoProductos?.descripcion_tipo_producto}
                    </strong>
                  </h6>
                  <h6 className="d-block">
                    <a href="#">Cantidad Comprada:</a>{" "}
                    <strong >
                    {item.cantidad_producto} {fetchDataUnidadMedida?.descripcion_unidad_medida}
                    </strong>
                  </h6>
                  {/* <h6 className="d-block"><a href="#">300</a> Blog Posts</h6> */}
                </div>
                <div className="ml-auto">
                  <input
                    type="button"
                    className="btn btn-primary d-none"
                    id="btnDiscard"
                    value="Discard Changes"
                  />
                </div>
              </div>

              <div className="row">
                <div className="">
                  <div className="tab-content ml-1" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="basicInfo"
                      role="tabpanel"
                      aria-labelledby="basicInfo-tab"
                    >
                      <div className="row">
                        <div className="">
                          <label style={{ fontWeight: "bold" }}>
                            Fecha de Compra:
                          </label>
                        </div>
                        <div className="col-md-8 col-6">
                        {fechaCompaState}
                        </div>
                      </div>
                      <hr />

                      <div className="row">
                        <div className="">
                          <label style={{ fontWeight: "bold" }}>
                            Fecha de Vencimiento:
                          </label>
                        </div>
                        <div className="col-md-8 col-6">
                        {fechaVencimientoState}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="">
                          <label style={{ fontWeight: "bold" }}>
                            Almacen Guardado: 
                          </label>
                        </div>
                        <div className="col-md-8 col-6">
                        {fetchDataAlmacen?.descripcion_almacen}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="">
                          <label style={{ fontWeight: "bold" }}>
                            Proveedor del producto: 
                          </label>
                        </div>
                        <div className="col-md-8 col-6">
                        {fetchDataProveedor?.nombre_proveedor}
                        </div>
                      </div>
                      <hr />
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
        </MDBModalBody>
      </MDBModalContent>
    </MDBModalDialog>
  </MDBModal>
  )
}

export default DetallesProductoModal