import axios from 'axios'

axios.defaults.baseURL = 'https://pokeapi.co/api/v2'

export const getAllPokemon = (limit = 150, offset = 0) => {
  return axios.get(`/pokemon?limit=${limit}&offset=${offset}`)
}

export const getPokemonType = (type='grass', limit = 20, offset = 0) => {
  return axios.get(`/type/${type}?limit=${limit}&offset=${offset}`)
}

export const getSinglePokemon = (url) => {
  return axios.get(url)
}