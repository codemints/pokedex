import { useState, useRef, useEffect } from 'react'

const InputButton = ({ content, mutate, setMutate, field }) => {
  const [newState, setNewState] = useState(0)
  const buttonRef = useRef(null)

  const handleCount = () => {
    if ( content === '+' ) {
      setNewState(newState + 1)
      setMutate(mutate + 1)
    } else {
      if ( mutate === 0 ) return
      setNewState(newState - 1)
      setMutate(mutate - 1)
    }
  }

  useEffect(() => {
    if ( field === null ) return
      field.value = mutate
  }, [newState])

  const handleClick = (method) => {
    buttonRef.current.classList[method]('clicked')
  }

  return (
    <button
      ref={ buttonRef }
      onClick={ handleCount }
      onMouseDown={ () => handleClick('add') }
      onMouseUp={ () => handleClick('remove')}
      className="input__button"
    >
      { content }
    </button>
  )
}

export default InputButton