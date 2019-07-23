import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtButton, AtInput, AtCheckbox } from 'taro-ui'
import { connect } from '@tarojs/redux'

import main_logo from '../../images/main_logo.png'
import './index.scss'


@connect(({ counter }) => ({
  counter
}))
class Login extends Component {

  config = {
    navigationBarTitleText: '登录'
  }

  state = {
    phone: '',
    code: '',
    codeNumber: '',
    disabled: false,
    second: 60,
    isAgree: false,
    checkedList: []
  }

  checkboxOption = [{
    value: 'agree',
    label: '阅读并同意'
  }]

  componentDidMount() {  }


  handleChangeChecked (value) {
    this.setState({
      isAgree: !!value.length,
      checkedList: value
    })
  }

  handleInput (stateName, value) {
    this.setState({
      [stateName]: value
    })
  }

  sendCode () {
    const { disabled, phone } = this.state
    if (disabled) return
    if (!phone || !(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))) {
      Taro.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    // TODO： 获取验证码

    this.setState({
      codeNumber: '1234',
      disabled: true
    }, () => {
      // 倒计时
      const timer = setInterval(() => {
        const { second } = this.state
        if (second > 0) {
          this.setState({
            second: second - 1
          })
        } else {
          this.setState({
            second: 60,
            disabled: false
          })
          clearInterval(timer)
        }
      }, 1000)
    })
  }

  showTipText () {
    const { disabled, second } = this.state
    return disabled ? `${second}秒后重试` : '发送验证码'
  }

  confirmAuthorization = () => {
    const { phone, codeNumber, code, isAgree } = this.state;
    if (!phone) {
      Taro.showToast({
        title: '请输入手机号码，并获取验证码',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    // 校验是否输入了验证码
    if (!code) {
      Taro.showToast({
        title: '请输入手机验证码',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    // 校验验证码是否正确
    if (code !== codeNumber) {
      Taro.showToast({
        title: '输入的验证码有误请重新输入',
        icon: 'none',
        duration: 2000
      })
      this.setState({ code: '' })
      return;
    }
    // 检查是否同意协议
    if (!isAgree) {
      Taro.showToast({
        title: '请阅读协议并同意授权',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    Taro.navigateTo({
      url: '../kids/kids?id=1'
    })
    return;
    // TODO 授权操作
    // 确认授权，想后台发送授权请求
  }
  // https://bluewindtech.cn/servicecloud/api/wechat/login?code=111

  render () {
    return (
      <View className='login'>
        <Image className='main-logo' src={{}} />
        <Text class='main-slogan'>岚之灵伴你快乐成长</Text>
        <Text class='register'>手机注册</Text>
        <AtInput
          name='phone'
          border={false}
          title='手机号码'
          type='phone'
          placeholder='请输入手机号码'
          value={this.state.phone}
          onChange={this.handleInput.bind(this, 'phone')}
        />

        <AtInput
          name='code'
          border={false}
          type='phone'
          placeholder='请输入验证码'
          value={this.state.code}
          onChange={this.handleInput.bind(this, 'code')}
        >
          <View
            style={{
              'color': this.state.disabled ? '#FF4949' : '',
              'fontSize': '14px',
              'width': '120px'
            }}
            onClick={this.sendCode.bind(this)}
          >
            {this.showTipText()}
          </View>
        </AtInput>

        <View className='agreement'>
          <AtCheckbox
            options={this.checkboxOption}
            selectedList={this.state.checkedList}
            onChange={this.handleChangeChecked.bind(this)}
          />
          <Text className='agreement-url'>《相关条款》</Text>
        </View>

        <AtButton type='primary' onClick={this.confirmAuthorization}>确认授权</AtButton>
      </View>
    )
  }
}

export default Login
