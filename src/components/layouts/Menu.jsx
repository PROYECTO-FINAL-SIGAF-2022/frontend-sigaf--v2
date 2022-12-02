import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSetSession } from "../../context/SessionProvider";
import logo from '../../pages/Landing/styles/img/Logo/logo 16.png'

function Menu () {
  const [dropdown, setDropdown] = useState({
    actividades: false,
    costes: false,
    configuraciones: false
  });

  const navigate = useNavigate();
  const setSession = useSetSession();

  const handleToggleDropdown = (nombreDropdown) => {
    const dropdownToggle = { ...dropdown };

    dropdownToggle[nombreDropdown] = !dropdownToggle[nombreDropdown];

    setDropdown(dropdownToggle);
  };

  const handleChangeLogout = () => {
    setSession();
    window.localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <>
      <aside
        id="layout-menu"
        className="layout-menu menu-vertical menu bg-menu-theme"
      >
        <div className="app-brand demo">
          <Link to="/"  className="app-brand-link">
            <img style={{ width: "85%" }} src={logo}/>
          </Link>

          <a
            href="#;"
            className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
          >
            <i className="bx bx-chevron-left bx-sm align-middle"></i>
          </a>
        </div>

        <div className="menu-inner-shadow"></div>

        <ul className="menu-inner py-1">
          <li className="menu-item">
            <Link to="/" className="menu-link">
              <i className="menu-icon tf-icons bx bx-home-circle"></i>
              <div data-i18n="Analytics">Inicio</div>
            </Link>
          </li>

         {/*  <li className="menu-item">
            <a href="#" className="menu-link">
              <i className="menu-icon tf-icons bx bx-cube-alt"></i>
              <div data-i18n="Analytics">Actividades</div>
            </a>
          </li> */}
          <li className="menu-item">
            <Link to="/mapa" className="menu-link">
              <i className="menu-icon tf-icons bx bxs-map"></i>
              <div data-i18n="Analytics">Mapa</div>
            </Link>
          </li>

          <li className="menu-item">
            <Link to="/calendario" className="menu-link">
              <i className="menu-icon tf-icons bx bx-calendar"></i>
              <div data-i18n="Analytics">Guia Cultivos</div>
              </Link>
          </li>

          <li className="menu-item">
            <Link to="/tucalendario" className="menu-link">
              <i className="menu-icon tf-icons bx bx-calendar"></i>
              <div data-i18n="Analytics">Actividades Cultivos</div>
              </Link>
          </li>

          <li className="menu-item">
            <Link to="/stock" className="menu-link">
              <i className="menu-icon tf-icons bx bxs-business"></i>
              <div data-i18n="Analytics">Stock</div>
            </Link>
          </li>
          <li className={`menu-item ${dropdown.costes ? "open" : "false"} `}>
            <a
              onClick={() => handleToggleDropdown("costes")}
              className="menu-link menu-toggle"
            >
              <i className="menu-icon tf-icons bx bx-lock-open-alt"></i>
              <div data-i18n="Authentications">Contabilidad</div>
            </a>
            <ul className="menu-sub">
              <li className="menu-item">
                <Link to="/Ingresos" className="menu-link">
                  <div data-i18n="Connections">Ingresos</div>
                </Link>
              </li>
              <li className="menu-item">
              <Link to="/Egresos" className="menu-link">
                  <div data-i18n="Connections">Egresos/Costos</div>
                </Link>
              </li>
            </ul>
          </li>

          <li className="menu-item">
            <Link to="/historiales" className="menu-link">
              <i className="menu-icon tf-icons bx bx-collection"></i>
              <div data-i18n="Basic">Analisis</div>
            </Link>
          </li>

          <li
            className={`menu-item ${
              dropdown.configuraciones ? "open" : "false"
            } `}
          >
            <a
              onClick={() => handleToggleDropdown("configuraciones")}
              className="menu-link menu-toggle"
            >
              <i className="menu-icon tf-icons bx bx-dock-top"></i>
              <div data-i18n="Account Settings">Configuraciones</div>
            </a>
            <ul className="menu-sub">
              {/* <li className="menu-item">
                <Link to="/Explotaciones" className="menu-link">
                  <div data-i18n="Connections">Explotaciones</div>
                </Link>
              </li> */}
              {/* <li className="menu-item">
                <Link to="/Campos" className="menu-link">
                  <div data-i18n="Connections">Campos</div>
                </Link>
              </li> */}
              <li className="menu-item">
                <Link to="/maquinas" className="menu-link">
                  <div data-i18n="Connections">Máquinas</div>
                </Link>
              </li>

              <li className="menu-item">
              <Link to="/personal" className="menu-link">
                  <div data-i18n="Connections">Personal</div>
                </Link>
              </li>

              <li className="menu-item">
                <Link to="/productos" className="menu-link">
                  <div data-i18n="Connections">Productos</div>
                </Link>
              </li>

              <li className="menu-item">
                <Link to="/proveedores" className="menu-link">
                  <div data-i18n="Connections">Proveedores</div>
                </Link>
              </li>

              {/* <li className="menu-item">
              <Link to="/tipo-trabajos" className="menu-link">
                  <div data-i18n="Connections">Trabajos</div>
                </Link>
              </li> */}
              <li className="menu-item">
              <Link to="/almacenes" className="menu-link">
                  <div data-i18n="Connections">Almacenes</div>
                </Link>
              </li>
            </ul>
          </li>
          <li className="menu-item">
            <a href="#" className="menu-link" onClick={handleChangeLogout}>
              <i className="bx bx-power-off me-2"></i>
              <div data-i18n="Basic">Cerrar Sessión</div>
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default Menu;
