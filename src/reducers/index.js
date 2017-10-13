import { combineReducers } from 'redux';
import login from './login';
import responsive from './responsive';

//注册reducer，每个自定义的reducer都要来这里注册！！！不注册会报错。
const rootReducer = combineReducers({
  /* your reducers */
  login,
  responsive
});

export default rootReducer;
