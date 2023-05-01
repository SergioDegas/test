import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

export const getCities = async () => {
  try {
    const {data} = await axios.get('/cities');

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTypes = async () => {
  try {
      const {data} = await axios.get('/types');
  
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
