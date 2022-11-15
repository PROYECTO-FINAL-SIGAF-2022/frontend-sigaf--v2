import React from "react";
import LayoutContainer from "../../components/layouts/LayoutContainer";
import image from "../../assets/img/calendarios/Horarios.jpg";
import "../calendarioCultivo/css.css"
import Footer from "../../components/layouts/Footer";
const Calendario = () => {
  return (
    <LayoutContainer>

<div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row">
            <div className="col-lg-12 mb-4 order-0">
              <div className="card">
                <div className="d-flex align-items-end row">
                  <div className="col-sm-7">
                    <div className="card-body">
                    <img className="imagen" src={image} />
                    </div>
                  </div>
                  <div className="col-sm-5 text-center text-sm-left">
                    <div className="card-body pb-0 px-0 px-md-4">
                      
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