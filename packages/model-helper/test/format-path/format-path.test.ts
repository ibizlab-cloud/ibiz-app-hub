import { formatPath } from '../../src/utils/format-path/format-path';
import { describe, test, expect } from 'vitest';

describe('format-path', () => {
    test('模型路径从PSSYSAPPS/开始', () => {
        const path = 'PSSYSAPPS/Web/PSAPPDEVIEWS/TESTUsr7EditView.json';
        expect(formatPath(path)).toBe('/PSAPPDEVIEWS/TESTUsr7EditView.json');
    })

    test('模型路径不从PSSYSAPPS/开始', () => {
        const path = 'trainsys-core/src/main/resources/model/cn/ibizlab/trainsys/PSSYSAPPS/Web/PSAPPDEVIEWS/TESTUsr7EditView.json';
        expect(formatPath(path)).toBe('trainsys-core/src/main/resources/model/cn/ibizlab/trainsys/PSSYSAPPS/Web/PSAPPDEVIEWS/TESTUsr7EditView.json');
    })
})