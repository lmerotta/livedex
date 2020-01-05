import { Resource } from "rest-hooks";
import { LanguageType } from "./types";

export default class TypeResource extends Resource {
  readonly name: string | undefined = undefined;
  readonly names: Array<{ language: LanguageType; name: string }> = [];

  pk() {
    return this.name;
  }

  getName(locale = "fr") {
    return this.names.find(name => name.language.name === locale)?.name;
  }

  getColors() {
    switch (this.name) {
      case "bug":
        return "bg-green-400 hover:bg-green-600 text-white";
      case "grass":
        return "bg-green-600 hover:bg-green-800 text-white";
      case "poison":
        return "bg-purple-400 hover:bg-purple-600 text-white";
      case "ghost":
      case "dragon":
        return "bg-purple-600 hover:bg-purple-800 text-white";
      case "normal":
        return "bg-gray-600 hover:bg-gray-800 text-white";
      case "ice":
        return "bg-blue-300 hover:bg-blue-500 text-white";
      case "flying":
      case "water":
        return "bg-blue-400 hover:bg-blue-600 text-white";
      case "ground":
        return "bg-yellow-800 hover:bg-yellow-900 text-white";
      case "rock":
      case "fighting":
        return "bg-yellow-700 hover:bg-yellow-800 text-white";
      case "steel":
        return "bg-gray-400 hover:bg-gray-500 text-white";
      case "fire":
        return "bg-red-700 hover:bg-red-800 text-white";
      case "electric":
        return "bg-yellow-500 hover:bg-yellow-600 text-white";
      case "psychic":
        return "bg-purple-400 hover:bg-purple-600 text-white";
      case "dark":
      case "shadow":
        return "bg-purple-800 hover:bg-purple-900 text-white";
      case "fairy":
        return "bg-pink-400 hover:bg-pink-600 text-white";
      case "unknown":
        return "bg-gray-800 hover:bg-gray-900 text-white";
      default:
        return "";
    }
  }

  static urlRoot = "https://pokeapi.co/api/v2/type/";
}
