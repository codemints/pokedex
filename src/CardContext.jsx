import { createContext, useState } from 'react'

const CardContext = createContext()

export const CardProvider = ({children}) => {
  const [pokemonGroup, setPokemonGroup] = useState(null)
  const [singlePokemon, setSinglePokemon] = useState(null)
  const [toast, setToast] = useState({show: false, message: null})

  const updateSinglePokemon = (data) => {
    setSinglePokemon(data)
  }

  const updatePokemonGroup = (data) => {
    setPokemonGroup(data)
  }

  const updateToast = (bool, msg) => {
    setToast(toast => ({
      show: bool,
      message: msg,
    }))
  }

  return (
    <CardContext.Provider value={{
      pokemonGroup,
      updatePokemonGroup,
      singlePokemon,
      updateSinglePokemon,
      toast,
      updateToast,
    }}>
      { children }
    </CardContext.Provider>
  )
}

export default CardContext