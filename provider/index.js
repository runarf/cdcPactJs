const express = require('express');
const server = express();

class Repository {
  constructor() {
    this.entities = [];
  }

  setEntities(newEntities) {
    this.entities = newEntities;
  }
}

const dogsRepository = new Repository();

server.get('/dogs', (_request, response) => {
  response.json(dogsRepository.entities);
});

module.exports = { server, dogsRepository };
