import Dexie from "dexie";
export const db = new Dexie("pokedex");

db.version(1).stores({
  pokemon: "++id, url, createdAt, data, name",
  urls: "++id, url, createdAt, name",
});
