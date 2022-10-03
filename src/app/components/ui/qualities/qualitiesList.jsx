import React from 'react';
import Quality from './quality';
import PropTypes from 'prop-types';

const QualititesList = ({ qualities }) => {
  return (
    <>
      {qualities.map((quality) => (
        <Quality key={quality._id} {...quality} />
      ))}
    </>
  );
};

QualititesList.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default QualititesList;
