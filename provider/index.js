const express = require('express');
const server = express();

class Repository {
  constructor() {
    this.entities = [];
  }

  // repository.setEntities(['schaefer'])
  setEntities(newEntities) {
    this.entities = newEntities;
  }
}

const dogsRepository = new Repository();

server.get('/dogs', (_request, response) => {
  const body = [
    {
      dogs: dogsRepository.entities
    }
  ];

  response.json(body);
});

module.exports = { server, dogsRepository };
