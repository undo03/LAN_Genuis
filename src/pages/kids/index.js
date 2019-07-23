import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'

import main_logo from '../../images/main_logo.png'
import avatar from '../../images/avatar.png'
import './index.scss'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Kids extends Component {

    config = {
    navigationBarTitleText: '幼儿列表'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='kids'>
        <Image className='main-logo' src={main_logo} />
        {
          [1, 2, 3].map(item => (
            <View class='kid-item' key={item}>
              <Image class='avatar' src={avatar}  />
              <View class='class-info'>
                <Text class='kid-info'>小孩一</Text>
                <Text class='kindergarten'>天才幼儿园大（1）班</Text>
              </View>
            </View>
          ))
        }

      </View>
    )
  }
}

export default Kids
