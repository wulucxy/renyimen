import axios from 'axios'

function throwHttpError(message, code) {
  const error = new Error(message)
  error.name = 'HttpError'
  error.code = code

  throw error
}

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})

instance.interceptors.response.use(
  function(response) {
    let result = response.data
    
    if (!result) {
      throwHttpError('请求异常！')
    }

    if (typeof result !== 'object') {
      throwHttpError('返回数据格式异常！')
    }

    return result
  },
  function(error) {
    if (error.response) {
      const data = error.response.data
      if (data && data.error) {
        throwHttpError(data.error)
      }
      throwHttpError('请求异常：' + error.response.statusText)
    }

    if (error.request) {
      throwHttpError('请求异常：无返回结果')
    }

    throwHttpError(error.message)
  }
)

export default instance
