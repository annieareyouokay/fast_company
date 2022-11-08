import { useEffect, useState } from 'react';
import professions from '../mockData/professions.json';
import qualities from '../mockData/qualities.json';
import users from '../mockData/users.json';
import httpService from '../services/http.service';

const useMockData = () => {
  const statuses = {
    idle: 'Not started',
    pending: 'In process',
    successed: 'Ready',
    error: 'Error occured'
  };

  const [status, setStatus] = useState(statuses.idle);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const sumCount = professions.length + qualities.length + users.length;

  useEffect(() => {
    updateProgress();
  }, [count]);

  function incrementCount() {
    setCount((prevState) => prevState + 1);
  }

  function updateProgress() {
    if (count !== 0 && status === statuses.idle) {
      setStatus(statuses.pending);
    }
    const newProgress = Math.floor((count / sumCount) * 100);
    if (progress < newProgress) {
      setProgress(() => newProgress);
    }
    if (newProgress === 100) {
      setStatus(statuses.successed);
    }
  }

  async function initialize() {
    try {
      for (const prof of professions) {
        await httpService.put('profession/' + prof._id, prof);
        incrementCount();
      }
      for (const qual of qualities) {
        await httpService.put('quality/' + qual._id, qual);
        incrementCount();
      }
      for (const user of users) {
        await httpService.put('user/' + user._id, user);
        incrementCount();
      }
    } catch (error) {
      setError(error);
      setStatus(statuses.error);
    }
  }

  return { status, initialize, error, progress };
};

export default useMockData;
