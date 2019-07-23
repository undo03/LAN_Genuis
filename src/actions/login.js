import Taro from '@tarojs/taro'
import request from '../utils/request'
import store from '../store'

export const GET_WX_LOGIN_CODE = 'GET_WX_LOGIN_CODE'
export const getWxLoginCode = async () => {
  let wxLoginRes = await Taro.login()
  console.log('wx login res', wxLoginRes)
  let wxCode = wxLoginRes.code
  Taro.setStorageSync('wxCode', wxCode)
  return wxCode
}

export const GET_PHONE_CODE = 'GET_PHONE_CODE'
export const wxLogin = async (wxCode) => {
  let res = await request({
    url: `https://bluewindtech.cn/servicecloud/api/wechat/login?code=${wxCode}`
  })
  console.log(res);
}
