import React, { useRef, useState } from 'react'
import '@fullcalendar/react/dist/vdom'; 
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import AgregarEvento from './AgregarEvento';
import LayoutContainer from '../../components/layouts/LayoutContainer'
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from '@fullcalendar/core/locales/es';
  


function TuCalendario() {
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

                      {/* <button onClick={() => setModalOpen(true)}>Agregar Evento</button> */}
                      <div style={{ width:'178%' }}>
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
                          }} */
                          customButtons={{
                            newAppointment: {
                              text: 'Nueva Actividad',
                              /* click: () => {
                                dateClickHandler();
                              }, */
                            },
                            /* toggleDay: {
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
                            }, */
                          }}
                          events={[
                            {
                              title: 'Naranja',
                              start:"2022-11-04",
                              end:"2022-11-08"
                            },
                            {
                              title: 'Algodon',
                              start:"2022-11-04",
                              end:"2022-11-08"
                            },
                            {
                              title: 'Senora',
                              start:"2022-11-15",
                              end:"2022-11-20"
                            },
                          ]}
                          
                        />

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