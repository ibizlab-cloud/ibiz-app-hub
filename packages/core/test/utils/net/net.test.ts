import { describe, expect, test, vi } from 'vitest'
import { Net } from '../../../src/utils/net/net';
import { HttpResponse } from '../../../src/utils/net/http-response';
import { CoreInterceptor } from '../../../src/utils/interceptor/core-interceptor';

describe('net', () => {
  test('本地请求仿造响应，不传入参数', () => {
    const httpResponse = new HttpResponse();

    expect(httpResponse.local).toBe(true);
    expect(httpResponse.ok).toBe(true);
    expect(httpResponse.data).toBeUndefined();
    expect(httpResponse.status).toBe(200);
    expect(httpResponse.statusText).toBe('');
    expect(httpResponse.headers).toEqual({});
  });

  test('本地请求仿造响应，传入参数', () => {
    const testData = { key: 'value' };
    const testStatus = 404;
    const testStatusText = 'Not Found';

    const httpResponse = new HttpResponse(testData, testStatus, testStatusText);

    expect(httpResponse.local).toBe(true);
    expect(httpResponse.ok).toBe(false);
    expect(httpResponse.data).toEqual(testData);
    expect(httpResponse.status).toBe(testStatus);
    expect(httpResponse.statusText).toBe(testStatusText);
    expect(httpResponse.headers).toEqual({});
  });

  test('net.interceptors', () => {
    const net = new Net();
    expect(net.interceptors.size).toBe(1);
    expect(net.interceptors.get('Default')).toBeInstanceOf(CoreInterceptor);
    net.addInterceptor('test', new CoreInterceptor());
    expect(net.interceptors.size).toBe(2);
    expect(net.interceptors.get('test')).toBeInstanceOf(CoreInterceptor);
    net.removeInterceptor('test');
    expect(net.interceptors.get('test')).toBeUndefined();
    expect(net.interceptors.size).toBe(1);
  })

});
