import { BrowserRouter } from "react-router-dom";
// import Navbar from './src/components/layouts/Navbar';
import Rutas from "./src/components/routes/Rutas";
import SessionProvider from "./src/context/SessionProvider";
// import Menu from './src/pages/Menu';

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
