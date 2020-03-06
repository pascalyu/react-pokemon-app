import React, { FunctionComponent, useState, useEffect } from 'react';
import PokemonList from './pages/pokemon-list';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PokemonsDetail from './pages/pokemon-detail';
import PageNotFound from "./pages/page-not-found";
import PokemonEdit from './pages/pokemon-edit';
import PokemonCreate from './pages/pokemon-create';
import PrivateRoute from './privateRoute';
import Login from './pages/login';


//FC = function component
const App: FunctionComponent = () => {
    return (
        <Router>
            <div>

                {/**la barre de nav */}

                <nav>
                    <div className="nav-wrapper teal">
                        <Link to="/" className="brand-logo center">Pokédex</Link>
                    </div>

                </nav>
                {/** Le système de gestion des routes de notre application */}

                <Switch>
                    <PrivateRoute exact path="/" component={PokemonList} />
                    <PrivateRoute exact path="/pokemons" component={PokemonList} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/pokemons/create" component={PokemonCreate} />
                    <PrivateRoute exact path="/pokemons/edit/:id" component={PokemonEdit} />
                    <PrivateRoute path="/pokemons/:id" component={PokemonsDetail} />
                    <Route component={PageNotFound} />
                </Switch>

            </div>
        </Router>
    )
}

export default App;