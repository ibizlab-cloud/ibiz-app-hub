import { describe, test, expect } from 'vitest';

describe('IBizArray', () => {
  test('com test', async () => {
    const app = await ibiz.hub.getApp();
    expect(app).toBeTruthy();
    expect(window.ibiz).toBeTruthy();
  });
});
