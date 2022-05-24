import { createContext, useState } from 'react'

const CardContext = createContext()

export const CardProvider = ({children}) => {
  const [pokemonGroup, setPokemonGroup] = useState(null)
  const [singlePokemon, setSinglePokemon] = useState(null)
  const [currentType, setCurrentType] = useState('all')
  const [toast, setToast] = useState({show: false, message: null})
  const [filterAttrs, setFilterAttrs] = useState([])

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
    }), 3000)
  }

  const updateFilterAttrs = (id, name) => {
    
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
      filterAttrs,
      updateFilterAttrs,
    }}>
      { children }
    </CardContext.Provider>
  )
}

export default CardContext