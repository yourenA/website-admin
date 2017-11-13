/**
 * 消除登陆状态storage
 * */
import { message} from 'antd';
import messageJson from './message.json';
const removeLoginStorage = () => {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('usertoken');
    sessionStorage.removeItem('permissions');
    sessionStorage.clear();
    localStorage.removeItem('username');
    localStorage.removeItem('usertoken');
    localStorage.removeItem('permissions');
    localStorage.clear();
};
exports.removeLoginStorage = removeLoginStorage;

/**
 * 获取头信息
 * */
exports.getHeader = () => {
    return {Authorization: `Bearer ${sessionStorage.getItem('usertoken') || localStorage.getItem('usertoken')}`}
};


exports.converErrorCodeToMsg = (error) => {
    console.log("error", error.toString())
    if (error.toString() === 'Error: Network Error') {
        message.error(messageJson['network error'], 3);
        return false
    }
    if (error.response.status === 401) {
        message.error(messageJson['token fail']);
        removeLoginStorage();
        setTimeout(()=> {
            //hashHistory.replace('/');
            // store.dispatch(signout());
        }, 1000)
    } else if (!error.response.data.errors) {
        message.error(error.response.data.message);
    } else if (error.response.status === 422) {
        let first;
        for (first in error.response.data.errors) break;
        message.error(`${error.response.data.errors[first][0]}`);
    } else {
        message.error(messageJson['unknown error']);
    }
}
exports.processResult=(response,cb)=>{
    if (response.data.status === 200) {
        message.success(response.data.data);

    } else {
        message.error(response.data.data);
    }
    if(cb) cb()
}