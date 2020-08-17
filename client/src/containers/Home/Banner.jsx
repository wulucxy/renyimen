import React, { useContext } from 'react';
import { Carousel } from 'antd';
import { publicPath } from '../../utils'

import { StoreContext } from '../../contexts';

function Home() {
 const { banners } = useContext(StoreContext);

  return (
    <div className="content-banner">
      <Carousel autoplay>
        {banners.map(d => {
          const imgUrl = `${publicPath}${d.img.url}`
          const target = d.url.startsWith('http') ? "_blank" : '_self'
          return (
            <a key={d.id} href={d.url} target={target}>
              <img src={imgUrl} alt={d.title} />
            </a>
          )
        })}
      </Carousel>
    </div>
  );
}

export default Home;
