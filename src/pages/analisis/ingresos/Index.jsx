import LayoutContainer from "../../../components/layouts/LayoutContainer";

import "./Index.css";

import { useState } from "react";

import { TabContent, TabPane, Col } from "reactstrap";

import Tabs from "./Tabs";
import CosechaTabContent from "./CosechaTabContent";
import MaquinasTabContent from "./MaquinasTabContent";
import AlmacenesTabContent from "./AlmacenesTabContent";

const Costos = () => {
  const [activeTab, setActiveTab] = useState('1');

  const toggleTab = tab => {
    setActiveTab(tab);
  };

  return (
    <LayoutContainer>
            <div style={{ textAlign: "center" }}>
              <h1 style={{ textAlign: "left" }} className="fw-lighter">Ingresos o Ventas</h1>
            </div>
            <Col xs={12}>
            <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />
            <TabContent activeTab={activeTab}>
              <TabPane tabId='1'>
                <CosechaTabContent/>
              </TabPane>
              <TabPane tabId='2'>
                <MaquinasTabContent/>
              </TabPane>
              <TabPane tabId='3'>
                <AlmacenesTabContent/>
              </TabPane>
            </TabContent>
            </Col>
    </LayoutContainer>
  );
};

export default Costos;