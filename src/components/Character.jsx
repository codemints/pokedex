import { useState, useEffect } from 'react'
import axios from 'axios'

const Character = ({ url }) => {
  const [character, setCharacter] = useState(null)

  useEffect(() => {
    axios
      .get(url)
      .then(res => setCharacter(res.data))
  }, [])

  useEffect(() => console.log(character), [character])

  return (
    <>
      {character && (
        <div>
          <img
            className="character__img"
            src={ character.sprites.front_default }
            alt={ character.name } />
          <h2>{ character.name }</h2>
        </div>
      )}
    </>
  )
}

export default Character