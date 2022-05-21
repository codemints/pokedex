import { useEffect, useContext } from 'react'
import { CSSTransition } from 'react-transition-group'
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
        <CSSTransition
          in={ toast.show }
          timeout={ 600 }
          classNames='show'>
          <Toast message={ toast.message } />
        </CSSTransition>
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
