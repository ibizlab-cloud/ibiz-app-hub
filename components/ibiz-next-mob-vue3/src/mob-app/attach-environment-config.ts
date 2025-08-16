/* eslint-disable @typescript-eslint/no-explicit-any */
const envMap = new Map([
  ['baseUrl', 'BaseUrl'],
  ['remoteModelUrl', 'remoteDynaPath'],
  ['dcSystem', 'mockDcSystemId'],
  ['enablePermission', 'enablePermissionValid'],
  ['enableTitle', 'enableTitle'],
]);

export async function attachEnvironmentConfig(): Promise<void> {
  const env = (window as any).Environment;

  // environment.js里的值覆盖到ibiz.env里，名称不一致的按envMap映射去修改。
  Object.keys(ibiz.env).forEach(key => {
    const key2 = envMap.has(key) ? envMap.get(key)! : key;
    if (env[key2] != null) {
      if (key2 === 'customParams' || key2 === 'devtoolConfig') {
        (ibiz.env as any)[key] = JSON.parse(env[key2]);
      } else {
        (ibiz.env as any)[key] = env[key2];
      }
    }
  });

  if (env.AppLabel) {
    document.title = env.AppLabel;
  }

  ibiz.log.setLevel(ibiz.env.logLevel);
}
