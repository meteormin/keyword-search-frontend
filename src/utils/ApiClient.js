import axios, {
  // eslint-disable-next-line no-unused-vars
  AxiosRequestConfig,
  // eslint-disable-next-line no-unused-vars
  AxiosRequestHeaders,
  // eslint-disable-next-line no-unused-vars
  AxiosResponse,
} from 'axios';

export class ApiClient {
  _host;
  _token;
  _headers;
  _response;
  _error;

  constructor(host) {
    this._host = host;
    this._headers = null;
    this._response = null;
    this._token = null;
    this._error = null;
  }

  get host() {
    return this._host;
  }

  /**
   *
   * @returns {AxiosResponse<*, *>|null}
   */
  get response() {
    return this._response;
  }

  /**
   *
   * @returns {*}
   */
  get error() {
    return this._error;
  }

  /**
   *
   * @param config
   * @returns {Promise<AxiosResponse<*, *>|*>}
   */
  async request(config) {
    if (this._token != null) {
      let token = null;

      if (this._token.tokenType) {
        token = `${this._token.tokenType} ${this._token.token}`;
      } else {
        token = `${this._token}`;
      }

      this._headers = Object.assign(this._headers, { Authorization: token });
    }

    if (this._headers != null) {
      config.headers = this._headers;
    }

    return this.setResponse(await axios.request(config));
  }

  /**
   *
   * @param {string} path
   * @returns {string}
   */
  makeUrl(path) {
    if (this.host.endsWith('/')) {
      return this.host + path;
    } else {
      return `${this.host}/${path}`;
    }
  }

  /**
   *
   * @param {AxiosResponse<*, *>} res
   * @returns {*|T}
   */
  setResponse(res) {
    try {
      this._response = res;
      return this.response.data;
    } catch (error) {
      this._error = error;
      return this.error;
    }
  }

  /**
   *
   * @returns {boolean}
   */
  isSuccess() {
    return this.response?.statusText === 'OK' && this.error != null;
  }

  /**
   *
   * @param {string} token
   * @param {string} tokenType
   * @returns {ApiClient}
   */
  withToken(token, tokenType = null) {
    this._token = { tokenType: tokenType, token: token };
    return this;
  }

  /**
   *
   * @param {AxiosRequestHeaders} headers
   * @returns {ApiClient}
   */
  withHeader(headers) {
    this._headers = headers;
    return this;
  }

  /**
   *
   * @param {string} path
   * @param {*} params
   * @returns {Promise<AxiosResponse<*, *>|*>}
   */
  get(path, params = {}) {
    /** @var {AxiosRequestConfig} config **/
    const config = {};
    config.method = 'GET';
    config.url = this.makeUrl(path);
    config.params = params;

    return this.request(config);
  }

  /**
   *
   * @param {string} path
   * @param {*} data
   * @returns {Promise<AxiosResponse<*, *>|*|null>}
   */
  async post(path, data = {}) {
    /** @var {AxiosRequestConfig} config **/
    const config = {};
    config.method = 'POST';
    config.url = this.makeUrl(path);
    config.data = data;

    return this.setResponse(await this.request(config));
  }

  /**
   *
   * @param {string} path
   * @param {*} data
   * @returns {Promise<AxiosResponse<*, *>|*|null>}
   */
  async put(path, data = {}) {
    /** @var {AxiosRequestConfig} config **/
    const config = {};
    config.method = 'PUT';
    config.url = this.makeUrl(path);
    config.data = data;

    return this.setResponse(await this.request(config));
  }

  /**
   *
   * @param {string} path
   * @param {*} data
   * @returns {Promise<AxiosResponse<*, *>|*|null>}
   */
  async patch(path, data = {}) {
    /** @var {AxiosRequestConfig} config **/
    const config = {};
    config.method = 'PATCH';
    config.url = this.makeUrl(path);
    config.data = data;

    return this.setResponse(await this.request(config));
  }

  /**
   *
   * @param {string} path
   * @param {*} data
   * @returns {Promise<AxiosResponse<*, *>|*|null>}
   */
  async delete(path, data = {}) {
    /** @var {AxiosRequestConfig} config **/
    const config = {};
    config.method = 'DELETE';
    config.url = this.makeUrl(path);
    config.data = data;

    return this.setResponse(await this.request(config));
  }
}
