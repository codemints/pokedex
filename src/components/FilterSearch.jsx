import { useState, useRef, useContext } from 'react'
import CardContext from '@src/CardContext'

import { singlePokemonSearch } from '@src/pokemon'

const FilterSearch = () => {
  const [searchFor, setSearchFor] = useState(null)
  const { updatePokemonGroup, updateToast } = useContext(CardContext)

  const inputRef = useRef(null)
  
  const handleInput = (e) => {
    setSearchFor(e.target.value)
  }

  const resetInput = () => {
    inputRef.current.value = ''
    inputRef.current.focus()
    setSearchFor(null)
  }
  
  const handleSearch = async () => {
    if ( searchFor === null ) {
      updateToast(
        true,
        'Please enter a Pokémon name or ID'
      )
      return setTimeout(() => updateToast(false, ''), 3000)
    }
    const search = searchFor.toLowerCase()

    resetInput()
    
    try {
      const fetchSearch = await singlePokemonSearch(search)
      updatePokemonGroup([{
        name: search,
        url: `https://pokeapi.co/api/v2/pokemon/${search}`
      }])
    } catch ( err ) {
      console.log(err)
      resetInput()
      updateToast(
        true,
        'No Pokemon by that name. Please check spelling or ID and search again.'
      )
      return setTimeout(() => updateToast(false, ''), 3000)
    }
    // const fetchSearch = await singlePokemonSearch(search)
    // if ( fetchSearch.response.status >= 400 ) {
    //   console.log('does not exist')
    // }
  }
  
  return (
    <div className="filter__search">
        <input
          ref={ inputRef }
          onChange={ handleInput }
          className="search__field"
          type="text"
          placeholder="Search Pokemon by name or ID"/>
        <button
          onClick={ handleSearch }
          className="button"
          data-button="search">
          <i className="fa-regular fa-magnifying-glass"></i>
        </button>
    </div>
  )
}

export default FilterSearch