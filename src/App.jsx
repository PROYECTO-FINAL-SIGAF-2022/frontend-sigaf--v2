import { BrowserRouter } from "react-router-dom";
// import Navbar from './src/components/layouts/Navbar';
import Rutas from "./components/routes/Rutas";
import SessionProvider from "./context/SessionProvider";
import "react-datetime/css/react-datetime.css";
// import Menu from './src/pages/Menu';



//import css de calendarios

const App = () => {
  return (
    <BrowserRouter>
      <SessionProvider>
        <Rutas />
      </SessionProvider>
    </BrowserRouter>
  );
};

export default App;
