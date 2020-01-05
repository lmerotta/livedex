import { Resource } from "rest-hooks";

export default class SpeciesListResource extends Resource {
  readonly name = "";

  pk() {
    return this.name;
  }

  static listShape<T extends typeof Resource>(this: T) {
    return {
      ...super.listShape(),
      schema: {
        results: [this.getEntitySchema()],
        count: 0,
        next: "",
        previous: ""
      }
    };
  }

  static listUrl(searchParams: Readonly<Record<string, string | number>> = {}) {
    return super.listUrl(
      Object.keys(searchParams).length > 0 ? searchParams : { limit: 60 }
    );
  }

  static urlRoot = "https://pokeapi.co/api/v2/pokemon-species";
}
