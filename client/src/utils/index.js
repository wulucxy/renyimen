import { isNil } from 'lodash'

// 前缀
export const prefix = 'zj-nav-'

// 文件路径前缀
export const publicPath = process.env.REACT_APP_BACKEND_URL

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

// 根据 order 字段进行排序
// order 同时存在，小者优先排
// order 只存在一个，优先排
// 都不存在 order，原始排序
export const setOrder = (a, b) => {
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
}