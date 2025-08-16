import { describe, it, expect } from 'vitest';

import { HandlebarsUtil } from '../../../src';

describe('handlebars 引擎测试', async () => {
  const util = new HandlebarsUtil();
  await util.init();

  // 模板内容
  const template = `{{projectName}}-core/{{modules}}/{{entities}}/{{spinalCase entity.codeName}}/{{spinalCase (or module.codeName entity.codeName)}}.ts.hbs`;
  // 填充模型
  const model = { projectName: 'ibiz', modules: 'app', entities: 'user', entity: { codeName: 'user' }, module: { codeName: 'default' } };
  // 模板渲染后的内容
  const renderTemplate = 'ibiz-core/app/user/user/default.ts.hbs';

  it('util.render', async () => {
    const content = await util.render(template, model);
    expect(content).toEqual(renderTemplate);
  });

  it('util.syncRender', () => {
    const content = util.syncRender(template, model);
    expect(content).toEqual(renderTemplate);
  });
});
