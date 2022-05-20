import { createContext, useState } from 'react'

const CardContext = createContext()

export const CardProvider = ({children}) => {
  const [pokemonGroup, setPokemonGroup] = useState(null)
  const [singlePokemon, setSinglePokemon] = useState(null)

  const updateSinglePokemon = (data) => {
    setSinglePokemon(data)
  }

  const updatePokemonGroup = (data) => {
    setPokemonGroup(data)
  }

  return (
    <CardContext.Provider value={{
      pokemonGroup,
      updatePokemonGroup,
      singlePokemon,
      updateSinglePokemon,
    }}>
      { children }
    </CardContext.Provider>
  )
}

export default CardContext