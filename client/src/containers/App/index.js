import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useApolloClient } from '@apollo/client'
import { isNil } from 'lodash'

import { MenuContextProvider, StoreContextProvider } from '../../contexts';
import CoreRoute from '../../router'

import { GET_MENUS, GET_BANNERS, GET_PRODUCTS } from '../../queries';

function App() {
  const [state, setState] = useState({
    loading: true,
    error: undefined,
    data: null
  })
  const client = useApolloClient();

  useEffect(() => {
    Promise.props({
      banners: client.query({
        query: GET_BANNERS
      }).then(res => res.data.banners),
      menus: client.query({
        query: GET_MENUS
      }).then(res =>  res.data.menus),
      products: client.query({
        query: GET_PRODUCTS
      }).then(res => res.data.products),
    }).then(values => {
      setState(prev => ({
        ...prev,
        loading: false,
        data: values
      }));
    })
    .catch(error => {
      setState({
        loading: false,
        data: null,
        error
      })
    })
  }, [client])
  
  const { loading, error, data } = state

  if (loading) return null;
  if (error) return `Error! ${error.message}`;

  const orderedMenu = data.menus.slice().sort((a, b) => {
    if(!isNil(a.order) && !isNil(b.order)) {
      return a.order - b.order
    }
    if(!isNil(a.order)) {
      return -1
    }
    if(!isNil(b.order)) {
      return 1
    }
    return 0
  })
  const menus = orderedMenu.map(d => {
    const getMenuItem = item => ({
      id: Number(item.id),
      icon: item.icon,
      name: item.label,
      parent: null,
    })
    return {
      ...getMenuItem(d),
      children: d.categories.map(item => ({
        id: item.path,
        categoryId: Number(item.id),
        icon: item.icon,
        name: item.label,
        path: item.path,
        parent: getMenuItem(d)
      }))
    }
  })

  const initialMenus = {
    menus,
    activeMenu: null,
    openKeys: []
  }

  const initialState = {
    banners: data.banners,
    products: data.products
  }

  return (
    <BrowserRouter>
      <MenuContextProvider initialMenus={initialMenus}>
        <StoreContextProvider initialState={initialState}>
          <CoreRoute />
        </StoreContextProvider>
      </MenuContextProvider>
    </BrowserRouter>
  );
}

App.defaultProps = {};
App.propTypes = {};

export default App;
