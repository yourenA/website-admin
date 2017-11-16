/**
 * Created by Administrator on 2017/3/8.
 */
import {message} from 'antd';
import {removeLoginStorage} from './../common/common.js';
import configJson from 'configJson' ;
import axios from 'axios';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const ACTIVE_FAIL = 'ACTIVE_FAIL';
export const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS';
export const SIGNOUT_FAIL = 'SIGNOUT_FAIL';

export function checkLogin() {
    console.log("check login")
    return dispatch => {
        const username = localStorage.getItem('username') || sessionStorage.getItem('username');
        if (username) {
            dispatch({
                type: LOGIN_SUCCESS,
                username: username,
            });
            return true
        } else {
            window.location.replace("/login")
        }
    }
}
export function login(user, from, history) {
    return dispatch => {
        axios({
            url: `${configJson.prefix}/user/login`,
            method: 'post', // default
            data: {
                username: user.username,
                password: user.password
            },
        })
            .then(function (response) {
                console.log(response);
                if (response.data.status === 200) {
                    sessionStorage.setItem('username', user.username);
                    if (user.remember) {
                        localStorage.setItem('username', user.username);
                    }
                    dispatch({
                        type: LOGIN_SUCCESS,
                        username: user.username,
                    });
                    message.success(response.data.data);
                    setTimeout(function () {
                        window.location.replace("/background/")
                    }, 1000)
                } else {
                    message.error(response.data.data);
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    }
}

export function signout(history) {
    console.log("执行退出");
    return dispatch => {
        axios({
            url: `${configJson.prefix}/user/logout`,
            method: 'post', // default
        })
            .then(function (response) {
                if (response.data.status === 200) {
                    removeLoginStorage();
                    dispatch({
                        type: SIGNOUT_SUCCESS,
                    });
                    message.success(response.data.data);
                } else {
                    message.error(response.data.data);
                }
                // setTimeout(function () {
                //     window.location.replace("/login")
                // },1000)
            })
            .catch(function (error) {
                console.log(error)
                removeLoginStorage();
                dispatch({
                    type: SIGNOUT_FAIL,
                });
            });
    }
}

