import React from "react";
import LayoutContainer from "../../components/layouts/LayoutContainer";
import image from "../../assets/img/calendarios/Horarios.jpg";
import "../calendarioCultivo/css.css"
const Calendario = () => {
  return (
    <LayoutContainer>

      <div>
        <img className="imagen" src={image} />
      </div>
    </LayoutContainer>
  );
};
export default Calendario