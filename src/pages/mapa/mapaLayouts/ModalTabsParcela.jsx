import React, { useState } from "react";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from "mdb-react-ui-kit";
import FormParcelaCultivo from "../parcelaCultivo/FormParcelaCultivo";
const ModalTabsParcela = () => {
  const [basicActive, setBasicActive] = useState("tab1");

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  return (
    <>
      <MDBTabs className='mb-3'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick("tab1")} active={basicActive === "tab1"}>
            Datos Parcela
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick("tab2")} active={basicActive === "tab2"}>
            Cultivo
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick("tab3")} active={basicActive === "tab3"}>
            Actividades
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={basicActive === "tab1"}>
       <FormParcelaCultivo/>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "tab2"}>Tab 2 content</MDBTabsPane>
        <MDBTabsPane show={basicActive === "tab3"}>Tab 3 content</MDBTabsPane>
      </MDBTabsContent>
    </>
  );
};

export default ModalTabsParcela;
