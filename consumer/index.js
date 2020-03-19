const axios = require('axios');

const getMeDogs = async urlWithPort => {
  const fullUrl = urlWithPort + '/dogs';

  const axiosOptions = {
    headers: { Accept: 'application/json' }
  };

  // http://dogsapi.com/dogs
  const dogs = await axios.get(fullUrl, axiosOptions);

  return dogs;
};

const dogsClient = {
  getMeDogs
};

module.exports = dogsClient;
