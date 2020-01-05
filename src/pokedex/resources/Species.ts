import { Resource } from "rest-hooks";
import { LanguageType, PokedexEntryType, NamedApiResource } from "./types";

export default class SpeciesResource extends Resource {
  readonly name: string | undefined = undefined;
  readonly names: Array<{ language: LanguageType; name: string }> = [];
  readonly pokedex_numbers: Array<{
    entry_number: number;
    pokedex: PokedexEntryType;
  }> = [];
  readonly genera: Array<{ genus: string; language: LanguageType }> = [];
  readonly varieties: Array<{
    is_default: boolean;
    pokemon: NamedApiResource;
  }> = [];

  pk() {
    return this.name;
  }

  getName(locale = "fr") {
    return this.names.find(name => name.language.name === locale)?.name;
  }

  getEntryNumber(type = "national") {
    return this.pokedex_numbers.find(entry => entry.pokedex.name === type)
      ?.entry_number;
  }

  getGenus(locale = "fr") {
    return this.genera.find(entry => entry.language.name === locale)?.genus;
  }

  get defaultVariety() {
    return this.varieties.find(v => v.is_default)!.pokemon;
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

  static urlRoot = "https://pokeapi.co/api/v2/pokemon-species/";
}
