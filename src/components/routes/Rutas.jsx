import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
//import Menu from "../../pages/Menu"


function Rutas() {
  return (
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
  );
}

export default Rutas