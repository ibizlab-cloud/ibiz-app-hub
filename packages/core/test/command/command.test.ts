import { describe, it, expect } from 'vitest';
import { commands } from '../../src/command';

describe('command', () => {
  const commandTag = 'trigger';
  it('should register command', async () => {
    const param = 'arg';
    const result = await new Promise((resolve) => {
      commands.register(commandTag, (arg: string) => {
        resolve(arg);
      });
      commands.execute(commandTag, param);
    });
    expect(result).toBe(param);
  });
});
