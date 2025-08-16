import { describe, it, expect } from 'vitest';
import { HandlebarsUtil } from '../../../src';

describe('模板助手测试', async () => {
  // 模板引擎初始化
  const util = new HandlebarsUtil();
  await util.init();

  it('并且: and', () => {
    {
      const template = `{{#and age '张三' '李四'}}真的{{else}}假的{{/and}}`;
      {
        const str = util.syncRender(template, { age: 18 });
        expect(str).toBe('真的');
      }
      {
        const str = util.syncRender(template, { age: null });
        expect(str).toBe('假的');
      }
    }
    {
      const template = `{{and age '张三' '李四'}}`;
      {
        const str = util.syncRender(template, { age: 18 });
        expect(str).toBe('true');
      }
      {
        const str = util.syncRender(template, { age: null });
        expect(str).toBe('false');
      }
    }
  });

  it('横线命名法转换为驼峰命名法: camel-case', () => {
    const template = `{{camelCase "global-model"}}`;
    const str = util.syncRender(template, {});
    expect(str).toBe('globalModel');
  });

  it('字符串拼接: concat', () => {
    {
      const template = `{{concat "string1" "string2"}}`;
      const str = util.syncRender(template, {});
      expect(str).toBe('string1string2');
    }
  });

  it('等于: eq', () => {
    {
      const template = `{{#eq name '张三'}}真的{{else}}假的{{/eq}}`;
      {
        const str = util.syncRender(template, { name: '张三' });
        expect(str).toBe('真的');
      }
      {
        const str = util.syncRender(template, { name: '李四' });
        expect(str).toBe('假的');
      }
    }
    {
      const template = `{{eq name '张三'}}`;
      {
        const str = util.syncRender(template, { name: '张三' });
        expect(str).toBe('true');
      }
      {
        const str = util.syncRender(template, { name: '李四' });
        expect(str).toBe('false');
      }
    }
    {
      const template = `{{eq bol false}}`;
      {
        const str = util.syncRender(template, { bol: true });
        expect(str).toBe('false');
      }
      {
        const str = util.syncRender(template, { bol: false });
        expect(str).toBe('true');
      }
      {
        const str = util.syncRender(template, { bol: null });
        expect(str).toBe('false');
      }
      {
        const str = util.syncRender(template, { bol: undefined });
        expect(str).toBe('false');
      }
      {
        const str = util.syncRender(template, { bol: '' });
        expect(str).toBe('false');
      }
    }
  });

  it('大于: gt', () => {
    {
      const template = `{{#gt age 18}}真的{{else}}假的{{/gt}}`;
      {
        const str = util.syncRender(template, { age: 20 });
        expect(str).toBe('真的');
      }
      {
        const str = util.syncRender(template, { age: 18 });
        expect(str).toBe('假的');
      }
      {
        const str = util.syncRender(template, { age: 17 });
        expect(str).toBe('假的');
      }
    }
    {
      const template = `{{gt age 18}}`;
      {
        const str = util.syncRender(template, { age: 20 });
        expect(str).toBe('true');
      }
      {
        const str = util.syncRender(template, { age: 18 });
        expect(str).toBe('false');
      }
      {
        const str = util.syncRender(template, { age: 17 });
        expect(str).toBe('false');
      }
    }
  });

  it('大于等于: gte', () => {
    {
      const template = `{{#gte age 18}}真的{{else}}假的{{/gte}}`;
      {
        const str = util.syncRender(template, { age: 20 });
        expect(str).toBe('真的');
      }
      {
        const str = util.syncRender(template, { age: 18 });
        expect(str).toBe('真的');
      }
      {
        const str = util.syncRender(template, { age: 17 });
        expect(str).toBe('假的');
      }
    }
    {
      const template = `{{gte age 18}}`;
      {
        const str = util.syncRender(template, { age: 20 });
        expect(str).toBe('true');
      }
      {
        const str = util.syncRender(template, { age: 18 });
        expect(str).toBe('true');
      }
      {
        const str = util.syncRender(template, { age: 17 });
        expect(str).toBe('false');
      }
    }
  });

  it('字符串转小写: lower-case', () => {
    {
      const template = `{{lowerCase "GlobalModel"}}`;
      const str = util.syncRender(template, {});
      expect(str).toBe('globalmodel');
    }
  });

  it('小于: lt', () => {
    {
      const template = `{{#lt age 18}}真的{{else}}假的{{/lt}}`;
      {
        const str = util.syncRender(template, { age: 17 });
        expect(str).toBe('真的');
      }
      {
        const str = util.syncRender(template, { age: 18 });
        expect(str).toBe('假的');
      }
      {
        const str = util.syncRender(template, { age: 20 });
        expect(str).toBe('假的');
      }
    }
    {
      const template = `{{lt age 18}}`;
      {
        const str = util.syncRender(template, { age: 17 });
        expect(str).toBe('true');
      }
      {
        const str = util.syncRender(template, { age: 18 });
        expect(str).toBe('false');
      }
      {
        const str = util.syncRender(template, { age: 20 });
        expect(str).toBe('false');
      }
    }
  });

  it('小于等于: lte', () => {
    {
      const template = `{{#lte age 18}}真的{{else}}假的{{/lte}}`;
      {
        const str = util.syncRender(template, { age: 17 });
        expect(str).toBe('真的');
      }
      {
        const str = util.syncRender(template, { age: 18 });
        expect(str).toBe('真的');
      }
      {
        const str = util.syncRender(template, { age: 20 });
        expect(str).toBe('假的');
      }
    }
    {
      const template = `{{lte age 18}}`;
      {
        const str = util.syncRender(template, { age: 17 });
        expect(str).toBe('true');
      }
      {
        const str = util.syncRender(template, { age: 18 });
        expect(str).toBe('true');
      }
      {
        const str = util.syncRender(template, { age: 20 });
        expect(str).toBe('false');
      }
    }
  });

  it('不等于: neq', () => {
    {
      const template = `{{#neq name '张三'}}真的{{else}}假的{{/neq}}`;
      {
        const str = util.syncRender(template, { name: '李四' });
        expect(str).toBe('真的');
      }
      {
        const str = util.syncRender(template, { name: '张三' });
        expect(str).toBe('假的');
      }
    }
    {
      const template = `{{neq name '张三'}}`;
      {
        const str = util.syncRender(template, { name: '李四' });
        expect(str).toBe('true');
      }
      {
        const str = util.syncRender(template, { name: '张三' });
        expect(str).toBe('false');
      }
    }
  });

  it('不存在: not', () => {
    const template = `{{#not name}}真的{{else}}假的{{/not}}`;
    {
      const str = util.syncRender(template, { name: null });
      expect(str).toBe('真的');
    }
    {
      const str = util.syncRender(template, { name: undefined });
      expect(str).toBe('真的');
    }
    {
      const str = util.syncRender(template, { name: '' });
      expect(str).toBe('真的');
    }
    {
      const str = util.syncRender(template, { name: [] });
      expect(str).toBe('真的');
    }
    {
      const str = util.syncRender(template, { name: {} });
      expect(str).toBe('真的');
    }
    {
      const str = util.syncRender(template, { name: '张三' });
      expect(str).toBe('假的');
    }
  });

  it('或者: or', () => {
    {
      const template = `{{#or name false null}}真的{{else}}假的{{/or}}`;
      {
        const str = util.syncRender(template, { name: '张三' });
        expect(str).toBe('真的');
      }
      {
        const str = util.syncRender(template, {});
        expect(str).toBe('假的');
      }
    }
    {
      const template = `{{or name '张三' '李四'}}`;
      {
        const str = util.syncRender(template, { name: '王五' });
        expect(str).toBe('王五');
      }
      {
        const str = util.syncRender(template, { name: null });
        expect(str).toBe('张三');
      }
    }
    {
      const template = `{{or name null '李四'}}`;
      {
        const str = util.syncRender(template, { name: '张三' });
        expect(str).toBe('张三');
      }
      {
        const str = util.syncRender(template, { name: undefined });
        expect(str).toBe('李四');
      }
    }
  });

  it('首字母转大写: pascal-case', () => {
    const template = `{{pascalCase "globalModel"}}`;
    const str = util.syncRender(template, {});
    expect(str).toBe('GlobalModel');
  });

  it('驼峰转蛇形命名法: snake-case', () => {
    {
      const template = `{{snakeCase "iBizModel"}}`;
      const str = util.syncRender(template, {});
      expect(str).toBe('i_biz_model');
    }
    {
      const template = `{{snakeCase "IBizModel"}}`;
      const str = util.syncRender(template, {});
      expect(str).toBe('i_biz_model');
    }
    {
      const template = `{{snakeCase "IBIZModel"}}`;
      const str = util.syncRender(template, {});
      expect(str).toBe('ibiz_model');
    }
  });

  it('驼峰命名法转为横线命名法: spinal-case', () => {
    {
      const template = `{{spinalCase "iBizModel"}}`;
      const str = util.syncRender(template, {});
      expect(str).toBe('i-biz-model');
    }
    {
      const template = `{{spinalCase "IBizModel"}}`;
      const str = util.syncRender(template, {});
      expect(str).toBe('i-biz-model');
    }
    {
      const template = `{{spinalCase "IBIZModel"}}`;
      const str = util.syncRender(template, {});
      expect(str).toBe('ibiz-model');
    }
  });

  it('字符串转大写: upper-case', () => {
    const template = `{{upperCase "globalModel"}}`;
    const str = util.syncRender(template, {});
    expect(str).toBe('GLOBALMODEL');
  });
});
