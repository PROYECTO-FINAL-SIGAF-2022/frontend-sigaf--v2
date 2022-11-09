import React, { useEffect, useState  } from 'react'
import LayoutContainer from "../../components/layouts/LayoutContainer";
import Footer from "../../components/layouts/Footer";
import { useParams } from 'react-router';
import { useFetch } from "../../hooks/useFetch";
import { URL } from "../../utils/getUrl";
const DetallesProductos = () => {
   const {productoID} = useParams()
   const [setConfigFetchProductos, fetchDataProductos] = useFetch();
   const [setConfigFetchProveedor, fetchDataProveedor] = useFetch();
   const [setConfigFetchTipoProductos, fetchDataTipoProductos] = useFetch();
   const [setConfigFetchUnidadMedida, fetchDataUnidadMedida] = useFetch();
   
   const getProductos =  () => {
     setConfigFetchProductos({
      url: `${URL}/productos/${productoID}`,
      headersRequest: {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    });

    
  };

  useEffect(() => {
    getProductos();
  }, []);
  
const [fechaVencimientoState, setFechaVencimientoState] = useState('');
const [fechaCompaState, setFechaCompaState] = useState('');
  

useEffect(()=>{
    //console.log(fetchDataProductos.id_proveedor)
   /*   */
   setConfigFetchProveedor({
    url: `${URL}/proveedores/${fetchDataProductos.id_proveedor}`,
    headersRequest: {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    },
  });
  setConfigFetchTipoProductos({
    url: `${URL}/tipo-productos/${fetchDataProductos.id_tipo_producto}`,
    headersRequest: {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    },
  });
  setConfigFetchUnidadMedida({
    url: `${URL}/unidades-medidas/${fetchDataProductos.id_tipo_producto}`,
    headersRequest: {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    },
  });

  var fechaVencimiento = new Date(fetchDataProductos.fecha_vencimiento_producto);
  setFechaVencimientoState(fechaVencimiento.toLocaleDateString()) 

  var fechaCompra = new Date(fetchDataProductos.fecha_compra);
  setFechaCompaState(fechaCompra.toLocaleDateString()) 
},[fetchDataProductos])


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
                    <div class="containerDetalles">
                                <div class="text-center py-5">
                                <img src="https://cdn-icons-png.flaticon.com/512/2713/2713463.png" alt class="ui-w-100 rounded-circle"/>

                                <div class="col-md-8 col-lg-6 p-0 mx-auto">
                                    <h4 class="font-weight-bold my-4"><b>{fetchDataProductos?.descripcion_producto}</b></h4>
                                    <div class="text-muted mb-4">
                                        <h4>Cantidad Del Producto: <b>{fetchDataProductos?.cantidad_producto}</b></h4>
                                    </div>
                                    <div class="text-muted mb-4">
                                        <h4>Fecha De Vencimiento: <b>{fechaVencimientoState}</b></h4>
                                    </div>
                                    <div class="text-muted mb-4">
                                        <h4>Precio Total Del Producto: <b>{fetchDataProductos?.precio_total_producto}</b></h4>
                                    </div>
                                    <div class="text-muted mb-4">
                                        <h4>Fecha de compra: <b>{fechaCompaState}</b></h4>
                                    </div>
                                    <div class="text-muted mb-4">
                                        <h4>Proveedor: <b>{fetchDataProveedor?.nombre_proveedor}</b></h4>
                                    </div>
                                    <div class="text-muted mb-4">
                                        <h4>Tipo De Producto: <b>{fetchDataTipoProductos?.descripcion_tipo_producto}</b></h4>
                                    </div>
                                    <div class="text-muted mb-4">
                                        <h4>Unidad de Medida: <b>{fetchDataUnidadMedida?.descripcion_unidad_medida}</b></h4>
                                    </div>
                                    
                                </div>

                                <div class="text-center">
                                    <a href="#" class="btn icon-btn borderless btn-outline-twitter btn-lg btn-round">
                                    <span class="ion ion-logo-twitter"></span>
                                    </a>
                                    <a href="#" class="btn icon-btn borderless btn-outline-facebook btn-lg btn-round">
                                    <span class="ion ion-logo-facebook"></span>
                                    </a>
                                    <a href="#" class="btn icon-btn borderless btn-outline-instagram btn-lg btn-round">
                                    <span class="ion ion-logo-instagram"></span>
                                    </a>
                                </div>
                        </div>    
                        </div>
                    </div>
                  </div> 
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <div className="content-backdrop fade"></div>
      </div>
    </LayoutContainer>
  )
}

export default DetallesProductos