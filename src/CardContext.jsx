import { createContext, useState } from 'react'

const CardContext = createContext()

export const CardProvider = ({children}) => {
  const [pokemonGroup, setPokemonGroup] = useState(null)
  const [singlePokemon, setSinglePokemon] = useState(null)
  const [currentType, setCurrentType] = useState('all')
  const [toast, setToast] = useState({show: false, message: null})

  const updateSinglePokemon = (data) => {
    setSinglePokemon(data)
  }

  const updatePokemonGroup = (data) => {
    setPokemonGroup(data)
  }

  const updateCurrentType = (type) => {
    setCurrentType(type)
  }

  const updateToast = (bool, msg) => {
    setToast(toast => ({
      show: bool,
      message: msg,
    }))

    setTimeout(() => setToast({
      show: false,
      message: null
    }), 2500)
  }

  return (
    <CardContext.Provider value={{
      pokemonGroup,
      updatePokemonGroup,
      singlePokemon,
      updateSinglePokemon,
      toast,
      updateToast,
      currentType,
      updateCurrentType,
    }}>
      { children }
    </CardContext.Provider>
  )
}

export default CardContext