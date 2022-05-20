export const typeIcons = {
  grass: 'fa-leaf',
  poison:'fa-flask-round-poison',
  fire: 'fa-fire-flame-curved',
  water: 'fa-droplet',
  electric: 'fa-bolt',
  flying: 'fa-feather',
  bug: 'fa-bug',
  normal: 'fa-bullseye',
  ground: 'fa-earth-asia',
  fairy: 'fa-wand-sparkles',
  fighting: 'fa-hand-fist',
  psychic: 'fa-crystal-ball',
  rock: 'fa-gem',
  steel: 'fa-sword',
  ghost: 'fa-ghost',
  ice: 'fa-snowflake',
  dragon: 'fa-dragon',
  dark: 'fa-moon'
}

export const convertMeasurement = (measurement, divisor) => {
  return (measurement / divisor).toFixed(2)
}

export const formatSelectedType = (type) => {
  const first = type.slice(0, 1).toUpperCase()
  const rest = type.slice(1)
  
  return first.concat(rest)
}

export const formatPokemonObject = (data) => {
  return data.reduce((acc, val) => {
    return [...acc, val.pokemon]
  }, [])
}