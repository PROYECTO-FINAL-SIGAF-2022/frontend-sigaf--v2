import React, { useRef, useState, useEffect } from 'react'
import '@fullcalendar/react/dist/vdom';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import AgregarEvento from './AgregarEvento';
import LayoutContainer from '../../components/layouts/LayoutContainer'
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from '@fullcalendar/core/locales/es';
import { useFetch } from "../../hooks/useFetch";
import { URL } from "../../utils/getUrl";


function TuCalendario() {

  const [setConfigFetchParcelaCultivo, fetchDataParcelaCultivo, loadingParcelaCultivo, errorParcelaCultivo] = useFetch()
  const [setConfigFetchParcela, fetchDataParcela, loadingParcela, errorParcela] = useFetch()
  const [setConfigFetchHistorialParcela, fetchDataHistorialParcela, loadingHistorialParcela, errorHistorialParcela] = useFetch()

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
    getParcelaCultivo();
    getParcela();
  }, []);

  //console.log(fetchDataParcelaCultivo)
  console.log(fetchDataParcela)
  //console.log(fetchDataHistorialParcela)

  const [modalOpen, setModalOpen] = useState(false);
  
  const calendarRef = useRef(null);
  
  const onEventAdded = event => {
    let calendarApi = calendarRef.current.GetApi()
    calendarApi.addEvent(event)
  }
  

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
                      <select className="form-select" aria-label="Default select example">
                        <option selected></option>
                        <option value="1">Parcela1</option>
                        <option value="2">Parcela2</option>
                        <option value="3">Parcela3</option>
                      </select>

                      <p></p>
                      {/* <button onClick={() => setModalOpen(true)}>Agregar Evento</button> */}
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

                          eventClick={
                            function (arg) {
                              alert(arg.event.title)
                              alert(arg.event.start)
                            }
                          }
                          /* footerToolbar={{
                           center: 'toggleMonth toggleWeek toggleDay',
                         }} 
                         customButtons={{
                           newAppointment: {
                             text: 'Nueva Actividad',
                             click: () => {
                               dateClickHandler();
                             },
                           },
                           toggleDay: {
                             text: 'Hoy',
                             click: () => {
                               calendar.current.getApi().changeView('dayGridDay');
                             }
                           },
                           toggleWeek: {
                             text: 'Semana',
                             click: () => {
                               calendar.current.getApi().changeView('dayGridWeek');
                             }
                           },
                           toggleMonth: {
                             text: 'Mes',
                             click: () => {
                               calendar.current.getApi().changeView('dayGridMonth')
                             }
                           },
                         }}  */

                          events={fetchDataParcelaCultivo.map(items => ({
                            title: items.id_parcela,
                            description:"",
                            start: items.fecha_inicio,
                            end: items.fecha_final,
                            color: "#00da41"
                          }))
                          }

                        /* events={[
                          {
                            title: fetchDataCampania[0].descripcion_campania,
                            start: fetchDataCampania[0].fecha_inicio,
                            end: fetchDataCampania[0].fecha_final,
                            color: "#00da41"
                          },
                        ]} */
                        />^

                      </div>
                      {/* <AgregarEvento isOpen={modalOpen} onClose={() => setModalOpen(false)} onEventAdded={event => onEventAdded(event)} /> */}

                    </div>
                  </div>
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