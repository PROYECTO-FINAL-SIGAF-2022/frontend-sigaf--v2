import React from 'react'

const DatosComponente = ({key, datos}) => {
  return (
    <div >
    <div className="d-flex justify-content-start">
      <div className="image-container">
        <img
          src={datos.img}
          id="imgProfile"
          style={{ width: "150px", height: "110px" }}
          className="img-thumbnail"
        />
      </div>
      <div className="userData ml-3 my-4">
        <h2
          className="d-block"
          style={{ fontSize: "1.5rem", fontWeight: "bold" }}
        >
          <a href="#">{datos.especie}</a>
        </h2>
        <h6 className="d-block">
          <a href="#">Forma de Siembra:</a>{" "}
          <strong>
          {datos.formaSiembra}
          </strong>
        </h6>
        <h6 className="d-block">
          <a href="#">Distancia (*):</a>{" "}
          <strong>
          {datos.Distancia}
          </strong>
        </h6>
        <h6 className="d-block">
          <a href="#">Dias a Cosechar:</a>{" "}
          <strong>
          {datos.DiasCosecha}
          </strong>
        </h6>
      </div>
      <hr />
    </div>
    <hr />
    <hr />
    <hr />
    {/* 
    
    <div className="row">
      <div className="">
        <div className="tab-content ml-1" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="basicInfo"
            role="tabpanel"
            aria-labelledby="basicInfo-tab"
          >
            <div className="row">
              <div className="">
                <label style={{ fontWeight: "bold" }}>
                  Fecha de Adquisicion:
                </label>
              </div>
              <div className="col-md-8 col-6">
              xd
              </div>
            </div>
            <hr />

            <div className="row">
              <div className="">
                <label style={{ fontWeight: "bold" }}>
                  Precio de adquisicion:
                </label>
              </div>
              <div className="col-md-8 col-6">
                $ xdwd
              </div>
            </div>
            <hr />
          </div>     
        </div>
      </div>
    </div>
    */}
  </div>
  )
}

export default DatosComponente