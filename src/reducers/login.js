import {
  GET_WX_LOGIN_CODE
} from '../actions/login'

const initialState = {
  wxCode: ''
}

export default (state = initialState, action) => {
  const { type, wxCode } = action
  switch (type) {
    case GET_WX_LOGIN_CODE:
      return Object.assign({}, state, { wxCode })
    default:
      return state
  }
}
