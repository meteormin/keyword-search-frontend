import { ApiResponse } from '../ApiClient';

export interface Reportable {
  message: string;
  context: object;
}

export interface Reporter {
  report: (r: Reportable) => Promise<ApiResponse>;
}
