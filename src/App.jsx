import { useEffect, useContext, useState } from "react";
import { getAllPokemon, singlePokemonSearch } from "@src/pokemon";
import CardContext from "@src/CardContext";

import { Header, Controls, PokeCard, Toast } from "@comps";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";

function App() {
  const { pokemonGroup, updatePokemonGroup, toast } = useContext(CardContext);

  const [fetching, setFetching] = useState(false);

  const urlsFromDb = useLiveQuery(() => db.urls.limit(100).toArray(), []);

  useEffect(() => {
    const fetchData = async () => {
      const allUrls = await db.urls.toArray();

      if (allUrls && allUrls?.length > 0) return;

      setFetching(true);

      await getAllPokemon();

      setFetching(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {fetching ? (
        <div>Loading app...</div>
      ) : (
        <>
          <Toast message={toast.message} toast={toast} />
          <Header />
          <Controls />
          <main>
            {urlsFromDb && (
              <div className="char__container">
                {urlsFromDb.map((char, index) => {
                  return <PokeCard key={index} url={char.url} />;
                })}
              </div>
            )}
          </main>
        </>
      )}
    </>
  );
}

export default App;
