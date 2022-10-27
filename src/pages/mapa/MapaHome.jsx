import Footer from "../../components/layouts/Footer";
import LayoutContainer from "../../components/layouts/LayoutContainer";
import MapaView from "./MapView";
import "../../App.css";

function MapaHome () {
  return (
    <LayoutContainer>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row">
            <div className="col-lg-12 mb-4 order-0">
              <div className="card">
                {/* <div className="d-flex align-items-end row">
                  <div className="col-sm-7"> */}
                  <MapaView/>
                  {/* </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <div className="content-backdrop fade"></div>
      </div>
    </LayoutContainer>
  );
}

export default MapaHome;
