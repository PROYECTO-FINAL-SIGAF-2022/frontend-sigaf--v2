import { Link } from "react-router-dom";
import Footer from "../../components/layouts/Footer";
import LayoutContainer from "../../components/layouts/LayoutContainer";

function FormProductos() {
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
                      <form>
                        <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">
                            Nombre Del Producto
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                          />
                          <div id="emailHelp" class="form-text">
                            Agregar un nombre descriptivo
                          </div>
                        </div>
                        <div class="mb-3">
                          <label for="exampleInputPassword1" class="form-label">
                            Fecha de Vencimiento
                          </label>
                          <input
                            type="date"
                            class="form-control"
                            id="exampleInputPassword1"
                          />
                        </div>
                        <div class="mb-3">
                          <label for="exampleInputPassword1" class="form-label">
                            Cantidad de productos
                          </label>
                          <input
                            type="number"
                            class="form-control"
                            id="exampleInputPassword1"
                          />
                        </div>
                        <div class="mb-3">
                          <label for="disabledSelect" class="form-label">
                            Tipo De Producto
                          </label>
                          <select id="disabledSelect" class="form-select">
                            <option disabled>Seleccionar el tipo de producto</option>
                            <option value='1'>Fertilizante</option>
                            <option value='2'>Semillas</option>
                          </select>
                        </div>
                        <div class="mb-3">
                          <label for="disabledSelect" class="form-label">
                            Proveedor
                          </label>
                          <select id="disabledSelect" class="form-select">
                            <option disabled >Seleccionar el proveedor</option>
                            <option value='1'>Proveedor 1</option>
                            <option value='2'>Brito Enzo</option>
                          </select>
                        </div>
                        <br></br>
                        <Link to='/Productos'>
                        <button class="btn btn-danger mx-3">
                          Volver
                        </button>
                        </Link>
                        <button type="submit" class="btn btn-success">
                          Agregar Producto
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
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

export default FormProductos;
