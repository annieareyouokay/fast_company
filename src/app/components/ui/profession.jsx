import React from 'react';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getProfessionById, getProfessionsLoadingStatus } from '../../store/professions';

const Profession = ({ id }) => {
  const prof = useSelector(getProfessionById(id));
  const isLoading = useSelector(getProfessionsLoadingStatus());
  return !isLoading ? (<p>{prof.name}</p>) : 'Loading';
};
Profession.propTypes = {
  id: PropTypes.string.isRequired
};
export default Profession;
