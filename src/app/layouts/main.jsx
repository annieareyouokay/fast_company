import React from 'react';
import useMockData from '../utils/mockData';

const Main = () => {
  const { status, initialize, error, progress } = useMockData();
  const handleClick = () => {
    initialize();
  };

  const getProgressClass = () => {
    return status === 'Ready' ? 'progress-bar progress-bar-striped bg-success' : 'progress-bar progress-bar-striped progress-bar-animated';
  };

  return (
    <div className="container mt-5">
      <h1>Main</h1>
      <h3>Инициализация данных в Firebase</h3>
      <h5>Status: { status }</h5>
      <div className="progress mb-3">
        <div
          className={getProgressClass()}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: progress + '%' }}
        >{ progress }%</div>
      </div>
      {error && <h5>Error: { error }</h5>}
      <button className="btn btn-primary" onClick={handleClick}>
        Инциализировать
      </button>
    </div>
  );
};

export default Main;
