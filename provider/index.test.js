const { Verifier } = require('@pact-foundation/pact');
const path = require('path');
let { server, dogsRepository } = require('./index');

describe('Pact Verification', () => {
  const port = 8080;

  beforeEach(() => {
    server.listen(port, () => {
      console.log(`Provider service listening on http://localhost:${port}`);
    });
  });

  it('should validate the expectations of dog', () => {
    // Arrange
    dogsRepository.setEntities([{ dog: 1 }]);

    const options = {
      providerBaseUrl: 'http://localhost:' + port,
      pactUrls: [
        path.resolve(__dirname, './pacts/dogconsumer-dogprovider.json')
      ]
    };

    // Act

    // Assert
    const validation = new Verifier(options).verifyProvider();
    return validation;
  });
});
