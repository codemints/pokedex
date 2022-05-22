import { useEffect, useContext } from 'react'
import { getAllPokemon, singlePokemonSearch } from '@src/pokemon'
import CardContext from '@src/CardContext'

import { Header, Controls, PokeCard, Toast } from '@comps'

function App() {
  const { pokemonGroup, updatePokemonGroup, toast } = useContext(CardContext)

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPokemon = await getAllPokemon()
      updatePokemonGroup(fetchedPokemon.data.results)
    }

    fetchData()
  }, [])

  return (
    <>
      <Toast message={ toast.message } toast={ toast } />
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
