import { useState, useRef } from "react";
import L from "leaflet";

import {
  MapContainer,
  TileLayer,
  FeatureGroup
} from "react-leaflet";

import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import MapaPopup from "./MapaPopup";
import MapaModal from "./MapaModal";
// import MapaLayers from "./MapaLayers";
import MapaToolbar from "./MapaToolbar";

const MapView = () => {
  const [optSmModal, setOptSmModal] = useState(false);

  const toggleShow = () => setOptSmModal(!optSmModal);

  const [center, setCenter] = useState({
    lat: "-26.18064675300086",
    lng: "-58.188628961794805"
  });
  const [mapLayers, setMapLayers] = useState([]);
  const mapRef = useRef();

  const _onCreate = (e) => {
    console.log(e);

    const { layerType, layer } = e;
    if (layerType === "polygon") {
      const { _leaflet_id } = layer;

      setMapLayers((layers) => [
        ...layers,
        { id: _leaflet_id /* , latlngs: layer.getLatLngs()[0]  */ }
      ]);
    }
  };

  const _onEdited = (e) => {
    console.log(e);
    const {
      layers: { _layers }
    } = e;

    Object.values(_layers).map(({ _leaflet_id, editing }) => {
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
    console.log(e);
    const {
      layers: { _layers }
    } = e;

    Object.values(_layers).forEach(({ _leaflet_id }) => {
      setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
  };

  return (
      <MapContainer style={{ zIndex: 1, width: "100%" }} center={center} zoom={13} ref={mapRef}>
        <FeatureGroup>
          <EditControl
            position="topleft"
            onCreated={_onCreate}
            onEdited={_onEdited}
            onDeleted={_onDeleted}
            draw={{
              rectangle: false,
              polyline: false,
              circle: false,
              circlemarker: false,
              marker: false
            }}
          />
          <MapaPopup toggleShow={toggleShow}/>
          <MapaModal
              optSmModal ={optSmModal}
              setOptSmModal ={setOptSmModal}
              toggleShow ={toggleShow}
          />
        </FeatureGroup>
        {/* <MapaLayers/> */}
        <MapaToolbar/>
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
  );
};

export default MapView;
