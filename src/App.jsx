import { useEffect, useContext, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { FixedSizeList } from "react-window";

import { getAllPokemon, singlePokemonSearch } from "@src/pokemon";
import { db } from "./db";
import CardContext from "@src/CardContext";
import { Header, Controls, PokeCard, Toast } from "@comps";

function App() {
  const { pokemonGroup, updatePokemonGroup, toast } = useContext(CardContext);
  const allPokemon = useLiveQuery(() => db.pokemon.toArray(), []);

  useEffect(() => {
    const fetchData = async () => {
      const allUrls = await db.urls.toArray();

      if (allUrls && allUrls?.length > 0) return;

      await getAllPokemon();
    };

    fetchData();
  }, []);

  const Item = ({ index, style }) => {
    return (
      <div className="list-item" style={style}>
        <PokeCard key={index} singlePokemon={allPokemon[index]} />
      </div>
    );
  };

  return (
    <>
      <Toast message={toast.message} toast={toast} />
      <Header />
      <Controls />
      <main>
        {allPokemon && (
          <FixedSizeList
            className="pokemon-list"
            height={1000}
            itemCount={allPokemon.length}
            itemSize={350}
            width={1800}
          >
            {Item}
          </FixedSizeList>
        )}
      </main>
    </>
  );
}

export default App;
