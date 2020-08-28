import React from 'react';
import { Row, Col, Card, Divider } from 'antd';
import styled from 'styled-components';

import { prefix, publicPath, setOrder } from '../../utils'

const defaultIconUrl = require('../../assets/img/sad.png')

function Products(props) {
  const { productsMap, categoryIds } = props;

  const handleClick = product => {
    // todo: 日志
  }

  return (
    <StyledContainer className='products-container'>
      {
        [...productsMap.keys()].map(categoryId => {
          // 类别名称
          const { name: categoryName, path } = (categoryIds.find(d => d.categoryId === Number(categoryId)) || {})
          const products = productsMap.get(categoryId)
          const orderedProducts = products.slice().sort(setOrder)

          return (
            <StyledSection id={`${prefix}${path}`} className='product-item' key={categoryId}>
              <Divider>{ categoryName }</Divider>
              <StyledContent className="content-wrapper">
                <Row gutter={32}>
                  {
                    orderedProducts.map(product => {
                      const productImg = product.iconUrl ? `${publicPath}${product.iconUrl?.url}` : defaultIconUrl
                      return (
                        <Col span={6} key={product.id}>
                          <StyledCard onClick={() => handleClick(product)}>
                            <a href={product.url} target="_blank" rel="noopener noreferrer">
                              <h3 className="flex flex-v-center link">
                                <StyledIcon className='product-icon' style={{
                                  backgroundImage: `url(${productImg})`
                                }} />
                                <div className="lh-32 ellipsis">{product.title}</div>
                              </h3>
                              <div className="common">
                                {product.desc}
                              </div>
                            </a>
                          </StyledCard>
                        </Col>
                      )
                    })
                  }                
                </Row>
              </StyledContent>
            </StyledSection>
          )
        })
      }
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  padding: 28px 0;
  margin: 0 auto;
`;

const StyledSection = styled.div`
  margin-bottom: 32px;
`;

const StyledContent = styled.div`
  background-color: #fff;
  padding: 28px 32px;
`;

const StyledCard = styled(Card)`
  cursor: pointer;
  position: relative;
  height: 128px;
  margin-bottom: 12px;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  top: 0;
  &:hover{
    box-shadow: 0 6px 12px 0 rgba(65, 80, 88, 0.14);
    top: -4px;
  }
  .ant-card-body{
    padding: 0;
    height: 100%;
    a{
      display: block;
      padding: 20px 16px;
      height: 100%;
    }
  }
`;

const StyledIcon = styled.div`
  width: 32px;
  height: 32px;
  margin-right: 8px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

export default Products;
