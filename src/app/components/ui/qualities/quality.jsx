import React from 'react';
import PropTypes from 'prop-types';
import { useQualities } from '../../../../hooks/useQualities';

const Quality = ({ id }) => {
  const { isLoading, getQuality } = useQualities();
  const { color, name } = getQuality(id);
  return (!isLoading ? <span className={`badge m-2 bg-${color}`}>{name}</span> : 'Loading ...');
};

Quality.propTypes = {
  id: PropTypes.string.isRequired
};

export default Quality;
