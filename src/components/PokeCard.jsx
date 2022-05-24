import { useState, useEffect, useContext } from 'react'
import { convertMeasurement, typeIcons } from '../utils'
import { getSinglePokemon } from '@src/pokemon'
import CardContext from '@src/CardContext'

const PokeCard = ({ url }) => {
  const [singlePokemon, setSinglePokemon] = useState(null)
  const { updateFilterAttrs } = useContext(CardContext)

  useEffect(() => {
    const fetchSinglePokemon = async () => {      
      const fetched = await getSinglePokemon(url)
      setSinglePokemon(fetched.data)
    }
    
    fetchSinglePokemon()
  }, [singlePokemon])
  
  return (
    <>
      {singlePokemon && (
        <div className={ `char__card bg-${singlePokemon.types[0].type.name}` }>
          <div className="char__card--inner">
            <div className={ `char__color bg-${singlePokemon.types[0].type.name}`}>
              <div className="char__id">
                <p>#{ String(singlePokemon.id).padStart(3, '0') }</p>
              </div>
              <div className="char__icons">
                {singlePokemon.types.map((type, index) => {
                  return (
                    <i
                      key={ index }
                      className={ `fa-solid ${typeIcons[type.type.name]}`}>
                    </i>
                  )
                })}
              </div>
            </div>
            
            <div className="char__overview">
              <div className="char__img">
                <img
                  src={ singlePokemon.sprites.front_default }
                  alt={ singlePokemon.name } />
              </div>
              
              <div className="char__stats">
                <p>xp: { singlePokemon.base_experience }</p>
                <p>ht: { convertMeasurement(singlePokemon.height, 3.048) }ft</p>
                <p>wt: { convertMeasurement(singlePokemon.weight, 4.536) }lbs</p>
              </div>
            </div>
            
            <div className="char__details">
              <h2>{ singlePokemon.name }</h2>
              <div className="char__types">
                {singlePokemon.types.map((type, index) => {
                  return (
                    <p
                      key={ index }
                      className={ `char__type--indicator bg-${type.type.name}` }>
                      { type.type.name }
                    </p>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PokeCard