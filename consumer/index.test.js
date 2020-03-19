const dogsClient = require('./index');

const path = require('path');
const Pact = require('@pact-foundation/pact').Pact;

describe("Dog's API", () => {
  test('returns a sucessful body with dog', async () => {
    // Arrange
    const url = 'http://localhost';
    const port = 8992;

    const providerMockServer = new Pact({
      port: port,
      dir: path.resolve(__dirname, './pacts'),
      consumer: 'DogConsumer',
      provider: 'DogProvider'
    });

    await providerMockServer.setup();

    const EXPECTED_BODY = [
      {
        dogs: ['bulldog', 'schafer', 'pug']
      }
    ];

    const interaction = {
      state: 'I have one dog',
      uponReceiving: 'a request for dogs',
      withRequest: {
        method: 'GET',
        path: '/dogs',
        headers: {
          Accept: 'application/json'
        }
      },
      willRespondWith: {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: EXPECTED_BODY
      }
    };

    await providerMockServer.addInteraction(interaction);

    // Act
    const urlWithPort = url + ':' + port;
    const response = await dogsClient.getMeDogs(urlWithPort);

    // Assert

    // UNIT TEST
    expect(response.headers['content-type']).toEqual(
      'application/json; charset=utf-8'
    );
    expect(response.data).toEqual(EXPECTED_BODY);
    expect(response.status).toEqual(200);

    // Makes json executable test file
    await providerMockServer.verify();
    await providerMockServer.finalize();
  });
});
