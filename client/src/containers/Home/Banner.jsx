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
          return (
            <a key={d.id} href={d.url} target="_blank">
              <img src={imgUrl} alt={d.title} />
            </a>
          )
        })}
      </Carousel>
    </div>
  );
}

export default Home;
