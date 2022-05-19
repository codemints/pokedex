import { useState, useEffect } from 'react'
import axios from 'axios'

import Character from '@comps/Character'

function App() {
  const [poke, setPoke] = useState(null)
  const base = 'https://pokeapi.co/api/v2'

  useEffect(() => {
      axios
        .get(`${base}/pokemon?limit=151`)
        .then(res => setPoke(res.data))
  }, [])

  return (
    <>
    {poke && 
      <ul>
        {poke.results.map((result, index) => {
          return (
            <Character
              key={ index }
              url={ result.url }
            />
          )
        })}
      </ul>
    }
    </>
  )
}

export default App
