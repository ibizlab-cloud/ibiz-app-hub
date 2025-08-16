import { mergeModel } from '../../src/utils/merge-model/merge-model';
import { describe, test, expect } from 'vitest';

describe('merge-model', () => {
    test('测试预制模型完全合并', () => {
        const models = [
            { id: 'test1', name: 'Model 1', data: { key: 'value1' } },
            { id: 'test2', name: 'Model 2', data: { key: 'value2' } }
        ];

        const model = {
            'test1': { data: { newKey: 'newValue1' } },
            'test2': { data: { newKey: 'newValue2' } }
        };

        const tag = 'id';

        mergeModel(models, model, tag);
        expect(models[0]).toEqual({
            id: 'test1',
            name: 'Model 1',
            data: { key: 'value1', newKey: 'newValue1' }
        });
        expect(models[1]).toEqual({
            id: 'test2',
            name: 'Model 2',
            data: { key: 'value2', newKey: 'newValue2' }
        });
    });

    test('测试预制模型合并,内容重复时与左侧模型为准', () => {
        const models = [
            { id: 'test1', name: 'Model 1', data: { key: 'value1', newKey: 'newValue1' } },
            { id: 'test2', name: 'Model 2', data: { key: 'value2' } }
        ];

        const model = {
            'test1': { data: { newKey: 'newValue11' } },
        };

        const tag = 'id';

        mergeModel(models, model, tag);
        expect(models).toEqual([
            { id: 'test1', name: 'Model 1', data: { key: 'value1', newKey: 'newValue1' } },
            { id: 'test2', name: 'Model 2', data: { key: 'value2' } }
        ])
    })
})