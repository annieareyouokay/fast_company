import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import qualityService from '../app/services/qualities.service';

const QualityContext = React.createContext();

export const useQualities = () => {
  return useContext(QualityContext);
};

const QualityProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getQualitites();
  }, []);

  useEffect(() => {
    toast.error(error);
    setError(null);
  }, [error]);

  function getQuality(id) {
    return qualities.find(value => value._id === id);
  }

  async function getQualitites() {
    try {
      const { content } = await qualityService.get();
      setQualities(content);
      setIsLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  return <QualityContext.Provider value={{ isLoading, qualities, getQuality }} >{children}</QualityContext.Provider>;
};

QualityProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default QualityProvider;
