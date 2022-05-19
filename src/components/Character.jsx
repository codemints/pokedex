import { useState, useEffect } from 'react'
import axios from 'axios'
import { convertMeasurement, typeIcons } from '../utils'

const Character = ({ url }) => {
  const [character, setCharacter] = useState(null)

  useEffect(() => {
    axios
      .get(url)
      .then(res => setCharacter(res.data))
  }, [])

  return (
    <>
      {character && (
        <div className={ `char__card bg-${character.types[0].type.name}` }>
          <div className="char__card--inner">
            <div className={ `char__color bg-${character.types[0].type.name}`}>
              <div className="char__id">
                <p>#{ String(character.id).padStart(3, '0') }</p>
              </div>
              <div className="char__icons">
                {character.types.map((type, index) => {
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
                  src={ character.sprites.front_default }
                  alt={ character.name } />
              </div>
              
              <div className="char__stats">
                <p>xp: { character.base_experience }</p>
                <p>ht: { convertMeasurement(character.height, 3.048) }ft</p>
                <p>wt: { convertMeasurement(character.weight, 4.536) }lbs</p>
              </div>
            </div>
            
            <div className="char__details">
              <h2>{ character.name }</h2>
              <div className="char__types">
                {character.types.map((type, index) => {
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

export default Character