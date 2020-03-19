const axios = require('axios');

const getMeDogs = async urlWithPort => {
  const fullUrl = urlWithPort + '/dogs';

  const options = {
    headers: { Accept: 'application/json' }
  };

  const dogs = await axios.get(fullUrl, options);

  return dogs;
};

module.exports = getMeDogs;
