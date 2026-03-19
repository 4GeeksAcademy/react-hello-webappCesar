import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("https://swapi.dev/api/people/")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "set_people", payload: data.results }));

    fetch("https://swapi.dev/api/planets/")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "set_planets", payload: data.results }));
  }, []);

  const isFavorite = (name) => store.favorites.some((f) => f.name === name);

  const toggleFavorite = (item, type) => {
    if (isFavorite(item.name)) {
      dispatch({ type: "remove_favorite", payload: item.name });
    } else {
      dispatch({ type: "add_favorite", payload: { ...item, type } });
    }
  };

  const getId = (url) => url.match(/\/(\d+)\/$/)[1];

  const renderCard = (item, type) => (
    <div key={item.name} className="card" style={{ width: "200px" }}>
      <img
        src={`https://starwars-visualguide.com/assets/img/${type === "person" ? "characters" : "planets"}/${getId(item.url)}.jpg`}
        alt={item.name}
        className="card-img-top"
        style={{ height: "200px", objectFit: "cover" }}
        onError={(e) => (e.target.style.display = "none")}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{item.name}</h5>
        <div className="mt-auto d-flex gap-2 pt-2">
          <button
            className="btn btn-sm btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#infoModal"
            onClick={() => setSelected({ ...item, type })}
          >
            Leer más
          </button>
          <button
            className={`btn btn-sm ${isFavorite(item.name) ? "btn-warning" : "btn-outline-warning"}`}
            onClick={() => toggleFavorite(item, type)}
          >
            <i className={`fa-${isFavorite(item.name) ? "solid" : "regular"} fa-star`}></i>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Personajes</h2>
      <div className="d-flex flex-wrap gap-3 mb-5">
        {store.people.map((person) => renderCard(person, "person"))}
      </div>

      <h2 className="mb-3">Planetas</h2>
      <div className="d-flex flex-wrap gap-3">
        {store.planets.map((planet) => renderCard(planet, "planet"))}
      </div>

      <div className="modal fade" id="infoModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{selected?.name}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {selected?.type === "person" ? (
                <ul className="list-unstyled mb-0">
                  <li><strong>Genero:</strong> {selected.gender}</li>
                  <li><strong>Altura:</strong> {selected.height} cm</li>
                  <li><strong>Peso:</strong> {selected.mass} kg</li>
                  <li><strong>Color de cabello:</strong> {selected.hair_color}</li>
                  <li><strong>Color de Ojos:</strong> {selected.eye_color}</li>
                  <li><strong>Año de nacimiento:</strong> {selected.birth_year}</li>
                </ul>
              ) : (
                <ul className="list-unstyled mb-0">
                  <li><strong>Clima:</strong> {selected?.climate}</li>
                  <li><strong>Terreno:</strong> {selected?.terrain}</li>
                  <li><strong>Población:</strong> {selected?.population}</li>
                  <li><strong>Diametro:</strong> {selected?.diameter}</li>
                  <li><strong>Gravedad:</strong> {selected?.gravity}</li>
                  <li><strong>Periodo Orbital:</strong> {selected?.orbital_period}</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
