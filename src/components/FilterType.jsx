import { useState, useEffect, useContext } from 'react'
import { typeIcons } from '@/src/utils'
import CardContext from '@src/CardContext'
import { getPokemonType } from '@src/pokemon'
import { formatSelectedType, formatPokemonObject } from '@src/utils'
import { getAllPokemon } from '../pokemon'

const FilterType = () => {
  const [selectedOption, setSelectedOption] = useState('All')
  const [isOpen, setIsOpen] = useState(false)

  const { pokemonGroup, updatePokemonGroup } = useContext(CardContext)
  
  const handleTypeSelect = async (type) => {
    const selectedType = formatSelectedType(type)
    setSelectedOption(selectedType)
    setIsOpen(!isOpen)
    
    if ( type === 'All' ) {
      const fetchAll = await getAllPokemon()
      updatePokemonGroup(fetchAll.data.results)
    } else {
      const fetchedPokemonType = await getPokemonType(type)
      const pokemonData = formatPokemonObject(fetchedPokemonType.data.pokemon)
      updatePokemonGroup(pokemonData)
    }
  }
  
  return (
    <div className="filter__type">
      <div className="custom__select">
        <div
          className="select__label"
          onClick={() => setIsOpen(!isOpen)}>
          <label>Filter By Type: <span>{ selectedOption }</span></label>
          
          {isOpen === false
            ? ( <i className="fa-solid fa-chevron-down"></i> )
            : ( <i className="fa-solid fa-chevron-up"></i> )
        }
        </div>
        {isOpen === true &&
          <ul>
            <li
              className="type"
              onClick={ () => handleTypeSelect('All') }>
              All
            </li> 
            {Object.keys(typeIcons).map((key, index) => (
              <li
                key={ index }
                data-option-value={ key }
                className={ `type type-${ index + 1 } type-${ key }` }
                onClick={ () => handleTypeSelect(key) }>
                { key }
              </li>
            ))}
        </ul>
        }
      </div>
    </div>
  )
}

export default FilterType