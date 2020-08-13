cur_dir=`pwd`

help() {
cat << EOT

Usage:
  clean   清理服务缓存
  init    初始化环境
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
init() {
  # 后端编译
  cd api && npm install && NODE_ENV=production npm run build
  cd ${cur_dir}

  # 前端编译
  cd client && npm install && npm run build
  cd ${cur_dir}
}

start() {
  cd api && pm2 start --name strapi-service server.js
  cd ${cur_dir}
}

# 解析调用参数
action=$1

case "$action" in
  clean|init|start)
    ${action}
    ;;
  *)
    help
    ;;
esac
