import React from 'react';
import { Row, Col, Card, Divider } from 'antd';
import styled from 'styled-components';
import { Icon } from '@ant-design/compatible';

import { prefix, publicPath } from '../../utils'

function Products(props) {
  const { productsMap, categoryIds } = props;

  // todo: 日志
  const handleClick = product => {
    window.location = product.url
    return false
  }

  return (
    <StyledContainer className='products-container'>
      {
        [...productsMap.keys()].map(categoryId => {
          // 类别名称
          const { name: categoryName, path } = (categoryIds.find(d => d.categoryId === Number(categoryId)) || {})
          const products = productsMap.get(categoryId)
          return (
            <StyledSection id={`${prefix}${path}`} className='product-item' key={categoryId}>
              <Divider>{ categoryName }</Divider>
              <StyledContent className="content-wrapper">
                <Row gutter={32}>
                  {
                    products.map(product => (
                      <Col span={6} key={product.id}>
                        <StyledCard onClick={() => handleClick(product)}>
                          <h3 className="flex flex-v-center link">
                            <StyledIcon className='product-icon' style={{
                              backgroundImage: `url(${publicPath}${product.iconUrl?.url})` 
                            }} />
                            <div className="lh-32">{product.title}</div>
                          </h3>
                          <div>
                            {product.desc}
                          </div>
                        </StyledCard>
                      </Col>
                    ))
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
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  top: 0;
  &:hover{
    box-shadow: 0 6px 12px 0 rgba(65, 80, 88, 0.14);
    top: -4px;
  }
`;

const StyledIcon = styled.div`
  width: 32px;
  height: 32px;
  margin-right: 4px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

export default Products;
