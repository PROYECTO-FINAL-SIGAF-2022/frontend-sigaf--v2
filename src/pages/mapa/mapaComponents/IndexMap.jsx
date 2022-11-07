/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect, useCallback } from "react";
import L from "leaflet";

import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  Polygon,
  Rectangle
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
import { useSession } from "../../../context/SessionProvider";

const IndexMap = () => {
  const [setConfigFetchEstablecimiento, fetchDataEstablecimiento, loadingEstablecimiento] = useFetch();

  const [setConfigFetchParcelas, fetchDataParcelas] = useFetch([]);
  const [setFetchCampanias, fetchDataCampanias] = useFetch([]);
  const [optSmModal, setOptSmModal] = useState(false);
  const [establecimiento, setEstablecimiento] = useState([]);
  const [parcelas, setParcelas] = useState([]);
  const [editandoParcelas, setEditandoParcelas] = useState(false);
  const [parcelaSelected, setParcelaSelected] = useState({});
  const [campania, setCampania] = useState("");

  const mapRef = useRef();
  const parcelasRef = useRef([]);

  const session = useSession();

  const toggleShow = () => setOptSmModal(!optSmModal);

  const _onCreate = async (e) => {
    setEditandoParcelas(true);
    const { layerType, layer } = e;

    if (layerType === "rectangle") {
      // console.log(layer);
      const { _leaflet_id } = layer;

      const arrayOfCoordinates = layer.getLatLngs()[0];
      const resultGeoreferencia = arrayOfCoordinates.map(({ lat, lng }) => (
        [lat, lng]
      ));

      const superficieResult = (L.GeometryUtil.geodesicArea(arrayOfCoordinates) / 10000).toFixed(2);
      // console.log(result);

      const response = await fetch(`${URL}/parcelas`, {
        method: "POST",
        body: JSON.stringify({
          georeferencia: JSON.stringify(resultGeoreferencia),
          superficie: superficieResult
        }),
        headers: {
          Authorization: session,
          "Content-type": "application/json; charset=UTF-8"
        }
      });

      const resultFetch = await response.json();

      if (!response.ok) {
        alert("Error al crear la parcela");
      }
      loadParcelas();
      setEditandoParcelas(false);
      mapRef.current.removeLayer(e.layer);
      handleToggleParcela({ georeferencia: resultGeoreferencia, superficie: superficieResult });
    }
  };

  const _onEdited = (e) => {
    setEditandoParcelas(true);
    const {
      layers: { _layers }
    } = e;

    const parcelasEditadasParaGuardar = [];

    Object.values(_layers).forEach(({ _leaflet_id, _latlngs }) => {
      // calcular area
      const arrayOfCoordinates = _latlngs[0];
      const resultArea = (L.GeometryUtil.geodesicArea(arrayOfCoordinates) / 10000).toFixed(2);

      // convertir array de coordenadas
      const resultGeoreferencia = arrayOfCoordinates.map(({ lat, lng }) => (
        [lat, lng]
      ));
      // obtener parcela editada
      const parcelaEditada = parcelasRef.current.filter(parcela => parcela._leaflet_id === _leaflet_id)[0];

      // editar parcela
      parcelaEditada.superficie = resultArea;
      parcelaEditada.georeferencia = resultGeoreferencia;

      // obtener parcelas no editadas
      const parcelasNoEditadas = parcelasRef.current.filter(parcela => parcela.id !== parcelaEditada.id);
      // console.log(parcelaEditada);
      parcelasNoEditadas.push(parcelaEditada);
      parcelasRef.current = parcelasNoEditadas;
      setParcelas(parcelasNoEditadas);

      const promisesParcela = fetch(`${URL}/parcelas/${parcelaEditada.id}`, {
        method: "PUT",
        body: JSON.stringify({
          georeferencia: JSON.stringify(parcelaEditada.georeferencia),
          superficie: parcelaEditada.superficie,
          descripcion_parcela: parcelaEditada.descripcion_parcela
        }),
        headers: {
          Authorization: session,
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      parcelasEditadasParaGuardar.push(promisesParcela);
    });
    Promise.allSettled(parcelasEditadasParaGuardar)
      .then(function handleData (data) {
        setEditandoParcelas(false);
        loadParcelas();
      })
      .catch(function handleError (error) {
        console.log("Error" + error);
        alert("error al guardar las modificaciones de las parcelas");
      });
  };

  const _onDeleted = (e) => {
    const {
      layers: { _layers }
    } = e;

    const parcelasEliminadasParaGuardar = [];

    Object.values(_layers).forEach(({ _leaflet_id }) => {
      const parcelaEliminada = parcelasRef.current.filter(parcela => parcela._leaflet_id === _leaflet_id)[0];

      if (!parcelaEliminada) return;
      const updateParcelaRef = parcelasRef.current.filter(parcela => parcela.id !== parcelaEliminada?.id);

      parcelasRef.current = updateParcelaRef;
      const promisesParcela = fetch(`${URL}/parcelas/${parcelaEliminada?.id}`, {
        method: "DELETE",
        headers: {
          Authorization: session,
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      parcelasEliminadasParaGuardar.push(promisesParcela);
    });

    Promise.allSettled(parcelasEliminadasParaGuardar)
      .then(function handleData (data) {
        setEditandoParcelas(false);
        loadParcelas();
      })
      .catch(function handleError (error) {
        console.log("Error" + error);
        alert("error al guardar las modificaciones de las parcelas");
      });
  };

  // const onClick = (e) => {
  //   console.log(e);
  // };

  // ** cargar establacimientos y parcelas al estado
  const addEstablecimientoToMap = () => {
    if (!mapRef.current) return;
    // georeferenciaRef.current?.remove();
    const map = mapRef.current;
    const georeferencia = JSON.parse(fetchDataEstablecimiento.georeferencia);
    map.panTo(L.latLngBounds(georeferencia).getCenter());
    addParcelasToMap();
  };

  const addParcelasToMap = () => {
    // parcelasRef.current = [];

    if (!mapRef.current) return;
    if (fetchDataParcelas.length === 0) return;
    // console.log(fetchDataParcelas);
    const parcelas = fetchDataParcelas?.map((parcela) => {
      const georeferencia = JSON.parse(parcela.georeferencia);

      return { id: parcela.id_parcela, georeferencia, superficie: parcela.superficie, descripcion_parcela: parcela.descripcion_parcela };
    });
    // console.log(parcelas);
    setParcelas(parcelas);
  };

  const addParcelaToRef = (parcela, e) => {
    // console.log(e.target._leaflet_id);
    const parcelasMapa = parcelasRef.current;
    // console.log(parcela);

    if (parcelasMapa.includes(parcela)) return;
    parcela._leaflet_id = e.target._leaflet_id;

    const parcelaAdds = [...parcelasMapa, parcela];

    parcelasRef.current = parcelaAdds;
  };

  const loadParcelas = () => {
    setConfigFetchParcelas({
      url: `${URL}/parcelas`,
      headersRequest: {
        method: "GET"
      }
    });
  };

  const handleToggleParcela = (parcelaSelected) => {
    // console.log(parcelaSelected);
    setParcelaSelected(parcelaSelected);
    setOptSmModal(true);
  };

  const updateRef = (parcelas) => {
    parcelasRef.current = parcelas;
  };

  // mapRef.current?.on(L.Draw.Event.EDITED, function (e) {
  //   const layer = e.layer;
  //   console.log("first");
  // });
  // mapRef.current?.on("dragend", function (e) {
  //   console.log("dragend");
  // });

  // mapRef.current?.on("mousedown", function (e) {
  //   console.log("mousedown");
  // });

  // mapRef.current?.on("mouseup", function (e) {
  //   console.log("mouseup");
  // });

  // mapRef.current?.on("mouseover", function (e) {
  //   console.log("mouseover");
  // });

  // mapRef.current?.on("mouseout", function (e) {
  //   const layer = e.layer;
  //   console.log(e);
  //   console.log("mouseout");
  // });
  // console.log(parcelas);
  useEffect(() => {
    setFetchCampanias({
      url: `${URL}/campanias`,
      headersRequest: {
        method: "GET"
      }
    });

    return () => {
      setConfigFetchEstablecimiento(null);
      setConfigFetchParcelas(null);
      setEstablecimiento([]);
      setParcelas([]);
    };
  }, []);

  useEffect(() => {
    setConfigFetchEstablecimiento({
      url: `${URL}/establecimiento-usuario`,
      headersRequest: {
        method: "GET"
      }
    });

    const campaniaActiva = fetchDataCampanias.filter(campania => campania.activo === 1)[0];
    if (campaniaActiva) {
      setCampania(campaniaActiva.descripcion_campania);
    }
    loadParcelas();
  }, [fetchDataCampanias]);

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
      editandoParcelas && <h5 className="text-center text-warning">Actualizando Georeferencias de Parcelas</h5>
    }
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
            onDeleted={_onDeleted}
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

          <MapaToolbar campania={campania} fetchDataCampanias={fetchDataCampanias} setCampania={setCampania}/>

          {
            parcelas.length > 0 && parcelas.map(parcela => (
              <Rectangle key={parcela.id} color="red" bounds={parcela.georeferencia} interactive={true} eventHandlers={{
                // click: () => onClick(parcela.id),
                add: (e) => addParcelaToRef(parcela, e)
                // baselayerchange: () => onClick("baselayerchange"),
                // autopanstart: () => onClick("autopanstart"),
                // down: () => onClick("down"),
                // contextmenu: () => onClick("contextmenu"),
                // drag: () => onClick("drag"),
                // dragend: () => onClick("dragend"),
                // dragstart: () => onClick("dragstart"),
                // keydown: () => onClick("keydown"),
                // keypress: () => onClick("keypress"),
                // keyup: () => onClick("keyup"),
                // mousedown: () => onClick("mousedown"),
                // mousemove: () => onClick("mousemove")
                // mouseout: () => onClick("mouseout"),
                // mouseover: () => onClick("mouseover"),
                // mouseup: () => onClick("mouseup"),
                // move: () => onClick("move"),
                // moveend: () => onClick("moveend"),
                // movestart: () => onClick("movestart"),
                // preclick: () => onClick("preclick"),
                // predrag: () => onClick("predrag"),
                // resize: () => onClick("resize"),
                // update: () => onClick("update"),
                // unload: () => onClick(1)

              }}>
                <MapaPopup toggleShow={toggleShow} parcela={parcela} handleToggleParcela={handleToggleParcela}/>
              </Rectangle>
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

      {
        ("id" in parcelaSelected) && <ModalDatosParcela
          optSmModal ={optSmModal}
          setOptSmModal ={setOptSmModal}
          toggleShow ={toggleShow}
          parcelaSelected={parcelaSelected}
          loadParcelas = {loadParcelas}
          updateRef = {updateRef}
          parcelasRef = {parcelasRef.current}
          campania={campania}
      />
      }

      </>
  );
};

export default IndexMap;
