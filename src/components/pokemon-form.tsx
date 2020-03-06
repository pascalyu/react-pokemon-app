import React, { FunctionComponent, useState } from 'react';
import Pokemon from '../models/pokemon';
import formatType from '../helpers/format-type';
import { useHistory } from 'react-router-dom';
import PokemonService from '../services/pokemon-services';
import { create } from 'domain';


type Props = {
    pokemon: Pokemon,
    isEdit: Boolean
};

type Field = {
    value?: any,
    error?: string,
    isValid?: boolean

};

type Form = {
    picture: Field,
    name: Field,
    hp: Field,
    cp: Field,
    types: Field

};
const PokemonForm: FunctionComponent<Props> = ({ pokemon, isEdit = true }) => {

    const [form, setForm] = useState<Form>({
        picture: { value: pokemon.picture, isValid: true },
        name: { value: pokemon.name, isValid: true },
        hp: { value: pokemon.hp, isValid: true },
        cp: { value: pokemon.cp, isValid: true },
        types: { value: pokemon.types, isValid: true },
    });
    const history = useHistory();
    const types: string[] = [
        'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
        'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
    ];

    const hasTypes = (type: string): boolean => {
        return form.types.value.includes(type);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;
        const newField: Field = { [fieldName]: { value: fieldValue } };

        setForm({ ...form, ...newField });

    }

    const selectType = (type: string, e: React.ChangeEvent<HTMLInputElement>): void => {
        const checked = e.target.checked;
        let newField: Field;
        if (checked) {
            const newTypes: string[] = form.types.value.concat([type]);
            newField = { value: newTypes };
        } else {

            const newTypes: string[] = form.types.value.filter((currentType: string) => currentType !== type);
            newField = { value: newTypes };
        }

        setForm({ ...form, ...{ types: newField } });

    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            pokemon.picture = form.picture.value;
            pokemon.name = form.name.value;
            pokemon.hp = form.hp.value;
            pokemon.cp = form.cp.value;
            pokemon.types = form.types.value;
            pokemon.name = form.name.value;

            isEdit ? updatePokemon() : createPokemon();
        }
    }
    const createPokemon = () => {
        PokemonService.createPokemon(pokemon).then(() => history.push(`/pokemons/${pokemon.id}`))


    }

    const updatePokemon = () => {
        PokemonService.updatePokemon(pokemon).then(() => history.push(`/pokemons/${pokemon.id}`))


    }

    const deletePokemon = () => {
        PokemonService.deletePokemon(pokemon).then(() => history.push('/pokemons'));

    }

    const validateForm = () => {
        let newForm: Form = form;

        if (!isEdit) {


        }

        // Validator name
        if (!/^[a-zA-Zàéè ]{3,25}$/.test(form.name.value)) {
            const errorMsg: string = 'Le nom du pokémon est requis (1-25).';
            const newField: Field = { value: form.name.value, error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ name: newField } };
        } else {
            const newField: Field = { value: form.name.value, error: '', isValid: true };
            newForm = { ...newForm, ...{ name: newField } };
        }

        // Validator hp
        if (!/^[0-9]{1,3}$/.test(form.hp.value)) {
            const errorMsg: string = 'Les points de vie du pokémon sont compris entre 0 et 999.';
            const newField: Field = { value: form.hp.value, error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ hp: newField } };
        } else {
            const newField: Field = { value: form.hp.value, error: '', isValid: true };
            newForm = { ...newForm, ...{ hp: newField } };
        }

        // Validator cp
        if (!/^[0-9]{1,2}$/.test(form.cp.value)) {
            const errorMsg: string = 'Les dégâts du pokémon sont compris entre 0 et 99';
            const newField: Field = { value: form.cp.value, error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ cp: newField } };
        } else {
            const newField: Field = { value: form.cp.value, error: '', isValid: true };
            newForm = { ...newForm, ...{ cp: newField } };
        }

        setForm(newForm);
        return newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid;
    }

    const isTypesValid = (type: string): boolean => {
        // Cas n°1: Le pokémon a un seul type, qui correspond au type passé en paramètre.
        // Dans ce cas on revoie false, car l'utilisateur ne doit pas pouvoir décoché ce type (sinon le pokémon aurait 0 type, ce qui est interdit)
        if (form.types.value.length === 1 && hasTypes(type)) {
            return false;
        }

        // Cas n°1: Le pokémon a au moins 3 types.
        // Dans ce cas il faut empêcher à l'utilisateur de cocher un nouveau type, mais pas de décocher les types existants.
        if (form.types.value.length >= 3 && !hasTypes(type)) {
            return false;
        }

        // Après avoir passé les deux tests ci-dessus, on renvoie 'true', 
        // c'est-à-dire que l'on autorise l'utilisateur à cocher ou décocher un nouveau type.
        return true;
    }


    return (
        <form onSubmit={e => handleSubmit(e)}>
            <div className="row">
                <div className="col s12 m8 offset-m2">
                    <div className="card hoverable">
                        {isEdit &&
                            <div className="card-image">

                                <img src={pokemon.picture} alt={pokemon.name} style={{ width: '250px', margin: '0 auto' }} />

                                <span className="btn-floating halfway-fab waves-effect waves-light">
                                    <i onClick={deletePokemon} className="  ">delete</i>
                                </span>
                            </div>
                        }
                        <div className="card-stacked">
                            <div className="card-content">


                                {!isEdit &&

                                    <div className="form-group">
                                        <label htmlFor="name">Image</label>
                                        <input id="picture" name="picture" type="text" className="form-control" value={form.picture.value} onChange={e => handleInputChange(e)}></input>
                                        {form.name.error &&
                                            <div className="card-panel red accent-l">
                                                {form.name.error}
                                            </div>
                                        }
                                    </div>
                                }
                                {/* Pokemon name */}
                                <div className="form-group">
                                    <label htmlFor="name">Nom</label>
                                    <input id="name" name="name" type="text" className="form-control" value={form.name.value} onChange={e => handleInputChange(e)}></input>
                                    {form.name.error &&
                                        <div className="card-panel red accent-l">
                                            {form.name.error}
                                        </div>
                                    }
                                </div>
                                {/* Pokemon hp */}
                                <div className="form-group">
                                    <label htmlFor="hp">Point de vie</label>
                                    <input id="hp" name="hp" type="number" className="form-control" value={form.hp.value} onChange={e => handleInputChange(e)}></input>
                                    {form.hp.error &&
                                        <div className="card-panel red accent-l">
                                            {form.hp.error}
                                        </div>
                                    }
                                </div>
                                {/* Pokemon cp */}
                                <div className="form-group">
                                    <label htmlFor="cp">Dégâts</label>
                                    <input id="cp" name="cp" type="number" className="form-control" value={form.cp.value} onChange={e => handleInputChange(e)}></input>
                                    {form.cp.error &&
                                        <div className="card-panel red accent-l">
                                            {form.cp.error}
                                        </div>
                                    }
                                </div>
                                {/* Pokemon types */}
                                <div className="form-group">
                                    <label>Types</label>
                                    {types.map(type => (
                                        <div key={type} style={{ marginBottom: '10px' }}>
                                            <label>
                                                <input id={type} type="checkbox" className="filled-in" value={type} disabled={!isTypesValid(type)} checked={hasTypes(type)} onChange={e => selectType(type, e)}></input>
                                                <span>
                                                    <p className={formatType(type)}>{type}</p>
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="card-action center">
                                {/* Submit button */}
                                <button type="submit" className="btn">Valider</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PokemonForm;