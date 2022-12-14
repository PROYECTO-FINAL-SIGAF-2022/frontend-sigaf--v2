import LayoutContainer from "../../../components/layouts/LayoutContainer";

import "./index2.css";

import { useState } from "react";

import {
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane
} from "mdb-react-ui-kit";
import VentasMaquinas from "./VentasMaquinas/VentasMaquinas";
import VentasCosechas from "./VentasCosechas/VentasCosechas";
import VentasAlmacenes from "./VentasAlmacenes/VentasAlmacenes";
import TotalGeneralIngresos from "./TotalGeneralIngresos/TotalGeneralIngresos";
import { useLocation } from "react-router-dom";

const Costos = () => {
  const { state } = useLocation();
  const [basicActive, setBasicActive] = useState(state?.tab || "tab1");
  // console.log(basicActive);
  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  return (
    <LayoutContainer>
       <div style={{marginTop:'50px'}}>

       <MDBTabs className="mb-3 px-3">
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab1")}
            active={basicActive === "tab1"}
          >
            Total General
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab2")}
            active={basicActive === "tab2"}
          >
            Venta Cosechas
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab3")}
            active={basicActive === "tab3"}
          >
            Venta Maquinas
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab4")}
            active={basicActive === "tab4"}
          >
            Venta Almacenes
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={basicActive === "tab1"}><TotalGeneralIngresos/></MDBTabsPane>
        <MDBTabsPane show={basicActive === "tab2"}><VentasCosechas/></MDBTabsPane>
        <MDBTabsPane show={basicActive === "tab3"}><VentasMaquinas/></MDBTabsPane>
        <MDBTabsPane show={basicActive === "tab4"}><VentasAlmacenes/></MDBTabsPane>
      </MDBTabsContent>
       </div>
      
    </LayoutContainer>
  );
};

export default Costos;
