import { IApiParams } from '@ibiz-template/core';

/**
 * @description 语音工具类
 * @export
 * @interface IApiVoiceUtil
 */
export interface IApiVoiceUtil {
  /**
   * @description 文字转语音
   * @param {string} text
   * @param {IApiParams} [options]
   * @returns {*}  {Promise<boolean>}
   * @memberof IApiVoiceUtil
   */
  textToSpeech(text: string, options?: IApiParams): Promise<boolean>;
}
