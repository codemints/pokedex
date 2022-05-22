//IF filterByType === all
  // && show || start || start + show > pokemonGroup.length
    //Make new Axios request to API with limit and offset values
  //ELSE
    //updatePokemonGroup to be pokemonGroup.slice offset & limit

//IF show || start || start + show > pokemonGroup.length
  //Trigger toast
  //Include pokemonGroup.length in message
  //Erase field value
//ELSE
  //updatePokemonGroup to be pokemonGroup.slice offset & limit

import { useState, useRef, useContext, useEffect } from 'react'
import { InputButton } from '@comps'
import CardContext from '@src/CardContext'

const FilterQuantity = () => {
  const { updateToast, pokemonGroup } = useContext(CardContext)
  const [show, setShow] = useState(0)
  const [start, setStart] = useState(0)

  const showRef = useRef(null)
  const startRef = useRef(null)

  const checkForDelete = (event, data, setData) => {
    if ( event.code === 'Backspace' || event.code === 'Delete' ) {
      if ( event.target.value.length < 1 ) return setData(0)
      setData(Number(event.target.value))
    }
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

    // console.log(pokemonGroup)
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
          />
          
          <input
            ref={ startRef }
            onChange={ (e) => setShowCount(e, startRef) }
            onKeyUp={ (e) => checkForDelete(e, show, setShow) }
            type="text"
            placeholder={ start }/>
            
          <InputButton
            content="+"
            mutate={ start }
            setMutate={ setStart }
            field={ startRef.current }
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
          />
          
          <input
            ref={ showRef }
            onChange={ (e) => setShowCount(e, showRef) }
            onKeyUp={ (e) => checkForDelete(e, show, setShow) }
            type="text"
            placeholder={ show }/>
            
          <InputButton
            content="+"
            mutate={ show }
            setMutate={ setShow }
            field={ showRef.current }
          />
        </div>
      </div>
      
      <div className="filter__submit">
        <button>GO!</button>
      </div>
    </div>
  )
}

export default FilterQuantity