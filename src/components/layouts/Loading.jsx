const Loading = () => {
  return (
    <div className="row gy-3 text-center">
      <div className="col-md-12">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
