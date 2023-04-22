import React from "react";
import "./styles.css";
import PokemonDetails from './routes/PokemonDetails.js';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: [],
      currentPage: 1,
      pokemonsPerPage: 10,
      totalPages: null
    };
  }

  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then(response => response.json())
      .then(data => {
        const totalPokemons = data.count;
        const totalPages = Math.ceil(totalPokemons / this.state.pokemonsPerPage);
        this.setState({ totalPages });

        return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${this.state.pokemonsPerPage}&offset=${(this.state.currentPage - 1) * this.state.pokemonsPerPage}`)
          .then(response => response.json())
          .then(data => {
            let results = data.results;
            let promisesArray = results.map(result => {
              return fetch(result.url).then(response => response.json());
            });
            return Promise.all(promisesArray);
          })
          .then(data => {
            this.setState({ pokemons: data }, () =>
              console.log("Main Pokemon State: ", this.state.pokemons)
            );
          });
      });
  }

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber }, () => {
      this.componentDidMount();
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <PokeList pokemons={this.state.pokemons} />
              <Pagination currentPage={this.state.currentPage} totalPages={this.state.totalPages} onPageChange={this.handlePageChange} />
            </Route>
            <Route path="/pokemon/:id">
              <PokemonDetails pokemons={this.state.pokemons} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

const PokeList = ({ pokemons }) => {
  console.log(pokemons);

  if (pokemons.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {pokemons.map(pokemon => (
        <Pokemon key={pokemon.id} name={pokemon.name} sprite={pokemon.sprites.front_default} types={pokemon.types} id={pokemon.id} />
      ))}
    </div>
  );
};

const Pokemon = ({ name, sprite, types, id }) => {
  return (
    <div className={"poke-card " + types[0].type.name}>
      <Link to={`/pokemon/${id}`}>
        <img alt="Pokemon sprite" src={sprite} />
        <h3>{name}</h3>
      </Link>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pagesToShow = 1; // Number of pages to show before and after current page
  const pageNumbers = [];

  for (let i = Math.max(1, currentPage - pagesToShow); i <= Math.min(totalPages, currentPage + pagesToShow); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="divPag">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <button
              onClick={() => onPageChange(number)}
              className="page-link"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
