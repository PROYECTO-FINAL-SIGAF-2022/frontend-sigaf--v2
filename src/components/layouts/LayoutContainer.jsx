import Menu from "./Menu";
import Navbar from "./Navbar";

const LayoutContainer = ({ children }) => {
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Menu />
        <div className="layout-page">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutContainer;
