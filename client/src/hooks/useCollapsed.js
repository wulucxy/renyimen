import { useState } from 'react'

const useCollapsed = (collapsed = false) => {
  const [state, changeState] = useState(collapsed)

  const toggleCollpase = () => {
    changeState(prev => !prev)
  }

  return [state, toggleCollpase]
}

export default useCollapsed
