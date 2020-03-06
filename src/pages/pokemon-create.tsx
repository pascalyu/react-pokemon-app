import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import Pokemon from '../models/pokemon';
import PokemonForm from '../components/pokemon-form';

type Params = { id: string };

const PokemonCreate: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {

    const [pokemon] = useState<Pokemon>(new Pokemon(new Date().getTime()));
    return (
        <div>

            <div className="row">
                <h2 className="header center">Créer un nouveau pokémon</h2>
                <PokemonForm pokemon={pokemon} isEdit={false}></PokemonForm>
            </div>

        </div>

    );
}

export default PokemonCreate;