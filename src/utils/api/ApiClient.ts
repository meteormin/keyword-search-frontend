import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { makePath } from '../str';

export interface Token {
  tokenType: string | null;
  token: string | null;
}

export interface ApiResponse {
  isSuccess: boolean;
  res: AxiosResponse<any, any> | null;
  error: ErrorResInterface | null;
}

export interface ErrorResInterface {
  status: string;
  code: number;
  error: string;
  message: string;
}

export interface Attachment {
  name: string;
  file: File;
}

export class ErrorResponse implements ErrorResInterface {
  private readonly _status: string;
  private readonly _code: number;
  private readonly _error: string;
  private readonly _message: string;

  constructor(props: ErrorResInterface) {
    this._status = props.status;
    this._code = props.code;
    this._error = props.error;
    this._message = props.message;
  }

  get status(): string {
    return this._status;
  }

  get code(): number {
    return this._code;
  }

  get error(): string {
    return this._error;
  }

  get message(): string {
    return this._message;
  }
}

export default class ApiClient {
  protected _host: string;
  protected _token: Token | null;
  protected _headers: AxiosRequestHeaders | null;
  protected _response: AxiosResponse | null;
  protected _attachment: Attachment[];
  protected _error: any;
  protected _isSuccess: boolean;

  /**
   * @param {string} host
   */
  constructor(host: string) {
    this._host = host;
    this._headers = null;
    this._response = null;
    this._token = null;
    this._error = null;
    this._isSuccess = false;
    this._attachment = [];
  }

  /**
   * @returns {string}
   */
  get host(): string {
    return this._host;
  }

  /**
   *
   * @returns {AxiosResponse<*, *>|null}
   */
  get response(): AxiosResponse<any, any> | null {
    return this._response;
  }

  /**
   *
   * @returns {*}
   */
  get error(): any {
    return this._error;
  }

  /**
   *
   * @param {AxiosRequestConfig} config
   * @returns {Promise<AxiosResponse<*, *>|*>}
   */
  async request(
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<any, any> | any> {
    if (this._token != null) {
      let token;
      if (this._token.tokenType) {
        token = `${this._token.tokenType} ${this._token.token}`;
      } else {
        token = `${this._token.token}`;
      }

      this._headers = Object.assign(this._headers || {}, {
        Authorization: token,
      });
    }

    if (this._headers != null) {
      config.headers = this._headers;
    }

    if (this._attachment && this._attachment.length != 0) {
      this._headers = Object.assign(this._headers || {}, {
        'Content-Type': 'multipart/form-data',
      });
      const data = new FormData();
      for (const [key, value] of Object.entries(config.data)) {
        data.append(key, value as string | Blob);
      }

      for (const attach of this._attachment) {
        data.append(attach.name, attach.file);
      }
      config.data = data;
    }

    return this.setResponse(axios.request(config));
  }

  /**
   *
   * @param {string} path
   * @returns {string}
   */
  makeUrl(path: string) {
    const [schema, host] = this.host.split('://');
    const url = makePath(host, path);
    return schema + '://' + url;
  }

  /**
   *
   * @param {Promise<AxiosResponse<*, *>>} res
   * @returns {Promise<ApiResponse>}
   */
  async setResponse(
    res: Promise<AxiosResponse<any, any>>,
  ): Promise<ApiResponse> {
    try {
      this._response = await res;
      this._isSuccess = true;
      return {
        isSuccess: true,
        res: this.response,
        error: null,
      };
    } catch (error: any | AxiosError) {
      this._isSuccess = false;
      this._error = error;
      const errorResponse: ErrorResInterface = {
        status: 'error',
        code: 99,
        error: 'SERVER_ERROR',
        message: '관리자에게 문의해주세요.',
      };

      if (error instanceof AxiosError) {
        if (error.response?.status || 500 < 500) {
          errorResponse.status = error.response?.data.status || 'error';
          errorResponse.error = error.response?.data.error || 'SERVER_ERROR';
          errorResponse.code = error.response?.data.code || 99;
          errorResponse.error = errorResponse.error.replaceAll('_', ' ');

          if (this.error.response.data.hasOwnProperty('messages')) {
            errorResponse.error = '유효성 검사 실패';
            const messages = [];
            for (const [key, value] of Object.entries(
              error.response?.data.messages,
            )) {
              messages.push(value);
            }
            errorResponse.message = messages.join(', ');
          } else {
            errorResponse.message = error.response?.data.message || '';
          }
        }
      }

      return {
        isSuccess: false,
        res: error,
        error: new ErrorResponse(errorResponse),
      };
    }
  }

  /**
   *
   * @returns {boolean}
   */
  isSuccess(): boolean {
    return this._isSuccess;
  }

  /**
   *
   * @param {string} token
   * @param {string|null} tokenType
   * @returns {ApiClient}
   */
  withToken(token: string, tokenType?: string): ApiClient {
    this._token = { tokenType: tokenType || null, token: token };
    return this;
  }

  /**
   *
   * @param {AxiosRequestHeaders} headers
   * @returns {ApiClient}
   */
  withHeader(headers: AxiosRequestHeaders): ApiClient {
    this._headers = Object.assign(this._headers || {}, headers);
    return this;
  }

  attach(file: Attachment | Attachment[]) {
    if (Array.isArray(file)) {
      this._attachment.concat(file);
    } else {
      this._attachment.push(file);
    }
    return this;
  }

  /**
   *
   * @param {string} path
   * @param {*} params
   * @returns {Promise<ApiResponse>|*|null>}
   */
  get(path: string, params: any = {}): Promise<ApiResponse> {
    const config: AxiosRequestConfig = {};
    config.method = 'GET';
    config.url = this.makeUrl(path);
    config.params = params;

    return this.request(config);
  }

  /**
   *
   * @param {string} path
   * @param {*} data
   * @returns {Promise<ApiResponse>}
   */
  post(path: string, data: object = {}): Promise<ApiResponse> {
    const config: AxiosRequestConfig = {};
    config.method = 'POST';
    config.url = this.makeUrl(path);
    config.data = data;

    return this.request(config);
  }

  /**
   *
   * @param {string} path
   * @param {*} data
   * @returns {Promise<ApiResponse>|*|null>}
   */
  put(path: string, data: object = {}): Promise<ApiResponse> {
    const config: AxiosRequestConfig = {};
    config.method = 'PUT';
    config.url = this.makeUrl(path);
    config.data = data;

    return this.request(config);
  }

  /**
   *
   * @param {string} path
   * @param {*} data
   * @returns {Promise<ApiResponse>|*|null>}
   */
  patch(path: string, data: object = {}): Promise<ApiResponse> {
    const config: AxiosRequestConfig = {};
    config.method = 'PATCH';
    config.url = this.makeUrl(path);
    config.data = data;

    return this.request(config);
  }

  /**
   *
   * @param {string} path
   * @param {*} data
   * @returns {Promise<ApiResponse>|*|null>}
   */
  delete(path: string, data: object = {}): Promise<ApiResponse> {
    const config: AxiosRequestConfig = {};
    config.method = 'DELETE';
    config.url = this.makeUrl(path);
    config.data = data;

    return this.request(config);
  }
}
