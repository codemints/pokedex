import { useState, useEffect } from 'react'
import { typeIcons } from '@/src/utils'

const Filter = () => {
  const [selectedOption, setSelectedOption] = useState('All')
  const [selectState, setSelectState] = useState(false)
  
  const handleSelect = (key) => {
    const first = key.slice(0, 1).toUpperCase()
    const rest = key.slice(1)
    const all = first.concat(rest)
    
    setSelectedOption(all)
    setSelectState(!selectState)
  }
  
  return (
    <section className="filter">
      <div className="filter__wrapper">
        <div className="custom__select">
          <div
            className="select__label"
            onClick={() => setSelectState(!selectState)}>
            <label>Filter By Type: <span>{ selectedOption }</span></label>
            
            {selectState === false
              ? ( <i className="fa-solid fa-chevron-down"></i> )
              : ( <i className="fa-solid fa-chevron-up"></i> )
          }
          </div>
          {selectState === true &&
            <ul>
              <li
                className="type"
                onClick={ () => handleSelect('All') }>
                All
              </li> 
              {Object.keys(typeIcons).map((key, index) => (
                <li
                  key={ index }
                  data-option-value={ key }
                  className={ `type type-${ index + 1 } type-${ key }` }
                  onClick={ () => handleSelect(key) }>
                  { key }
                </li>
              ))}
          </ul>
          }
        </div>
      </div>
    </section>
  )
}

export default Filter