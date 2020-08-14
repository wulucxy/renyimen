cur_dir=`pwd`

help() {
cat << EOT

Usage:
  clean   清理服务缓存
  install 依赖安装
  build   编译
  start   启动服务
EOT
exit
}

# 清理文件
clean() {
  cd api && rm -rf node_modules .cache build
  cd ${cur_dir}

  cd client && rm -rf node_modules
  cd ${cur_dir}
}

# 初始化启动
install() {
  # 后端安装
  cd api && cnpm install
  cd ${cur_dir}

  # 前端安装
  cd client && cnpm install
  cd ${cur_dir}
}

build() {
  # 后端编译
  cd api && NODE_ENV=production npm run build
  cd ${cur_dir}

  # 前端编译
  cd client && npm run build
  cd ${cur_dir}
}

start() {
  cd api && pm2 startOrRestart process.json --only production
  cd ${cur_dir}
}

# 解析调用参数
action=$1

case "$action" in
  clean|install|build|start)
    ${action}
    ;;
  *)
    help
    ;;
esac
