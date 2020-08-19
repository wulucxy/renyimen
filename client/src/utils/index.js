/* eslint-disable prefer-template */
export const getQueryParams = (location, n) => {
  const half = location.split(n + '=')[1];

  return half !== undefined ? decodeURIComponent(half.split('&')[0]) : null;
};

// 前缀
export const prefix = 'zj-nav-'

export const scrollTo = (position) => {
  // 窗口最大滚动距离
  const maxScrollY = document.documentElement.scrollHeight - document.documentElement.clientHeight

  return new Promise(resolve => {
    const scrollListener = e => {
      if ('undefined' === typeof e) {
        return;
      }
      const target = e.currentTarget;
      if (target.scrollY === position) {
        target.removeEventListener('scroll', scrollListener);
        resolve();
      } else if (target.scrollY === maxScrollY){
        resolve()
      }
    };
    window.addEventListener('scroll', scrollListener);
    // 已经滚动到最底部，无法再触发再向下滚动
    if(window.scrollY === maxScrollY && position >= maxScrollY) {
      resolve()
      return
    }
    window.scrollTo({
      top: position,
      behavior: 'smooth',
    });
  });
}

// 文件路径前缀
export const publicPath = process.env.REACT_APP_BACKEND_URL
