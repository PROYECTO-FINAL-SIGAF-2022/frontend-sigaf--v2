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

  // const mapRef = useRef(null);
  const [center, setCenter] = useState({
    lat: "-26.18064675300086",
    lng: "-58.188628961794805"
  });
  const [mapLayers, setMapLayers] = useState([]);
  const [setConfigFetchEstablecimiento, fetchDataEstablecimiento, loadingEstablecimiento, errorEstablecimiento] = useFetch();

  const mapRef = useRef();

  const _onMounted = () => {
    console.log("Cargar coordenadas establecimiento");
    if (!mapRef.current) return;

    const map = mapRef.current;

    // const pointA = new L.LatLng(-25.820252909960004, -58.07477700699445);
    // const pointB = new L.LatLng(-25.806884763425963,
    //   -58.06910655012652);
    // const pointC = new L.LatLng(-25.811675833328245,
    //   -58.056820560246);
    // const pointD = new L.LatLng(-25.825197969104742,
    //   -58.06446708541639);
    // const pointE = new L.LatLng(-25.821180124281224,
    //   -58.073746014836644);

    const array = [
      {
        lat: -25.825352498875056,
        lng: -58.077182655362655
      },
      {
        lat: -25.806807486517254,
        lng: -58.077182655362655
      },
      {
        lat: -25.806807486517254,
        lng: -58.053641667759415
      },
      {
        lat: -25.825352498875056,
        lng: -58.053641667759415
      }
    ];

    const pointList = array.map(({ lat, lng }) => new L.LatLng(lat, lng));

    const firstpolyline = new L.Polygon(pointList, {
      // color: "red",
      color: "#03f", smoothFactor: 0, opacity: 0.0

    });
    firstpolyline.addTo(map);
    ;
    map.panTo(firstpolyline.getCenter());
  };

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
    // console.log(e);
    const {
      layers: { _layers }
    } = e;

    Object.values(_layers).forEach(({ _leaflet_id }) => {
      setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
  };
  // console.log(mapRef);

  useEffect(() => {
    setConfigFetchEstablecimiento({
      url: `${URL}/establecimiento-usuario`,
      headersRequest: {
        method: "GET"
      }
    });
  }, []);

  return (
    <>
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
            onMounted={_onMounted}
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
