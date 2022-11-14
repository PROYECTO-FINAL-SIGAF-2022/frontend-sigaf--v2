import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane
} from "mdb-react-ui-kit";
import { useState } from "react";
import ListadoActividades from "../actividades/ListadoActividades";
import ListadoCultivos from "../cultivos/ListadoCultivos";
// import { useFetch } from "../../../hooks/useFetch";
// import { URL } from "../../../utils/getUrl";
import FormParcelaCultivo from "../parcelaCultivo/FormParcelaCultivo";
// import ModalTabsParcela from "./ModalTabsParcela";

const ModalDatosParcela = ({
  optSmModal,
  setOptSmModal,
  toggleShow,
  parcelaSelected,
  loadParcelas,
  updateRef,
  parcelasRef,
  campania
}) => {
  const [basicActive, setBasicActive] = useState("tab1");
  // console.log(parcelaSelected);
  // const [setConfigParcelas, fetchDataParcelas] = useFetch([]);

  // console.log(fetchDataParcelas);
  const handleBasicClick = (value) => {
    if (value === basicActive) return;
    setBasicActive(value);
  };

  // useEffect(() => {
  //   if (!("id" in parcelaSelected)) return;
  //   setConfigParcelas({
  //     url: `${URL}/parcelas/${parcelaSelected.id}`,
  //     headersRequest: {
  //       method: "GET"
  //     }
  //   });
  // }, [parcelaSelected]);
  return (
    <MDBModal
      staticBackdrop
      stabindex="-1"
      show={optSmModal}
      setShow={setOptSmModal}
    >
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Opciones Parcela</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={toggleShow}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <MDBTabs className="mb-3">
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleBasicClick("tab1")}
                  active={basicActive === "tab1"}
                >
                  Datos Parcela
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                {campania
                  ? (
                  <MDBTabsLink
                    onClick={() => handleBasicClick("tab2")}
                    active={basicActive === "tab2"}
                  >
                    Cultivo
                  </MDBTabsLink>
                    )
                  : (
                  <MDBTabsLink className="text-danger">
                    Debe seleccionar una campaña
                  </MDBTabsLink>
                    )}
              </MDBTabsItem>

              <MDBTabsItem>
                {campania
                  ? (
                  <MDBTabsLink
                    onClick={() => handleBasicClick("tab3")}
                    active={basicActive === "tab3"}
                  >
                    Actividades
                  </MDBTabsLink>
                    )
                  : (
                  <MDBTabsLink className="text-danger">
                    Debe seleccionar una campaña
                  </MDBTabsLink>
                    )}
              </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>
              <MDBTabsPane show={basicActive === "tab1"}>
                <FormParcelaCultivo
                  parcelaSelected={parcelaSelected}
                  loadParcelas={loadParcelas}
                  updateRef={updateRef}
                  parcelasRef={parcelasRef}
                />
              </MDBTabsPane>
              <MDBTabsPane show={basicActive === "tab2"}>
                <ListadoCultivos parcelaSelected={parcelaSelected} campania={campania}/>
              </MDBTabsPane>
              <MDBTabsPane show={basicActive === "tab3"}>
               <ListadoActividades parcelaSelected={parcelaSelected} campania={campania}/>
              </MDBTabsPane>
            </MDBTabsContent>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

export default ModalDatosParcela;
