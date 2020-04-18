import Pokemon from "../models/pokemon";
import POKEMONS from "../models/mock-pokemon";
const URL_API = process.env.REACT_APP_API;
export default class PokemonService {
  static pokemons: Pokemon[] = POKEMONS;

  static isDev =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development";

  static getPokemons(): Promise<Pokemon[]> {
    if (this.isDev) {
      return fetch(`${URL_API}/pokemons`)
        .then(response => response.json())
        .catch(error => this.handleError(error));
    }

    return new Promise(resolve => {
      resolve(this.pokemons);
    });
  }

  static getPokemon(id: number): Promise<Pokemon | null> {
    if (this.isDev) {
      return fetch(`${URL_API}/pokemons/${id}`)
        .then(response => response.json())
        .then(data => (this.isEmpty(data) ? null : data))
        .catch(error => this.handleError(error));
    }

    return new Promise(resolve => {
      resolve(this.pokemons.find(pokemon => id === pokemon.id));
    });
  }

  static updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
    if (this.isDev) {
      return fetch(`${URL_API}/pokemons/${pokemon.id}`, {
        method: "PUT",
        body: JSON.stringify(pokemon),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .catch(error => this.handleError(error));
    }

    return new Promise(resolve => {
      const { id } = pokemon;
      const index = this.pokemons.findIndex(pokemon => pokemon.id === id);
      this.pokemons[index] = pokemon;
      resolve(pokemon);
    });
  }

  static deletePokemon(pokemon: Pokemon): Promise<{}> {
    if (this.isDev) {
      return fetch(`${URL_API}/pokemons/${pokemon.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .catch(error => this.handleError(error));
    }

    return new Promise(resolve => {
      const { id } = pokemon;
      this.pokemons = this.pokemons.filter(pokemon => pokemon.id !== id);
      resolve({});
    });
  }

  static createPokemon(pokemon: Pokemon): Promise<Pokemon> {
    pokemon.created = new Date(pokemon.created);

    if (this.isDev) {
      return fetch(`${URL_API}/pokemons`, {
        method: "POST",
        body: JSON.stringify(pokemon),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .catch(error => this.handleError(error));
    }

    return new Promise(resolve => {
      this.pokemons.push(pokemon);
      resolve(pokemon);
    });
  }

  static searchPokemon(term: string): Promise<Pokemon[]> {
    if (this.isDev) {
      return fetch(`${URL_API}/pokemons?q=${term}`)
        .then(response => response.json())
        .catch(error => this.handleError(error));
    }

    return new Promise(resolve => {
      const results = this.pokemons.filter(pokemon =>
        pokemon.name.includes(term)
      );
      resolve(results);
    });
  }

  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }

  static handleError(error: Error): void {
    console.error(error);
  }
}
