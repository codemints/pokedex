import { useEffect, useContext } from 'react'
import { getAllPokemon, singlePokemonSearch } from '@src/pokemon'
import CardContext from '@src/CardContext'

import Header from '@comps/Header'
import Controls from '@comps/Controls'
import PokeCard from '@comps/PokeCard'
import Toast from '@comps/Toast'

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
      {toast.show && (
        <Toast message={ toast.message } toast={ toast } />
      )}
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
