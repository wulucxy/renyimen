import React, { createContext, useState } from 'react';

const initialState = {
  menus: [],
  activeMenu: null,
  openKeys: []
};

export const MenuContext = createContext(initialState);

export function MenuContextProvider({ children, initialMenus }) {
  const [state, setState] = useState(initialMenus || initialState);

  return (
    <MenuContext.Provider
      value={{
        menus: state.menus,
        activeMenu: state.activeMenu,
        openKeys: state.openKeys,
        setActiveMenu: menuId => {
          setState(prev => ({
            ...prev,
            activeMenu: menuId
          }))
        },
        setOpenKeys: keys => setState(prev => ({
          ...prev,
          openKeys: keys
        })),
        toggleMenu: toggle => {
          setState({
            ...state,
            opened: toggle !== 'undefined' ? !state.opened : toggle 
          });
        }
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}
