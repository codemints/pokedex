import { useState, useEffect, useContext } from 'react'
import CardContext from '@src/CardContext'

import { singlePokemonSearch } from '@src/pokemon'

const FilterSearch = () => {
  const [searchFor, setSearchFor] = useState(null)
  const { updatePokemonGroup } = useContext(CardContext)
  
  const handleInput = (e) => {
    setSearchFor(e.target.value)
  }
  
  const handleSearch = async () => {
    if ( searchFor === null ) return
    const search = searchFor.toLowerCase()
    try {
      const fetchSearch = await singlePokemonSearch(search)
      updatePokemonGroup([{
        name: search,
        url: `https://pokeapi.co/api/v2/pokemon/${search}`
      }])
    } catch ( err ) {
      console.log(err)
    }
    // const fetchSearch = await singlePokemonSearch(search)
    // if ( fetchSearch.response.status >= 400 ) {
    //   console.log('does not exist')
    // }
  }
  
  return (
    <div className="filter__search">
        <input
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