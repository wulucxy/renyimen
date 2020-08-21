import { useState, useEffect } from 'react'
import { useLocalStorage } from 'react-use';

const useCollapsed = (collapsed = false) => {
  const [state, changeState] = useState(collapsed)
  const [, setCollapsed] = useLocalStorage('isCollapsed')

  const toggleCollpase = () => {
    changeState(prev => !prev)
  }

  useEffect(() => {
    setCollapsed(state)
  }, [state])

  return [state, toggleCollpase]
}

export default useCollapsed
