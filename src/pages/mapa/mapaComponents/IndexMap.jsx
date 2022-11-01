/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect, useCallback } from "react";
import L, { point } from "leaflet";

import {
  MapContainer,
  TileLayer,
  FeatureGroup
} from "react-leaflet";

import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import MapaPopup from "./MapaPopup";
// import MapaModal from "./MapaModal";
// import MapaLayers from "./mapaComponents/MapaLayers";
import MapaToolbar from "./MapaToolbar";
import ModalDatosParcela from "../mapaLayouts/ModalDatosParcela";
import { useFetch } from "../../../hooks/useFetch";
import { URL } from "../../../utils/getUrl";

const IndexMap = () => {
  const [optSmModal, setOptSmModal] = useState(false);

  const toggleShow = () => setOptSmModal(!optSmModal);

  const [center, setCenter] = useState({
    lat: "-26.18064675300086",
    lng: "-58.188628961794805"
  });
  const [mapLayers, setMapLayers] = useState([]);
  const [setConfigFetchEstablecimiento, fetchDataEstablecimiento, loadingEstablecimiento, errorEstablecimiento] = useFetch();

  const mapRef = useRef();
  const georeferenciaRef = useRef();

  const _onCreate = (e) => {
    const { layerType, layer } = e;
    // console.log(layerType);
    console.log(e);
    if (layerType === "polygon") {
      // console.log(layer);
      const { _leaflet_id } = layer;

      const arrayOfCoordinates = layer.getLatLngs()[0];
      const result = arrayOfCoordinates.map(({ lat, lng }) => (
        { lat, lng }
      ));
      console.log(result);

      setOptSmModal(true);

      const seeArea = L.GeometryUtil.geodesicArea(layer.getLatLngs());
      console.log(seeArea);
      // setMapLayers((layers) => [
      //   ...layers,
      //   { id: _leaflet_id, latlngs: layer.getLatLngs()[0] }
      // ]);
    }
  };

  const _onEdited = (e) => {
    // console.log(e);
    const {
      layers: { _layers }
    } = e;

    Object.values(_layers).forEach(({ _leaflet_id, editing }) => {
      setMapLayers((layers) =>
        layers.map(
          (l) => l.id === _leaflet_id
          /* ? { ...l, latlngs: { ...editing.latlngs[0] } }
                : l */
        )
      );
    });
  };

  const _onDeleted = (e) => {
    const {
      layers: { _layers }
    } = e;

    Object.values(_layers).forEach(({ _leaflet_id }) => {
      setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
  };

  const addAreaToMap = () => {
    if (!mapRef.current) return;
    georeferenciaRef.current?.remove();

    const map = mapRef.current;
    const georeferencia = JSON.parse(fetchDataEstablecimiento.georeferencia);
    const firstpolyline = new L.Polygon(georeferencia, {
      color: "#F5A587",
      weight: 0,
      fillOpacity: 0.75
    });
    firstpolyline.addTo(map);
    georeferenciaRef.current = firstpolyline;
    map.panTo(firstpolyline.getCenter());
  };

  useEffect(() => {
    setConfigFetchEstablecimiento({
      url: `${URL}/establecimiento-usuario`,
      headersRequest: {
        method: "GET"
      }
    });
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-useless-return
    if (!fetchDataEstablecimiento) return;

    addAreaToMap();
  }, [fetchDataEstablecimiento]);

  return (
    <>
    {
      loadingEstablecimiento && <h5 className="text-center text-warning">Cargando Geolocalización del establecimiento</h5>
    }
      <MapContainer style={{ zIndex: 1, width: "100%" }} center={center} zoom={14} ref={mapRef}>
        <FeatureGroup>
          <EditControl
            position="topleft"
            onCreated={_onCreate}
            // onEdited={_onEdited}
            // onDeleted={_onDeleted}
            draw={{
              rectangle: {
                shapeOptions: { showArea: true },
                allowIntersection: false
              },
              polyline: false,
              polygon: false,
              circle: false,
              circlemarker: false,
              marker: false
            }}
          />
          <MapaPopup toggleShow={toggleShow}/>
        </FeatureGroup>
        {/* <MapaLayers/> */}
        <MapaToolbar/>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <ModalDatosParcela
          optSmModal ={optSmModal}
          setOptSmModal ={setOptSmModal}
          toggleShow ={toggleShow}
          mapRef={mapRef}
      />
      </>
  );
};

export default IndexMap;
