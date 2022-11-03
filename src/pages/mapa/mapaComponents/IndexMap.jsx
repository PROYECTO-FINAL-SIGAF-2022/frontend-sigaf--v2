/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect, useCallback } from "react";
import L from "leaflet";

import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  Polygon
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

  const [establecimiento, setEstablecimiento] = useState([]);
  const [parcelas, setParcelas] = useState([]);
  const [setConfigFetchEstablecimiento, fetchDataEstablecimiento, loadingEstablecimiento, errorEstablecimiento] = useFetch();

  const [setConfigFetchParcelas, fetchDataParcelas, loadingParcelas, errorParcelas] = useFetch();

  const mapRef = useRef();
  const georeferenciaRef = useRef();

  const _onCreate = (e) => {
    const { layerType, layer } = e;
    // console.log(layerType);
    console.log(e);
    if (layerType === "rectangle") {
      // console.log(layer);
      const { _leaflet_id } = layer;

      const arrayOfCoordinates = layer.getLatLngs()[0];
      const result = arrayOfCoordinates.map(({ lat, lng }) => (
        { lat, lng }
      ));
      console.log(result);

      setOptSmModal(true);

      const seeArea = L.GeometryUtil.geodesicArea(layer.getLatLngs());
      // setParcelas((layers) => [
      //   ...layers,
      //   { id: _leaflet_id, latlngs: layer.getLatLngs()[0], layer }
      // ]);
    }
  };

  const _onEdited = (e) => {
    console.log(e);
    const {
      layers: { _layers }
    } = e;

    // Object.values(_layers).forEach(({ _leaflet_id, editing }) => {
    //   setParcelas((layers) =>
    //     layers.map(
    //       (l) => l.id === _leaflet_id
    //       /* ? { ...l, latlngs: { ...editing.latlngs[0] } }
    //             : l */
    //     )
    //   );
    // });
  };

  const _onDeleted = (e) => {
    const {
      layers: { _layers }
    } = e;

    Object.values(_layers).forEach(({ _leaflet_id }) => {
      setParcelas((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
  };

  const addEstablecimientoToMap = () => {
    if (!mapRef.current) return;
    georeferenciaRef.current?.remove();
    const map = mapRef.current;
    const georeferencia = JSON.parse(fetchDataEstablecimiento.georeferencia);
    map.panTo(L.latLngBounds(georeferencia).getCenter());
    addParcelasToMap();
  };

  // mapRef.current?.on(L.Draw.Event.CREATED, function (e) {
  //   const layer = e.layer;
  // });

  const addParcelasToMap = () => {
    if (!mapRef.current) return;
    if (fetchDataParcelas.length === 0) return;
    const parcelas = fetchDataParcelas.map((parcela) => {
      const georeferencia = JSON.parse(parcela.georeferencia);

      return { id: parcela.id_parcela, georeferencia, superficie: parcela.superficie };
    });
    // console.log(parcelas);
    setParcelas(parcelas);
  };

  const onClick = (e) => {
    console.log(e);
  };

  useEffect(() => {
    setConfigFetchEstablecimiento({
      url: `${URL}/establecimiento-usuario`,
      headersRequest: {
        method: "GET"
      }
    });

    setConfigFetchParcelas({
      url: `${URL}/parcelas`,
      headersRequest: {
        method: "GET"
      }
    });

    return () => {
      setConfigFetchEstablecimiento(null);
      setConfigFetchParcelas(null);
      // remove rectangle from map
      // establecimiento?.forEach(({ layer }) => {
      //   mapRef.current?._layers[layer?._leaflet_id]?.remove();
      //   // setParcelas(layers => layers?.filter(l => l?.id !== layer?._leaflet_id));
      // });

      setEstablecimiento([]);
      setParcelas([]);
    };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-useless-return
    if (!fetchDataEstablecimiento) return;

    addEstablecimientoToMap();
    setEstablecimiento(fetchDataEstablecimiento);
    mapRef.current?.getCenter();
  }, [fetchDataEstablecimiento]);

  useEffect(() => {
    // eslint-disable-next-line no-useless-return
    if (!fetchDataParcelas) return;
    addParcelasToMap();
  }, [fetchDataParcelas]);

  return (
    <>
    {
      loadingEstablecimiento && <h5 className="text-center text-warning">Cargando Geolocalización del establecimiento</h5>
    }
      <MapContainer style={{ zIndex: 1, width: "100%" }} center={{
        lat: "-26.18064675300086",
        lng: "-58.188628961794805"
      }} zoom={14} ref={mapRef}>
        <FeatureGroup>
          <EditControl
            position="topleft"
            onCreated={_onCreate}
            onEdited={_onEdited}
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
          <MapaToolbar/>

          {
            parcelas.length > 0 && parcelas.map(parcela => (
              <Polygon key={parcela.id} color="red" positions={parcela.georeferencia} interactive={true} eventHandlers={{ click: onClick, add: onClick }}/>
            ))
          }
        </FeatureGroup>
        {
          ("georeferencia" in establecimiento) && (
          <Polygon color="#F5A587" fillOpacity={"0.2"} positions={JSON.parse(establecimiento.georeferencia)} interactive={false} />
          )
       }

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        {/* <MapaLayers/> */}
      </MapContainer>
      <ModalDatosParcela
          optSmModal ={optSmModal}
          setOptSmModal ={setOptSmModal}
          // toggleShow ={toggleShow}
          mapRef={mapRef}
          establecimiento={establecimiento}
      />
      </>
  );
};

export default IndexMap;
