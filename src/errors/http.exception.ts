export class HttpExcpetion extends Error {
  detail: string;
  code: number;
  errorCode: string;

  constructor(detail: string, code: number, error_code = "APP_ERROR") {
    super(detail);
    this.detail = detail;
    this.code = code;
    this.errorCode = error_code;
  }
}
