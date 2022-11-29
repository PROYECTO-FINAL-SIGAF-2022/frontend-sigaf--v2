import LayoutContainer from "../../../components/layouts/LayoutContainer";

import "./Index.css";

import { useState } from "react";

import { TabContent, TabPane, Col } from "reactstrap";

import { MDBBtn, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalHeader, MDBModalTitle, MDBTabs, MDBTabsContent, MDBTabsItem, MDBTabsLink, MDBTabsPane } from "mdb-react-ui-kit";
import PagosPersonal from "./formularios/pagosPersonal/PagosPersonal";
import GastosMaquinas from "./formularios/gastosMaquinas/GastosMaquinas";
import TotalesEgresos from "./formularios/totalesEgresos/TotalesEgresos";
import { useLocation } from "react-router-dom";

const Precios = () => {
  // const [activeTab, setActiveTab] = useState("1");

  // const toggleTab = tab => {
  //   setActiveTab(tab);
  // };
  const { state } = useLocation();
  const [basicActive, setBasicActive] = useState(state?.tab || "tab1");

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  return (
    <LayoutContainer>
            {/* <div style={{ textAlign: "center" }}>
            </div> */}
              <h1 className="text-center text-dark">Egresos o Costos</h1>

            <MDBTabs className='mb-3 px-3'>
              <MDBTabsItem>
                <MDBTabsLink onClick={() => handleBasicClick("tab1")} active={basicActive === "tab1"}>
                  Total General
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink onClick={() => handleBasicClick("tab2")} active={basicActive === "tab2"}>
                  Pagos Personal
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink onClick={() => handleBasicClick("tab3")} active={basicActive === "tab3"}>
                  Gastos Maquinas
                </MDBTabsLink>
              </MDBTabsItem>
              {/* <MDBTabsItem>
                <MDBTabsLink onClick={() => handleBasicClick("tab4")} active={basicActive === "tab4"}>
                  Productos
                </MDBTabsLink>
              </MDBTabsItem> */}
            </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={basicActive === "tab1"}><TotalesEgresos/></MDBTabsPane>
        <MDBTabsPane show={basicActive === "tab2"}><PagosPersonal/></MDBTabsPane>
        <MDBTabsPane show={basicActive === "tab3"}><GastosMaquinas/></MDBTabsPane>
        {/* <MDBTabsPane show={basicActive === "tab4"}>Tab 4 content</MDBTabsPane> */}
      </MDBTabsContent>
            {/* <Col xs={12}>
            <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />
            <TabContent activeTab={activeTab}>
              <TabPane tabId='1'>
                <MaquinasTabContent/>
              </TabPane>
              <TabPane tabId='2'>
                <ProductosTabContent/>
              </TabPane>
              <TabPane tabId='3'>
                <AlmacenesTabContent/>
              </TabPane>
              <TabPane tabId='4'>
                <PersonalTabContent/>
              </TabPane>
            </TabContent>
            </Col> */}
    </LayoutContainer>
  );
};

export default Precios;
