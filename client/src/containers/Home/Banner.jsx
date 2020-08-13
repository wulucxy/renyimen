import React, { useContext } from 'react';
import { Carousel } from 'antd';

import { StoreContext } from '../../contexts';

function Home() {
 const { banners } = useContext(StoreContext);

  return (
    <div class="content-banner">
      <Carousel autoplay>
        {banners.map(d => (
          <a key={d.id} href={d.url}>
            <img src={d.img.url} alt={d.title} />
          </a>
        ))}
      </Carousel>
    </div>
  );
}

export default Home;
