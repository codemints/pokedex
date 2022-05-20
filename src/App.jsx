import { useState, useEffect, useContext } from 'react'
import { getAllPokemon } from '@src/pokemon'
import CardContext from '@src/CardContext'

import Header from '@comps/Header'
import Filter from '@comps/Filter'
import Character from '@comps/Character'

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
      <Filter />
      <main>
        {pokemonGroup && 
          <div className="char__container">
            {pokemonGroup.map((char, index) => {
              return (
                <Character
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
