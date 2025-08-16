import { describe, expect, it, test } from 'vitest';
import { PluginStaticResource } from '../../src/plugin';

describe('plugin-static-resource', () => {
  const importMetaUrl = import.meta.url;
  const url = new URL(importMetaUrl);

  const pluginStaticResource = new PluginStaticResource(importMetaUrl);

  test('fn:dir', () => {
    // 无前缀相对路径
    const pathStr = 'static/css/style.css';
    expect(pluginStaticResource.dir(pathStr)).toBe(url.origin + url.pathname.replace('plugin-static-resource.spec.ts', '') + pathStr);

    // 有前缀相对路径
    const pathStr2 = './static/css/style2.css';
    expect(pluginStaticResource.dir(pathStr2)).toBe(url.origin + url.pathname.replace('plugin-static-resource.spec.ts', '') + pathStr2.replace('./', ''));

    // 绝对路径
    const pathStr3 = '/static/css/style3.css';
    expect(pluginStaticResource.dir(pathStr3)).toBe(url.origin + pathStr3);
  });

  test('fn:loadStyle', async () => {
    // 输出样式标签至界面，并确认元素输出成功
    const urls = ['https://localhost:5173/static/css/style1.css', '/static/css/style2.css'];
    const newUrls = urls.map(url => pluginStaticResource.dir(url));
    await pluginStaticResource.loadStyle(urls);

    let count = 0;

    const links = document.querySelectorAll('link');
    links.forEach(link => {
      if (link.type === 'text/css' && link.rel === 'stylesheet') {
        if (newUrls.includes(link.href)) {
          count += 1;
        }
      }
    });

    expect(count).toBe(urls.length);
  });
});
