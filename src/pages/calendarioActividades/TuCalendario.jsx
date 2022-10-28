import LayoutContainer from "../../components/layouts/LayoutContainer";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect,useState } from "react";
import DatePicker from "react-datepicker";
import { useSession, useSetSession } from "../../context/SessionProvider";
import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";




const locales = "date-fns/locale/es"
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const events = [
  {
    title: "CUMPLE",
    allDay: true,
    start: new Date(2022, 9, 14),
    end: new Date(2022, 9, 20)
  },{
    title: "CAS",
    allDay: true,
    start: new Date(2022, 9, 14),
    end: new Date(2022, 9, 20)
  },{
    title: "casa",
    allDay: true,
    start: new Date(2022, 9, 14),
    end: new Date(2022, 9, 20)
  },{
    title: "CUMPLE",
    allDay: true,
    start: new Date(2022, 9, 14),
    end: new Date(2022, 9, 20)
  },{
    title: "CUMPLE",
    allDay: true,
    start: new Date(2022, 9, 14),
    end: new Date(2022, 9, 20)
  },
]


function TuCalendario() {
  return (
    <LayoutContainer>
      
      <Calendar localizer={localizer} events={events}
        startAccessor="start" endAccessor="end"
        style={{ heigth: 500, margin: "100px" }}
      />
    </LayoutContainer>
  )
}

export default TuCalendario



