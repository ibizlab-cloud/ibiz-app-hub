import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { FileUploaderWriter } from './file-uploader-writer';

export class PictureWriter extends FileUploaderWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSPicture = src

    _.w(d, 'rawContent', s);

    super.onFillDSL(c, s, d);
  }
}
