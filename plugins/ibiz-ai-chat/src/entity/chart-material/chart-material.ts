import { IMaterial } from '../../interface';

export class ChatMaterial implements IMaterial {
  get id(): IMaterial['id'] {
    return this.material.id;
  }

  get type(): IMaterial['type'] {
    return this.material.type;
  }

  get metadata(): IMaterial['metadata'] {
    return this.material.metadata;
  }

  get data(): IMaterial['data'] {
    return this.material.data;
  }

  constructor(public material: IMaterial) {}
}
