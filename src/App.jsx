import { useEffect, useContext, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { FixedSizeGrid } from "react-window";

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

  const Item = (props) => {
    const index = props.columnIndex * 3 + props.rowIndex;
    return (
      <div className="list-item" style={props.style}>
        <PokeCard key={props.columnIndex} singlePokemon={allPokemon[index]} />
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
          <FixedSizeGrid
            className="pokemon-list"
            columnCount={3}
            columnWidth={500}
            height={1000}
            rowCount={allPokemon.length / 3}
            rowHeight={350}
            width={1800}
          >
            {Item}
          </FixedSizeGrid>
        )}
      </main>
    </>
  );
}

export default App;
