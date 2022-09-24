import { useState } from 'react';
import img4 from '../../assets/img/icons/unicons/paypal.png';
import img5 from '../../assets/img/icons/unicons/cc-primary.png';

function Card2() {
  return (
    <div className="col-12 col-md-8 col-lg-4 order-3 order-md-2">
      <div className="row">
        <div className="col-6 mb-4">
          <div className="card">
            <div className="card-body">
              <div className="card-title d-flex align-items-start justify-content-between">
                <div className="avatar flex-shrink-0">
                  <img src={img4} alt="Credit Card" className="rounded" />
                </div>
                <div className="dropdown">
                  <button
                    className="btn p-0"
                    type="button"
                    id="cardOpt4"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="bx bx-dots-vertical-rounded"></i>
                  </button>
                  <div
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="cardOpt4"
                  >
                    <a className="dropdown-item" href="#;">
                      View More
                    </a>
                    <a className="dropdown-item" href="#;">
                      Delete
                    </a>
                  </div>
                </div>
              </div>
              <span className="d-block mb-1">Payments</span>
              <h3 className="card-title text-nowrap mb-2">$2,456</h3>
              <small className="text-danger fw-semibold">
                <i className="bx bx-down-arrow-alt"></i> -14.82%
              </small>
            </div>
          </div>
        </div>
        <div className="col-6 mb-4">
          <div className="card">
            <div className="card-body">
              <div className="card-title d-flex align-items-start justify-content-between">
                <div className="avatar flex-shrink-0">
                  <img src={img5} alt="Credit Card" className="rounded" />
                </div>
                <div className="dropdown">
                  <button
                    className="btn p-0"
                    type="button"
                    id="cardOpt1"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="bx bx-dots-vertical-rounded"></i>
                  </button>
                  <div className="dropdown-menu" aria-labelledby="cardOpt1">
                    <a className="dropdown-item" href="#;">
                      View More
                    </a>
                    <a className="dropdown-item" href="#;">
                      Delete
                    </a>
                  </div>
                </div>
              </div>
              <span className="fw-semibold d-block mb-1">Transactions</span>
              <h3 className="card-title mb-2">$14,857</h3>
              <small className="text-success fw-semibold">
                <i className="bx bx-up-arrow-alt"></i> +28.14%
              </small>
            </div>
          </div>
        </div>
        {/*  <!-- </div> */}
        {/* < div className="row"> --> */}
        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between flex-sm-row flex-column gap-3">
                <div className="d-flex flex-sm-column flex-row align-items-start justify-content-between">
                  <div className="card-title">
                    <h5 className="text-nowrap mb-2">Profile Report</h5>
                    <span className="badge bg-label-warning rounded-pill">
                      Year 2021
                    </span>
                  </div>
                  <div className="mt-sm-auto">
                    <small className="text-success text-nowrap fw-semibold">
                      <i className="bx bx-chevron-up"></i> 68.2%
                    </small>
                    <h3 className="mb-0">$84,686k</h3>
                  </div>
                </div>
                <div id="profileReportChart"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card2;
