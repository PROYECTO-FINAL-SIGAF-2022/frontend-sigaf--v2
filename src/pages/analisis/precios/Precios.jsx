import LayoutContainer from "../../../components/layouts/LayoutContainer";

import "./Precios.css";

import { useState } from "react";

import { TabContent, TabPane, Col } from "reactstrap";

import Tabs from "./Tabs";

import PersonalTabContent from "./PersonalTabContent";
import ProductosTabContent from "./ProductosTabContent";

const Precios = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggleTab = tab => {
    setActiveTab(tab);
  };

  return (
    <LayoutContainer>
            <div style={{ textAlign: "center" }}>
              <h1 style={{ textAlign: "left" }} className="fw-lighter">Precios</h1>
            </div>
            <Col xs={12}>
            <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />
            <TabContent activeTab={activeTab}>
              <TabPane tabId='1'>
                <PersonalTabContent/>
              </TabPane>
              <TabPane tabId='2'>
              </TabPane>
              <TabPane tabId='3'>
                <ProductosTabContent/>
              </TabPane>
              <TabPane tabId='4'>
              </TabPane>
            </TabContent>
            </Col>
    </LayoutContainer>
  );
};

export default Precios;