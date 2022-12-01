import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/layouts/Footer'
import LayoutContainer from '../../components/layouts/LayoutContainer'
import './styles/Historiales.css'
import cuadernos from './styles/img/cuadernos.png'
import { useFetch } from "../../hooks/useFetch";
import { URL } from "../../utils/getUrl";
import Loading from "../../components/layouts/Loading";
import Alerta from "../../components/layouts/Alerta";

const Historiales = () => {

	const [
		setConfigFetchParcelaCultivo, 
		fetchDataParcelaCultivo,
		loadingParcelaCultivo,
		errorParcelaCultivo,
	] = useFetch()

	const [
		setConfigFetchCultivo, 
		fetchDataCultivo,
	] = useFetch()

	const getCultivo = () => {
		setConfigFetchCultivo({
		  url: `${URL}/cultivos`,
		  headersRequest: {
			method: "GET",
			headers: {
			  "Content-type": "application/json; charset=UTF-8"
			}
		  }
		});
	  };

	const getParcelaCultivo = () => {
		setConfigFetchParcelaCultivo({
		  url: `${URL}/parcelas-cultivos`,
		  headersRequest: {
			method: "GET",
			headers: {
			  "Content-type": "application/json; charset=UTF-8"
			}
		  }
		});
	  };

	  useEffect(() => {
	
		getParcelaCultivo();
		getCultivo()
	  }, []);


	  console.log(fetchDataCultivo)
  return (
    
    <LayoutContainer>
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="row">
        <div className='contenedorAnalisis'>
        <section className="pt-80 pb-70">
			<div className="text-center mb-60 position-relative">
				<h5 className="font__family-montserrat font__weight-light text-uppercase font__size-18 text-blue brk-library-rendered" data-brk-library="component__title">
                    Todo el historial registrado</h5>
				
			
				<hr className="divider wow zoomIn brk-library-rendered" data-brk-library="component__title" style={{visibility: "visible", animationName: "zoomIn"}}/>
			</div>
			<div className="container">
				<div className="panel__wrapper-icon mb-100 brk-library-rendered" data-brk-library="component__panel">
					<div className="panel__head all-light">
						<img src={cuadernos} style={{ width: '80px'}}/>
						<p className="font__family-open-sans font__size-14">Aqui se encuentran todos los historiales registrado en la base de datos, podras descargarlos en pdf si lo desea</p>
					</div>
					{loadingParcelaCultivo && <Loading />}

					{errorParcelaCultivo?.msg && (
                          <Alerta
                            claseAlerta="danger"
                            mensajeAlerta={errorParcelaCultivo?.msg}
                          />
                        )}

					<ul className="panel__list">
					{fetchDataParcelaCultivo?.length > 0 && (
                          <>
                            {
                              
                            
                              fetchDataParcelaCultivo?.map((item) => {

								let options = { year: 'numeric', month: 'long', day: 'numeric' }
								const fecha = new Date(item?.fecha_inicio);
								const fechaConvertida = fecha.toLocaleDateString("es-ES", options);

								var descripcionCultivo;
                               // console.info(fetchDataProductos.length)

                                for (var i = 0; i < fetchDataParcelaCultivo?.length; i++) {
                                  if(item?.id_cultivo === fetchDataCultivo[i]?.id_cultivo){
                                    descripcionCultivo= fetchDataCultivo[i]?.descripcion_cultivo
                                  }
                                }

                                return( 
									<Link to= {`/detalles-trazabilidad/${item?.id_parcela_cultivo}`}>
									<li>
									<span className="line"></span>
									<i className="icon fa fa-home"></i> El registro fue iniciado la fecha <strong>{fechaConvertida}</strong> del cultivo: <strong>{descripcionCultivo}</strong>
								</li>
								</Link>
                              )})
                            }
                          </>
                        )}
						{/* 
						
						<li>
							<span className="line"></span>
							<i className="icon fab fa-gg"></i>Pellentesque posuere. Praesent turpis. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin
							urna dolor
						</li>
						<li>
							<span className="line"></span>
							<i className="icon far fa-gem"></i>Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo
							dolor, tempus sollicitudin urrna
						</li>
						<li>
							<span className="line"></span>
							<i className="icon fab fa-gg"></i>Pellentesque posuere. Praesent turpis. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin
							urna dolor
						</li>
						<li>
							<span className="line"></span>
							<i className="icon far fa-gem"></i>Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo
							dolor, tempus sollicitudin urrna
						</li>
						<li>
							<span className="line"></span>
							<i className="icon fab fa-gg"></i>Pellentesque posuere. Praesent turpis. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin
							urna dolor
						</li>
						*/}
                        
					</ul>
				</div>	
			</div>    
		</section>
    </div>
        </div>
      </div>
      <Footer />
      <div className="content-backdrop fade"></div>
    </div>
  </LayoutContainer>
  )
}

export default Historiales