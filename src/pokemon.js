import axios from "axios";
import { db } from "./db";

axios.defaults.baseURL = "https://pokeapi.co/api/v2";

export const getAllPokemon = async (limit = 1500, offset = 0) => {
  const {
    data: { results },
  } = await axios.get(`/pokemon?limit=${limit}&offset=${offset}`);
  return db.urls.bulkAdd(results);
};

export const getPokemonType = (type = "grass", limit = 20, offset = 0) => {
  return axios.get(`/type/${type}?limit=${limit}&offset=${offset}`);
};

export const getSinglePokemon = async (url) => {
  const pokemon = await db.pokemon.where("url").equals(url).first();
  if (pokemon) {
    return pokemon;
  }
  const { data } = await axios.get(url);
  const entry = { ...data, url };
  await db.pokemon.add(entry);
  return entry;
};

export const singlePokemonSearch = (id) => {
  return axios.get(`/pokemon/${id}`);
};
