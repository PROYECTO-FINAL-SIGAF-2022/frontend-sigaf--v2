// import { useMap, useMapEvents } from "react-leaflet";
// import { useState } from "react";
// import { useMapEvent } from "react-leaflet";
import Control from "react-leaflet-custom-control";
const MapaToolbar = ({ campania, fetchDataCampanias, setCampania }) => {
  //   const map = useMap();
  //   console.log("map center:", map.getCenter());

  //   map.
  //   useMapEvent("click", (e) => {
  //     // console.log("first");
  //     console.log(e.latlng);
  //   });

  //   useEffect(() => {
  //     if (fetchDataCampanias.length === 0) return;
  //   }, [fetchDataCampanias]);
  const handleChangeSelect = (e) => {
    // console.log(e.target.value);
    setCampania(e.target.value);
  };
  return (
    <Control prepend position='topright'>
    <div className="row">

    <select className="form-select mb-2" defaultValue={campania} onChange={handleChangeSelect}>
        <option value="" disabled>Campaña</option>
        {
            fetchDataCampanias.map(campania => (

        <option key={campania.id_campania} value={campania.descripcion_campania}>{campania.descripcion_campania}</option>
            ))
        }
    </select>
    </div>
    <div className="row d-inline mb-3">
        <a href="#" className="table-link" data-bs-toggle="tooltip" title="Crear Actividad">
            <span className="fa-stack">
                <i className="fa fa-square fa-stack-2x"></i>
                <i className="fa fa-solid fa-plus fa-stack-1x fa-inverse"></i>
            </span>
        </a>
        {/* <a href="#" className="table-link" data-bs-toggle="tooltip" title="Dibujar parcela">
            <span className="fa-stack">
                <i className="fa fa-square fa-stack-2x"></i>
                <i className="fa fa-solid fa-pencil fa-stack-1x fa-inverse"></i>
            </span>
        </a>
        <a href="#" className="table-link" data-bs-toggle="tooltip" title="Crear Cultivo">
            <span className="fa-stack">
                <i className="fa fa-square fa-stack-2x"></i>
                <i className="fa fa-solid fa-tree fa-stack-1x fa-inverse"></i>
            </span>
        </a> */}
    </div>

    {/* <div className="row mt-2" style={{ width: "200px" }}>
        <div className="btn-group mb-2">
            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Cultivos
            </button>
            <ul className="dropdown-menu">
            <li>
                <a className="dropdown-item" href="#">
                    <input className="form-check-input" type="checkbox" value="" id="todoCultivos"/>
                    {" "}
                    <label className="form-check-label" htmlFor="todoCultivos">
                        Todos
                    </label>
                </a>
            </li>
            <li>
                <a className="dropdown-item" href="#">
                    <input className="form-check-input" type="checkbox" value="" id="otrosCultivos"/>
                    {" "}
                    <label className="form-check-label" htmlFor="otrosCultivos">
                        Otros Cultivos
                    </label>
                </a>
            </li>
            </ul>
        </div>

        <div className="btn-group mb-2">
            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Variedades
            </button>
            <ul className="dropdown-menu">
                ...
            </ul>
        </div>
        <div className="btn-group mb-2">
            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Explotaciones
            </button>
            <ul className="dropdown-menu">
                ...
            </ul>
        </div>
        <div className="btn-group mb-2">
            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Ultimos Trabajos
            </button>
            <ul className="dropdown-menu">
                ...
            </ul>
        </div>
    </div> */}
  </Control>
  );
};

export default MapaToolbar;
