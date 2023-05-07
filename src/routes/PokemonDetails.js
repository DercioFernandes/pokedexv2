import React from "react";
import { Link, useParams, HashRouter, Switch, Route } from "react-router-dom";

const PokemonDetails = ({ pokemons }) => {
  const { id } = useParams();
  const pokemon = pokemons.find((pokemon) => pokemon.id == id);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  const { name, sprites, stats, types } = pokemon;

  return (
    <div className={"poke-details " + types[0].type.name}>
      <h2>{name}</h2>
      <img className="pokeSprite" src={sprites.front_default} alt={name} />

      <h3>Stats:</h3>
      <ul className="pokemonStats">
        {stats.map((stat) => (
          <li key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
        {types.map((type) => (
          <li key={type.type.name}>Type: {type.type.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default function PokemonDetailsComponent() {
  return (
    <HashRouter>
      <div>
        <Switch>
          <Route path="/pokemon/:id">
            <PokemonDetails pokemons={[]} />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}
