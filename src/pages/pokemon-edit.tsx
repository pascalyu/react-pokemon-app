import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PokemonForm from '../components/pokemon-form';
import Pokemon from '../models/pokemon';
import PokemonService from '../services/pokemon-services'
import Loader from '../components/loader';

type Params = { id: string };

const PokemonEdit: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {

    const [pokemon, setPokemon] = useState<Pokemon | null>(null);

    useEffect(() => {
        //le + avant le mach permet de convertir en integer
        PokemonService.getPokemon(+match.params.id).then(pokemon => setPokemon(pokemon));
    }, [match.params.id]);

    return (
        <div>
            {pokemon ? (
                <div className="row">
                    <h2 className="header center">Éditer {pokemon.name}</h2>
                    <PokemonForm pokemon={pokemon} isEdit={true}></PokemonForm>
                </div>
            ) : (
                    <h4 className="center"> <Loader></Loader></h4>
                )}
        </div>
    );
}

export default PokemonEdit;