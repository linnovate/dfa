import { encode } from 'jwt-simple';

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
   * Holds the credentials token
   * @var {srting} token.
   */
  token;

  /**
   * Holds the party name
   * @var {srting} party.
   */
  party;
    
  /**
   * Holds the parteis list
   * @var {srting} parteis.
   */
  parteis;
  
  /**
   * Represents a DamlJsonApi.
   * @constructor
  */
  constructor(baseUrl = '/v1') {
    // select params
    const url = new URL(window.location.toString());
    const baseUrlParam = url.searchParams.get('baseUrl');

    // initialization variables
    this.baseUrl = baseUrlParam || baseUrl;
    this.token = sessionStorage.getItem('token');
    this.party= sessionStorage.getItem('party');
  }

  /**
   * create credentials to Daml service
   * @function createCredentials
   * @param {string} party
   */
  async createCredentials(party) {
    
    // select params
    const url = new URL(window.location.toString());
    const ledgerId = url.searchParams.get('ledgerId')
    const applicationId = url.searchParams.get('applicationId')
    if (!ledgerId || !applicationId) {
      alert("'ledgerId' and 'applicationId' must appear in URL parameters.");
      return;
    }

    // create payload
    const payload = {
      "https://daml.com/ledger-api": {
        "ledgerId": ledgerId,
        "applicationId": applicationId,
        //"participantId": null,
        //"admin": true,
        //"readAs": ["Bob"]
        "actAs": [party]
      },
      // "exp": 1300819380
    }
    
    // generate token
    const SECRET_KEY = 'secret';
    const token = encode(payload, SECRET_KEY, 'HS256');

    // save local
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('party', party);
    this.token = token;
    this.party = party;
  }
  
  /**
   * Logout from Daml service
   * @function logout
   */
  logout() {
    this.token = null;
    this.party = null;
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("party");
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
    .then((res) => res.json())
    .then((res) => {
      if (res.status < 200 && res.status > 299) {
        throw res.errors;
      }
      return res;
    })
    .catch((error) => console.log(error) /* && alert(`Error sending message:\n${JSON.stringify(error)}`) */);

  }

  /**
   * Basic Daml jsonApi get
   * @function get
   * @param {string} path
   * @return {promise} the response
   */
  get(path) {

    // fetch with Authorization header
    return fetch(`${this.baseUrl}${path}`, {
      method: 'get',
      headers: {
        "Authorization": `Bearer ${this.token}`,
        "Content-Type": "application/json"
      },
    })
    .then((res) => res.json())
    .then((res) => {
      if (res.status < 200 && res.status > 299) {
        throw res.errors;
      }
      return res;
    })
    .catch((error) => console.log(error) /* && alert(`Error sending message:\n${JSON.stringify(error)}`) */);

  }

  /**
   * Get the Daml parteis
   * @function getParteis
   * @return {promise} the response
   */
  async getParteis() {
    if (this.parteis) {
      return this.parteis;
    }
    const res = await this.get('/parties');
    return this.parteis = res.result;
  }

  /**
   * Add a Daml party
   * @function addParty
   * @param {string} party
   * @param {string} displayName
   * @return {promise} the response
   */
  async addParty(identifierHint, displayName) {
    return this.post('/parties/allocate', { identifierHint, displayName });
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
