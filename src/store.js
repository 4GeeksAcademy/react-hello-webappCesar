export const initialStore = () => {
  return {
    people: [],
    planets: [],
    favorites: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_people":
      return { ...store, people: action.payload };
    case "set_planets":
      return { ...store, planets: action.payload };
    case "add_favorite":
      if (store.favorites.find((f) => f.name === action.payload.name)) return store;
      return { ...store, favorites: [...store.favorites, action.payload] };
    case "remove_favorite":
      return { ...store, favorites: store.favorites.filter((f) => f.name !== action.payload) };
    default:
      throw Error("Unknown action.");
  }
}
