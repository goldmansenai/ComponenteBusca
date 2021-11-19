import React, { useState, useEffect } from "react";
import Pokebola from "./Pokebola.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [busca, setBusca] = useState("");

  const pokemonFilter = pokemons.filter((name) => {
    return Object.values(name)
      .join("")
      .toLowerCase()
      .includes(busca.toLowerCase());
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=901"
      );
      const data = await response.json();
      setPokemons(data.results);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="form-group mx-sm-3 mb-2 form-inline">
        <label className="sr-only">Digite o nome de um Pokemon:</label>
        <input
          type="text"
          onChange={(e) => {
            setBusca(e.target.value);
          }}
          value={busca}
          className="form-control"
        />
      </div>
      <div className="d-flex">
        <ul className="list-group mx-auto justify-content-center">
          {pokemonFilter.map(({ name }) => (
            <li className="list-group-item list-group-item-warning">
              <div className="position">
                <img src={Pokebola} alt="Pokebola"/>
                <span className="px-2">
                  {Object.values(name).join("").toUpperCase()}
                </span>
                <img src={Pokebola} alt="Pokebola"/>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
