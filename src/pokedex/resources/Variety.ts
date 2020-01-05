import { Resource } from 'rest-hooks'
import { SpritesType, NamedApiResource } from './types'

export default class VarietyResource extends Resource {
  readonly name: string | undefined = undefined
  readonly sprites: SpritesType = { front_default: '' }
  readonly types: Array<{ slot: number, type: NamedApiResource }> = []

  pk() {
    return this.name
  }

  getTypes() {
    return this.types.sort((t1, t2) => {
      if (t1.slot < t2.slot ) {
        return -1
      }

      if (t1.slot > t2.slot) {
        return 1;
      }

      return 0;
    }).map(t => t.type)
  }

  static urlRoot = 'https://pokeapi.co/api/v2/pokemon/'

  static listShape<T extends typeof Resource>(this: T) {
    return {
      ...super.listShape(),
      schema: { results: [this.getEntitySchema()] },
    };
  }
}