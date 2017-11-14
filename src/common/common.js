/**
 * 消除登陆状态storage
 * */
import { message} from 'antd';
import messageJson from './message.json';
import moment from 'moment';
import ProvinceCity from './pc.json'

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

export function fixedZero(val) {
    return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type) {
    const now = new Date();
    const oneDay = 1000 * 60 * 60 * 24;

    if (type === 'today') {
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        return [moment(now), moment(now.getTime() + (oneDay - 1000))];
    }

    if (type === 'week') {
        let day = now.getDay();
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);

        if (day === 0) {
            day = 6;
        } else {
            day -= 1;
        }

        const beginTime = now.getTime() - (day * oneDay);

        return [moment(beginTime), moment(beginTime + ((7 * oneDay) - 1000))];
    }

    if (type === 'month') {
        const year = now.getFullYear();
        const month = now.getMonth();
        const nextDate = moment(now).add(1, 'months');
        const nextYear = nextDate.year();
        const nextMonth = nextDate.month();

        return [moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`), moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000)];
    }

    if (type === 'year') {
        const year = now.getFullYear();

        return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
    }
}

export function getBetweemDay(begin, end) {
    var ab = begin.split("-");
    var ae = end.split("-");
    var db = new Date();
    db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
    var de = new Date();
    de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
    var unixDb = db.getTime();
    var unixDe = de.getTime();
    var result=[];
    for (var k = unixDb; k <= unixDe;) {
        result.push(moment(parseInt(k)).format("YYYY-MM-DD"))
        k = k + 24 * 60 * 60 * 1000;
    }
    return result
}

export function provinceAndCity() {
    let pcArr=[]
    for(let key in ProvinceCity){
        let item={};
        item.value=key.replace(/市|省/, '');
        item.label=key.replace(/市|省/, '');
        if(ProvinceCity[key].length>1){
            item.children=ProvinceCity[key].reduce(function(arr, value) {
                return arr.concat({value:value.replace(/市|省/, ''),label:value.replace(/市|省/, '')});
            }, []);
        }
        pcArr.push(item)
    }
    return pcArr
}