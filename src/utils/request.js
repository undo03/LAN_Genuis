import Taro from '@tarojs/taro'

Taro.addInterceptor(Taro.interceptors.logInterceptor)
Taro.addInterceptor(Taro.interceptors.timeoutInterceptor)
export default (params) => {
  let defaultParams = {
    method: 'GET',
  }

  return Taro.request({
    ...defaultParams,
    ...params
  })
}
