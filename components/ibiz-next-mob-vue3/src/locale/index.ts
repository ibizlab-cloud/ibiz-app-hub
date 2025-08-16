import { createI18n } from 'vue-i18n';
import { I18n } from '@ibiz-template/core';

const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
});

export class IBizI18n implements I18n {
  protected html: HTMLElement;

  protected defaultLang: string;

  protected langMap: Map<string, () => Promise<IData>> = new Map();

  constructor() {
    this.defaultLang = 'zh-CN';
    this.html = document.querySelector('html')!;
    const lang =
      localStorage.getItem('language') ||
      navigator.language ||
      this.defaultLang;
    i18n.global.locale.value = lang;
    this.html.setAttribute('lang', lang);
    // 设置默认支持的多语言
    this.langMap.set('en', () => import('./en/index'));
    this.langMap.set('zh-CN', () => import('./zh-CN/index'));
  }

  /**
   * 初始化加载默认多语言文件
   *
   * @author chitanda
   * @date 2023-08-24 17:08:04
   * @return {*}  {Promise<void>}
   */
  async init(): Promise<void> {
    const lang = i18n.global.locale.value;
    let p: () => Promise<IData>;
    if (this.langMap.has(lang)) {
      p = this.langMap.get(lang)!;
    } else {
      p = this.langMap.get(this.defaultLang)!;
    }
    const module = await p();
    i18n.global.setLocaleMessage(i18n.global.locale.value, module.default);
  }

  /**
   * 设置异步加载的多语言模块
   *
   * @author chitanda
   * @date 2023-08-24 23:08:01
   * @param {Record<string, () => Promise<IData>>} languages
   */
  setLangConfigs(languages: Record<string, () => Promise<IData>>): void {
    const keys = Object.keys(languages);
    keys.forEach(key => {
      this.langMap.set(key, languages[key]);
    });
  }

  /**
   * 设置
   *
   * @author chitanda
   * @date 2023-08-24 16:08:42
   * @param {string} lang
   */
  setLang(lang: string): void {
    ibiz.confirm
      .warning({
        title: ibiz.i18n.t('locale.prompt'),
        desc: ibiz.i18n.t('locale.switchLanguagePrompt'),
      })
      .then(() => {
        localStorage.setItem('language', lang);
        window.location.reload();
      });
  }

  getLang(): string {
    return this.html.getAttribute('lang') || this.defaultLang;
  }

  t(tag: string, options?: IParams | undefined): string;

  t(tag: string, defaultMsg?: string | undefined, options?: IParams): string;

  t(tag: unknown, defaultMsg?: unknown, options?: unknown): string {
    return i18n!.global.t(
      tag as string,
      defaultMsg as string,
      options as IParams,
    );
  }

  /**
   * 合并语言资源
   *
   * @author zhanghengfeng
   * @date 2024-08-05 20:08:14
   * @param {IParams} data
   */
  mergeLocaleMessage(data: IParams): void;

  /**
   * 合并指定语言资源
   *
   * @author zhanghengfeng
   * @date 2024-08-05 20:08:24
   * @param {string} lang
   * @param {IParams} data
   */
  mergeLocaleMessage(lang: string, data: IParams): void;

  /**
   * 合并语言资源
   *
   * @author zhanghengfeng
   * @date 2024-08-05 20:08:34
   * @param {(IParams | string)} dataOrLang
   * @param {IParams} [data]
   */
  mergeLocaleMessage(dataOrLang: IParams | string, data?: IParams): void {
    if (typeof dataOrLang === 'string') {
      const lang = dataOrLang;
      i18n.global.mergeLocaleMessage(lang, data);
    } else {
      const langData = dataOrLang;
      if (langData && Object.keys(langData).length > 0) {
        Object.keys(langData).forEach(key => {
          i18n.global.mergeLocaleMessage(key, langData[key]);
        });
      }
    }
  }
}

const iBizI18n = new IBizI18n();

export { i18n, iBizI18n };
