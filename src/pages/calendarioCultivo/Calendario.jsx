import React from "react";
import LayoutContainer from "../../components/layouts/LayoutContainer";
import image from "../../assets/img/calendarios/Horarios.jpg";
import "../calendarioCultivo/css.css"
import Footer from "../../components/layouts/Footer";


import albahacaIMG from "../../assets/img/calendarios/Albahaca.png"
import batataIMG from "../../assets/img/calendarios/Batata.png"
import berenjenaIMG from "../../assets/img/calendarios/Berenjena.png"
import calabazaIMG from "../../assets/img/calendarios/caslabaza.png"
import chauchaIMG from "../../assets/img/calendarios/chaucha.png"
import melonIMG from "../../assets/img/calendarios/Melon.png"
import puerroIMG from "../../assets/img/calendarios/puerro.png"
import tomateIMG from "../../assets/img/calendarios/Tomate.png"
import zapallitoIMG from "../../assets/img/calendarios/ZAPALLITOS-VERDES.png"
import zapalloIMG from "../../assets/img/calendarios/zapallo-camote.webp"
import DatosComponente from "./DatosComponente";

const Calendario = () => {

  const Item = [
    {
      img: albahacaIMG,
      especie: "Albahaca",
      formaSiembra: "Almácigo: Ago-Set. Transplante: Oct.-Nov-",
      Distancia: "15 x 40",
      DiasCosecha: "90 - 100"
    },
    {
      img: batataIMG,
      especie: "Batata",
      formaSiembra: "Almácigo: Ago, Transplante: Oct.",
      Distancia: "40 x 80",
      DiasCosecha: "140 x 150"
    },
    {
      img:berenjenaIMG,
      especie: "Berenjena",
      formaSiembra: "Almácigo: Ago.-Set, Transplante: Oct.-Nov.",
      Distancia: "50 x 70 (HD)",
      DiasCosecha: "80 - 120"
    },
    {
      img:calabazaIMG,
      especie: "Calabaza",
      formaSiembra: "Directa a golpes: Oct-Nov",
      Distancia: "140 x 140",
      DiasCosecha: " 120 - 150"
    },
    {
      img:melonIMG,
      especie: "Melón",
      formaSiembra: "Directa a golpe: Oct.",
      Distancia: "90 x 120",
      DiasCosecha: "100"
    },
    {
      img:chauchaIMG,
      especie: "Poroto Chaucha",
      formaSiembra: "Directa a golpe: Oct. -Ene",
      Distancia: "10 x 40",
      DiasCosecha: "70"
    },
    {
      img:puerroIMG,
      especie: "Puerro",
      formaSiembra: "Almácigo: Ago.-Sep. Transplante: Sep. Oct.",
      Distancia: "10 x 40",
      DiasCosecha: "120"
    },
    {
      img:tomateIMG,
      especie: "Tomate",
      formaSiembra: "Almácigo: Sep.-Oct. Transplante: Oct.-Nov",
      Distancia: "100 x 250/300",
      DiasCosecha: "120 - 150"
    },
    {
      img:zapallitoIMG,
      especie: "Tomate",
      formaSiembra: "Almácigo: Sep.-Oct. Transplante: Oct.-Nov",
      Distancia: "100 x 250/300",
      DiasCosecha: "120 - 150"
    },
    {
      img:zapalloIMG,
      especie: "Tomate",
      formaSiembra: "Almácigo: Sep.-Oct. Transplante: Oct.-Nov",
      Distancia: "100 x 250/300",
      DiasCosecha: "120 - 150"
    },
  ]
  return (
    <LayoutContainer>

<div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row">
            <div className="col-lg-12 mb-4 order-0">
              <div className="card">
                <div className="d-flex align-items-end row">
                  <div className="">
                    <div className="card-body">
                      <hr />
                    <div >
                      
                      {Item.map((elem)=>{
                        return(
                          <DatosComponente key={elem.especie} datos={elem}/>
                        )
                      })}
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
        <div className="content-backdrop fade"></div>
      </div>
    </LayoutContainer>
  );
};
export default Calendario