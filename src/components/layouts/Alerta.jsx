const Alerta = ({ claseAlerta, mensajeAlerta }) => {
  return (
    <div
      className={`alert alert-${claseAlerta} alert-dismissible`}
      role="alert"
    >
      {mensajeAlerta}
      {/* <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button> */}
    </div>
  );
};

export default Alerta;
