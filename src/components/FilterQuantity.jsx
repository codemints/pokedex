import { useState, useRef, useContext, useEffect } from 'react'
import { InputButton } from '@comps'
import { getAllPokemon } from '@src/pokemon'
import CardContext from '@src/CardContext'

const FilterQuantity = () => {
  const {
    updateToast,
    pokemonGroup,
    updatePokemonGroup,
    currentType
  } = useContext(CardContext)
  
  const [show, setShow] = useState(0)
  const [start, setStart] = useState(0)
  const [isFiltered, setIsFiltered] = useState(false)
  const [prevGroup, setPrevGroup] = useState(null)

  const showRef = useRef(null)
  const startRef = useRef(null)

  const checkForDelete = (event, data, setData) => {
    if ( event.code === 'Backspace' || event.code === 'Delete' ) {
      if ( event.target.value.length < 1 ) return setData(0)
      setData(Number(event.target.value))
    }
  }

  const resetValues = () => {
    setShow(0)
    setStart(0)
    showRef.current.value = ''
    startRef.current.value = ''
  }

  const getKeyData = (event, elementRef) => {
    const val = elementRef.current.value
    const char = event.nativeEvent.data

    if ( char === null ) return
    
    const ascii = char.charCodeAt(0)

    if ( ascii < 48 || ascii > 57 ) {
      const indexOfLetter = event.target.selectionStart - 1
      const newVal = val.split('').filter((char, idx) => indexOfLetter !== idx).join('')
      
      elementRef.current.value = newVal
      elementRef.current.selectionStart = indexOfLetter
      elementRef.current.selectionEnd = indexOfLetter
      
      updateToast(
        true,
        'Only numbers allowed!'
      )
      return false
    }

    return true
  }

  const setShowCount = (event, elementRef) => {
    const keyData = getKeyData(event, elementRef)
    if ( !keyData ) return
    
    if ( elementRef === showRef ) setShow(Number(elementRef.current.value))
    if ( elementRef === startRef ) setStart(Number(elementRef.current.value))
  }

  const filterOffset = async () => {
    if ( start === 0 || show === 0 ) {
      resetValues()
      updateToast(
        true,
        '"Start" and "Show" values must be greater than 0'
      )
      return
    }
    const groupLength = pokemonGroup.length

    if ( currentType.toLowerCase() === 'all' ) {
      if ( show > groupLength || start > groupLength || (start + show) > groupLength ) {
        setPrevGroup(pokemonGroup)
        const newPokemonSet = await getAllPokemon(show + 1, start - 1)
        updatePokemonGroup(newPokemonSet.data.results)
        return resetValues()
      }
    }
    
    if ( show > groupLength || start > groupLength || (start + show) > groupLength) {
      updateToast(
        true,
        `There are only ${groupLength} Pokémon in this group. "Start" and "Show" values cannot exceed the number of Pokémon in this group.`
      )
      
      return resetValues()
    }

    setPrevGroup(pokemonGroup)
    updatePokemonGroup(pokemonGroup.slice(start - 1, (start - 1) + show))
    resetValues()
    return setIsFiltered(true)
  }

  const resetFilters = () => {
    updatePokemonGroup(prevGroup)
    setIsFiltered(false)
  }
  
  return (
    <div className="filter__quantity">
      <div className="filter__start">
        <h4>Start at:</h4>
        
        <div className="input__group">
          <InputButton
            content="-"
            mutate={ start }
            setMutate={ setStart }
            field={ startRef.current }
            isFiltered={ isFiltered }
          />
          
          <input
            ref={ startRef }
            onChange={ (e) => setShowCount(e, startRef) }
            onKeyUp={ (e) => checkForDelete(e, show, setShow) }
            type="text"
            placeholder={ start }
            disabled={ isFiltered }/>
            
          <InputButton
            content="+"
            mutate={ start }
            setMutate={ setStart }
            field={ startRef.current }
            isFiltered={ isFiltered }
          />
        </div>
      </div>
      
      <div className="filter__show">
        <h4>Show:</h4>
        
        <div className="input__group">
          <InputButton
            content="-"
            mutate={ show }
            setMutate={ setShow }
            field={ showRef.current }
            isFiltered={ isFiltered }
          />
          
          <input
            ref={ showRef }
            onChange={ (e) => setShowCount(e, showRef) }
            onKeyUp={ (e) => checkForDelete(e, show, setShow) }
            type="text"
            placeholder={ show }
            disabled={ isFiltered }/>
            
          <InputButton
            content="+"
            mutate={ show }
            setMutate={ setShow }
            field={ showRef.current }
            isFiltered={ isFiltered }
          />
        </div>
      </div>
      
      <div className="filter__submit">
        <button
          onClick={ filterOffset }
          disabled={ isFiltered }
        >GO!</button>
      </div>
      
      <div className="filter__reset">
        <button
          onClick={ resetFilters }
          disabled={ !isFiltered }
        >Reset</button>
      </div>
    </div>
  )
}

export default FilterQuantity