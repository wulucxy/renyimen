import React, { useContext } from 'react';

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
  let orderProducts = {}

  categoryIds.forEach(({ categoryId }) => {
    products.forEach(product => {
      if(Number(product.category.id) === categoryId) {
        if(!orderProducts[categoryId]){
          orderProducts[categoryId] = [product]
        } else {
          orderProducts[categoryId].push(product)
        }
      }
    })
  })

  return (
    <div>
      <Banner />
      <Products productsMap={orderProducts} categoryIds={categoryIds} />
    </div>
  );
}

export default Home;
