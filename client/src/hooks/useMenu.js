import { useState } from 'react'

const initialState = {
  active: null
}

const useMenu = () => {
  const [state, changeMenu] = useState(initialState)

  const toggleMenu = (menuId) => {
    changeMenu({
      active: menuId
    })
  }

  return [state, toggleMenu]
}

export default useMenu
