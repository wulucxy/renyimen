import React, { useContext } from 'react';
import { isNil } from 'lodash'

import { MenuContext, StoreContext } from '../../contexts';
import Banner from './Banner'
import Products from './products'
import { getSubMenuInfo } from '../../layouts/utils'

function Home() {
  const { menus } = useContext(MenuContext);
  const { products } = useContext(StoreContext);

  // 获取分类 ids
  const categoryIds = getSubMenuInfo(menus, d => ({
    categoryId: d.categoryId,
    name: d.name,
    path: d.path
  }))

  // 按照顺序的产品列表
  let productsMap = new Map()

  categoryIds.forEach(({ categoryId }) => {
    products.forEach(product => {
      if(!isNil(product.category) && Number(product.category.id) === categoryId) {
        if(!productsMap.get(categoryId)){
          productsMap.set(categoryId, [product])
        } else {
          productsMap.get(categoryId).push(product)
        }
      }
    })
  })

  return (
    <div>
      <Banner />
      <Products productsMap={productsMap} categoryIds={categoryIds} />
    </div>
  );
}

export default Home;
