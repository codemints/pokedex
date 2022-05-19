import { useState, useEffect } from 'react'
import axios from 'axios'

import Header from '@comps/Header'
import Character from '@comps/Character'

function App() {
  const [poke, setPoke] = useState(null)
  const base = 'https://pokeapi.co/api/v2'

  const limit = 30;
  const offset = 151;

  useEffect(() => {
      axios
        .get(`${base}/pokemon?limit=${limit}&offset=${offset}`)
        .then(res => setPoke(res.data))
  }, [])

  return (
    <>
    <Header/>
    <main>
      {poke && 
        <div className="char__container">
          {poke.results.map((result, index) => {
            return (
              <Character
                key={ index }
                url={ result.url }
              />
            )
          })}
        </div>
      }
    </main>
    </>
  )
}

export default App
