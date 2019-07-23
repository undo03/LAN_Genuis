import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import { wxLogin, getWxLoginCode } from './actions/login'

import Index from './pages/index'

import store from './store'

import './app.scss'

class App extends Component {

  config = {
    pages: [
      'pages/login/index', 'pages/kids/index', 'pages/index/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  async componentDidMount () {
    let wxCode = Taro.getStorageSync('wxCode')
    if (!wxCode) {
      wxCode = await getWxLoginCode()
    }
    await wxLogin(wxCode)
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
