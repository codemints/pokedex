import { useEffect, useContext } from 'react'
import { getAllPokemon, singlePokemonSearch } from '@src/pokemon'
import CardContext from '@src/CardContext'

import Header from '@comps/Header'
import Controls from '@comps/Controls'
import PokeCard from '@comps/PokeCard'

function App() {
  const { pokemonGroup, updatePokemonGroup } = useContext(CardContext)

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPokemon = await getAllPokemon()
      updatePokemonGroup(fetchedPokemon.data.results)
    }

    fetchData()
  }, [])

  return (
    <>
      <Header/>
      <Controls />
      <main>
        {pokemonGroup && 
          <div className="char__container">
            {pokemonGroup.map((char, index) => {
              return (
                <PokeCard
                  key={ index }
                  url={ char.url }
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
