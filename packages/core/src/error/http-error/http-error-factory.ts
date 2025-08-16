import { AxiosError } from 'axios';
import { HttpError } from './http-error';
import { EntityError } from './entity-error';

/**
 * @description 错误工厂
 * @export
 * @class HttpErrorFactory
 */
export class HttpErrorFactory {
  public static getInstance(error: AxiosError): HttpError {
    const { response } = error;
    if (!response || !response.data) {
      return new HttpError(error);
    }
    const { type } = response.data as IData;
    switch (type) {
      case 'EntityException':
        return new EntityError(error);
      default:
        return new HttpError(error);
    }
  }
}
