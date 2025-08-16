import { verifyDeRules } from '../../../src/utils/verify/de-rule-verify';
import { test, describe, expect } from 'vitest';

describe('de-rule-verify', () => {
   test('verifyDeRules:条件组嵌套测试', () => {
      const simpleCondition = {
         condOp: "AND",
         condType: "GROUP",
         name: "默认组",
         conds: [{
            condType: "STRINGLENGTH",
            maxValue: 3,
            name: "默认字符串长度",
            ruleInfo: "内容长度必须小于等于[3]",
            includeMaxValue: true,
            includeMinValue: false,
            keyCond: true,
            appId: '123456',
            defname: 'name'
         }],
         ruleInfo: "内容长度必须小于等于[3]",
         appId: '123456',
         defname: 'name'
      }
      const result = verifyDeRules('name', { name: '111' }, simpleCondition);

      expect(result.isPast).toBe(true);
      expect(result.infoMessage).toBe('内容长度必须小于等于[3]');
   });

   test('verifyDeRules:常规规则', () => {
      const simpleCondition = {
         condOp: "EQ",
         condType: "SIMPLE",
         name: "[常规条件] 等于(=) (100)",
         paramType: "SRCENTITYFIELD",
         paramValue: "100",
         ruleInfo: "name等于100",
         appId: '123456',
         defname: 'name'
      }
      const result = verifyDeRules('name', { name: 100 }, simpleCondition);

      expect(result.isPast).toBe(true);
      expect(result.infoMessage).toBe('name等于100');
   });

   test('verifyDeRules:数值范围校验', () => {
      const simpleCondition = {
         condType: "VALUERANGE2",
         maxValue: 444.0,
         minValue: 1.0,
         name: "[数值范围] 大于 1.0 且  小于 444.0",
         ruleInfo: "数值必须大于[1.0]且小于[444.0]",
         includeMaxValue: false,
         includeMinValue: false,
         appId: '123456',
         defname: 'name'
      }
      const result = verifyDeRules('name', { name: 443 }, simpleCondition);

      expect(result.isPast).toBe(true);
      expect(result.infoMessage).toBe('数值必须大于[1.0]且小于[444.0]');
   });

   test('verifyDeRules:正则校验', () => {
      const simpleCondition = {
         condType: "REGEX",
         name: "[正则式](^[0-9]*$)",
         regExCode: "^[0-9]*$",
         ruleInfo: "只能写数字",
         appId: '123456',
         defname: 'name'
      }
      const result = verifyDeRules('name', { name: 'a' }, simpleCondition);

      expect(result.isPast).toBe(false);
      expect(result.infoMessage).toBe('只能写数字');
   });

   test('verifyDeRules:长度规则校验', () => {
      const simpleCondition = {
         condType: "STRINGLENGTH",
         maxValue: 3,
         name: "默认字符串长度",
         ruleInfo: "内容长度必须小于等于[3]",
         includeMaxValue: true,
         includeMinValue: false,
         keyCond: true,
         appId: '123456',
         defname: 'name'
      }
      const result = verifyDeRules('name', { name: '1111' }, simpleCondition);

      expect(result.isPast).toBe(false);
      expect(result.infoMessage).toBe('内容长度必须小于等于[3]');
   });

   test('verifyDeRules:系统值规则校验中的正则校验', () => {
      const simpleCondition = {
         condType: "SYSVALUERULE",
         name: "[系统值规则]URL",
         sysValueRule: {
            codeName: "ValueRule17",
            dynaModelFilePath: "PSSYSVALUERULES/ValueRule17.json",
            name: "URL",
            regExCode: "[a-zA-z]+://(\\w+(-\\w+)*)(\\.(\\w+(-\\w+)*))*(\\?\\S*)?",
            ruleInfo: "内容必须为有效URL格式",
            ruleType: "REG",
            enableBackend: true,
            enableFront: true
         },
         ruleInfo: "内容必须为有效URL格式",
         appId: '123456',
         defname: 'name'
      }
      const result = verifyDeRules('name', { name: 'https://www.example.com' }, simpleCondition);

      expect(result.isPast).toBe(true);
      expect(result.infoMessage).toBe('内容必须为有效URL格式');
   });

   test('verifyDeRules:系统值规则校验中的脚本校验', () => {
      const simpleCondition = {
         condType: "SYSVALUERULE",
         name: "[系统值规则]脚本值规则测试",
         sysValueRule: {
            codeName: "ValueRule20",
            dynaModelFilePath: "PSSYSVALUERULES/ValueRule20.json",
            name: "脚本值规则测试",
            ruleInfo: "脚本校验",
            ruleType: "SCRIPT",
            scriptCode: "console.log(data);\nconsole.log(value);",
            enableBackend: true,
            enableFront: true
         },
         ruleInfo: "脚本校验",
         appId: '123456',
         defname: 'name'
      }
      const result = verifyDeRules('name', { name: { data: 1, } }, simpleCondition);

      expect(result.isPast).toBe(true);
      expect(result.infoMessage).toBe('脚本校验');
   });
})
