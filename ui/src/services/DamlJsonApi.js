/**
 * Class representing a DamlJsonApi (https://docs.daml.com/json-api/index.html).
 *
 * @class
 */
class DamlJsonApi {

  /**
   * Holds the api base url
   * @var {srting} baseUrl.
   */
  baseUrl;

  /**
   * Holds the user contract Id
   * @var {srting} userId.
   */
  userId;

  /**
   * Holds the credentials token
   * @var {srting} token.
   */
  token;

  /**
   * Holds the Ledger Id
   * @var {srting} ledgerId.
   */
  ledgerId;

  /**
   * Holds the party name
   * @var {srting} party.
   */
  party;

  /**
   * Represents a DamlJsonApi.
   * @constructor
  */
  constructor(baseUrl = '/v1') {
    this.baseUrl = baseUrl;

    if (!this.credentials().token) {
      // load credentials
      const credentials = JSON.parse(sessionStorage.getItem('Credentials') || '{}');
      // set credentials
      this.credentials(credentials)
    }
  }

  /**
   * Get/Set credentials
   * @function credentials
   * @param {null|object} credentials
   * @return {object} { token, ledgerId, party }
   */
  credentials(credentials) {

    // set new credentials
    if (credentials) {
      sessionStorage.setItem('Credentials', JSON.stringify(credentials));
      this.token = credentials.token;
      this.ledgerId = credentials.ledgerId;
      this.party = credentials.party;
      this.userId = credentials.userId;
    }

    return {
      token: this.token,
      ledgerId: this.ledgerId,
      party: this.party,
      userId: this.userId,
    }

  }

  /**
   * Basic Daml jsonApi post
   * @function post
   * @param {string} path
   * @param {null|string|array|object} body
   * @return {promise} the response
   */
  post(path, body) {

    // fetch with Authorization header
    return fetch(`${this.baseUrl}${path}`, {
      method: 'post',
      headers: {
        "Authorization": `Bearer ${this.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body || ''),
    })
      // convert to json
      .then((res) => {
        return res.json()
      })
      // status handler
      .then((res) => {
        if (res.status < 200 && res.status > 299) {
          throw res.errors;
        }
        return res;
      })
      // catch handler
      .catch((error) => {
        console.log(error)
        // alert(`Error sending message:\n${JSON.stringify(error)}`);
      });

  }

  /**
   * Login to Daml service
   * @function login
   * @param {string} path
   * @return {promise} the response
   */
  login(payload) {
    return this.post('/auth/login', payload)
      .then(res =>
        this.credentials(res)
      );
  }

  /**
   * Logout from Daml service
   * @function logout
   */
  logout() {
    this.token = null;
    this.ledgerId = null;
    this.party = null;
    sessionStorage.removeItem("Credentials");
  }

  /**
   * Create a Daml contract
   * @function create
   * @param {string} templateId
   * @param {null|object} payload
   * @return {promise} the response
   */
  create(templateId, payload) {
    return this.post('/create', { templateId, payload });
  }

  /**
   * Exercise of a Daml contract
   * @function exercise
   * @param {string} templateId
   * @param {string} contractId
   * @param {string} choice
   * @param {null|object} argument
   * @return {promise} the response
   */
  exercise(templateId, contractId, choice, argument) {
    return this.post('/exercise', { templateId, contractId, choice, argument });
  }

  /**
   * Query of a Daml contracts
   * @function query
   * @param {array} templateIds
   * @param {null|object} query
   * @param {null|array} readers
   * @return {promise} the response
   */
  query(templateIds, query, readers) {
    return this.post('/query', { templateIds, query, readers });
  }

}

// create a singleton instance of DamlJsonApi
let $instance = null;
export default $instance || ($instance = new DamlJsonApi());
