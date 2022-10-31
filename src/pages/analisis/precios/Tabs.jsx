import { Nav, NavItem, NavLink } from "reactstrap";

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav pills className='mb-2' justified='true' tabs='true' >
      <NavItem>
        <NavLink active={activeTab === "1"} onClick={() => toggleTab("1")}>
          <span className='fw-bold'>Personal</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === "2"} onClick={() => toggleTab("2")}>
          <span className='fw-bold'>Maquinas</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === "3"} onClick={() => toggleTab("3")}>
          <span className='fw-bold'>Productos</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === "4"} onClick={() => toggleTab("4")}>
          <span className='fw-bold'>Almacenes</span>
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default Tabs;