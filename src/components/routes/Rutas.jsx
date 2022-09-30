import { Routes, Route } from "react-router-dom";
import { useSession } from "../../context/SessionProvider";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";
import Home from "../../pages/Home";

function Rutas () {
  const session = useSession();

  if (session != null) {
    return (
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="*" exact element={<Home />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/auth" exact element={<Login />} />
      <Route path="/registrarse" exact element={<Register />} />
      <Route path="*" exact element={<Login />} />
    </Routes>
  );
}

export default Rutas;
