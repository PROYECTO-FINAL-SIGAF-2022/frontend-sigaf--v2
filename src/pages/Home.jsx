import img1 from "../assets/img/illustrations/man-with-laptop-light.png";
import Footer from "../components/layouts/Footer";
import LayoutContainer from "../components/layouts/LayoutContainer";
import useGetUser from "../hooks/useGetUser";
import { useSession, useSetSession } from "../context/SessionProvider";
import { useEffect, useState } from "react";
import { URL } from "../utils/getUrl";
import { useFetch } from "../hooks/useFetch";

function Home () {
  // const setSession = useSetSession();

  const session = useSession();

  const { user } = useGetUser(session);

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
                      <h5 className="card-title text-primary">
                        Bienvenido {user?.username_usuario}!!! 🎉
                      </h5>

                      <p className="mb-4" >
                      SISTEMA DE GESTIÓN AGROPECUARIA FORMOSEÑA! {" "}
                        <span className="fw-bold">ayudamos</span> a facilitar las tareas agropecuarias para los pequeños y medianos productores
                      </p>

                      <a href="#" className="btn btn-sm btn-outline-primary">
                        Ver Mas
                      </a>
                    </div>
                  </div>
                  <div className="col-sm-5 text-center text-sm-left">
                    <div className="card-body pb-0 px-0 px-md-4">
                      <img
                        src={img1}
                        height="140"
                        alt="View Badge User"
                        data-app-dark-img="illustrations/man-with-laptop-dark.png"
                        data-app-light-img="illustrations/man-with-laptop-light.png"
                      />
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

export default Home;
