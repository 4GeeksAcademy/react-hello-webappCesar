import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <>
      <nav className={`navbar navbar-dark ${styles.navbar}`}>
        <div className="container">
          <Link to="/" className="navbar-brand">
            <span className={styles.brand}>Star Wars Blog</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#favoritesOffcanvas"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      <div className="offcanvas offcanvas-end" id="favoritesOffcanvas">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">
            <i className="fa-solid fa-star me-2 text-warning"></i>
            Favorites ({store.favorites.length})
          </h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          {store.favorites.length === 0 ? (
            <p className="text-muted">No favorites yet.</p>
          ) : (
            <ul className="list-group">
              {store.favorites.map((fav) => (
                <li
                  key={fav.name}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    <i className={`fa-solid fa-${fav.type === "person" ? "user" : "globe"} me-2 text-secondary`}></i>
                    {fav.name}
                  </span>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => dispatch({ type: "remove_favorite", payload: fav.name })}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

