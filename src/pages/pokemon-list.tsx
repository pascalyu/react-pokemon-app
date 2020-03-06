import React, { FunctionComponent, useState, useEffect } from 'react';
import Pokemon from '../models/pokemon';
import PokemonService from '../services/pokemon-services'
import PokemonCard from '../components/pokemon-card';
import { useHistory } from 'react-router-dom';
import PokemonSearch from '../components/pokemon-search';

const PokemonList: FunctionComponent = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const history = useHistory();
    const goToCreatePokemon = () => {
        history.push(`/pokemons/create`);
    }
    useEffect(() => {
        PokemonService.getPokemons().then(pokemons => setPokemons(pokemons));
    }, []);
    return (
        <div>
            <h1 className="center">Pokédex</h1>
            <div className="container center">
                <PokemonSearch></PokemonSearch>
                <div className="center btn btn-success" onClick={() => goToCreatePokemon()} >create pokemon<i className="material-icons">add</i></div>
                <div className="row">
                    {pokemons.map(pokemon => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PokemonList;