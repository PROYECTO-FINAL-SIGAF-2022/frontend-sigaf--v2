import React, { useRef, useState, useEffect, Component } from 'react'
import '@fullcalendar/react/dist/vdom';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
//import AgregarEvento from './AgregarEvento';
import LayoutContainer from '../../components/layouts/LayoutContainer'
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from '@fullcalendar/core/locales/es';
import { useFetch } from "../../hooks/useFetch";
import { URL } from "../../utils/getUrl";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom"
import { elementClosest } from 'fullcalendar';
import DetallesModal from './DetalllesEventos.jsx/DetallesModal';
import { Tooltip } from "bootstrap";

function TuCalendario() {

  const [setConfigFetchParcelaCultivo, fetchDataParcelaCultivo] = useFetch()
  const [setConfigFetchParcela, fetchDataParcela] = useFetch()
  const [setConfigFetchHistorialParcela, fetchDataHistorialParcela] = useFetch()
  const [setConfigFetchActividad, fetchDataActividades] = useFetch()

  const getActividades = () => {
    setConfigFetchActividad({
      url: `${URL}/actividades`,
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
  const getParcela = () => {
    setConfigFetchParcela({
      url: `${URL}/parcelas`,
      headersRequest: {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    });
  };
  const getHistorialParcela = () => {
    setConfigFetchHistorialParcela({
      url: `${URL}/historiales`,
      headersRequest: {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    });
  };
  

  useEffect(() => {
    getParcela();
    getHistorialParcela();
    getActividades()
  }, []);

/*   console.log(fetchDataParcelaCultivo)
  console.log(fetchDataParcela) */

  console.log(fetchDataActividades)

  const [optSmModalDetalles, setOptSmModalDetalles] = useState(false);
  const [datosHistorial, setDatosHistorial] = useState("");
  const toggleShowDetalles = (item) => {
    console.log(item)
    setOptSmModalDetalles(!optSmModalDetalles);
    setDatosHistorial(item)
  }
 



  const [modalOpen, setModalOpen] = useState(false);

  const calendarRef = useRef(null);

  const onEventAdded = event => {
    let calendarApi = calendarRef.current.GetApi()
    calendarApi.addEvent(event)
  }


  const fechaActual = new Date('11/11/2022')
  let tooltipInstance = null;
 // console.info(fechaActual)


/*  const handleMouseEnter = (info) => {
  if (info.event.title) {
    tooltipInstance = new Tooltip(info.el, {
      title: `La Actividad es: ${info.event.title}`,
      html: true,
      placement: "top",
      trigger: "hover",
      container: "body",
     
    });

    tooltipInstance.show();
  }
};

const handleMouseLeave = (info) => {
  console.log(tooltipInstance._isEnabled)
  if (tooltipInstance) {
    tooltipInstance.dispose();
    tooltipInstance = null;
    //tooltipInstance._isEnabled()
    //console.info(tooltipInstance)
  }
}; */
 
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

                      {/* filtro */}
                      <select className="form-select" aria-label="Default select example" defaultValue=" ">
                        <option disabled value=" ">Seleccione una Parcela</option>
                        {fetchDataParcela?.map(elemento => {
                         return(
                          <option key={elemento?.id_parcela} value={elemento?.id_parcela}>{elemento?.descripcion_parcela}</option>
                         ) 
                        }

                        )}
                      </select>
                      
                      <p></p>

                      <div style={{ width: '178%' }}>
                        <FullCalendar
                          locale={esLocale}
                          fixedWeekCount={false}
                          height={700}
                          plugins={[dayGridPlugin, interactionPlugin]}
                          initialView="dayGridMonth"

                          headerToolbar={{
                            start: 'prev today next',
                            center: 'title',
                            end: 'newAppointment',
                            
                          }}

                          eventClick={()=>{
                            fetchDataHistorialParcela?.map(item =>{
                              toggleShowDetalles(item)
                            })
                          }}
                          /* eventMouseEnter={handleMouseEnter}
                          eventMouseLeave={handleMouseLeave} */
                          
                          events={fetchDataHistorialParcela?.map(items => {
                            var nombreActividad;
                            var fecha
                            var color = "red"
                            for (var i = 0; i < fetchDataHistorialParcela.length; i++) {
                              fecha = new Date(items.fecha_historial)
                              //console.log(fecha)
                              if(fetchDataActividades[i]?.id_actividad === items?.id_actividad){
                                nombreActividad = fetchDataActividades[i].descripcion_actividad
                              }

                              if(fecha > fechaActual){
                                  color = "#0a837f"
                                  //console.info("ganador =>", fecha)
                              }else if (fecha < fechaActual){
                                color = "#bfd4b7"
                                //console.info("ganador Fecha actual =>",fechaActual)
                              }else{
                                //console.info("Son Iguales")
                                color = "#f0b300"
                              }

                            }
                            //console.log(color)                            

                            return(
                              {
                                title: nombreActividad,
                                start: items.fecha_historial,
                                color: color,
                                
                              }
                            )
                          })
                          }

                        />

                      </div>
                      

                    </div>
                  </div>
                  <DetallesModal
                            optSmModalDetalles={optSmModalDetalles}
                            setOptSmModalDetalles={setOptSmModalDetalles}
                            toggleShowDetalles={toggleShowDetalles}
                            item = {datosHistorial}
                            />
                  <div className="col-sm-5 text-center text-sm-left">
                    <div className="card-body pb-0 px-0 px-md-4">
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
  )
}
export default TuCalendario