import { API_CONST } from "./APIs";
import fetch from 'cross-fetch';
import { tokenUtil } from './tokenUtil';

const login = async (data) => {
    if (API_CONST.TEST_MODE && data.get('email') === 'test@gmail.com') {
        return [true, { data: { token: { access: 'testAccess', refresh: 'testRefresh' } } }]
    }
    let response;
    let options = {
        method: 'POST',
        body: data,
    }
    let url = API_CONST.LOGIN;
    //tokenUtil.updateOrCreateHeader(options);
    try {
        response = await fetch(url, options);
        let body = await response.json();
        tokenUtil.checkResponseErrorCode(body, 'Đăng nhập thành công');
        return [body.error_code === 0, body];
    }
    catch (e) {
        if (response && response.statusText) {
            return [false, response.statusText];
        } else {
            return [false, e.message];
        }
    }
}

const register = async (data) => {
    let response;
    let options = {
        method: 'POST',
        body: data,
    }
    let url = API_CONST.REGISTER;
    //tokenUtil.updateOrCreateHeader(options);
    try {
        response = await fetch(url, options);
        let body = await response.json();
        tokenUtil.checkResponseErrorCode(body, 'Kiểm tra email của bạn');
        return [body.error_code === 0, body];
    }
    catch (e) {
        if (response && response.statusText) {
            return [false, response.statusText];
        } else {
            return [false, e.message];
        }
    }
}

const getUserData = async () => {
    const access = localStorage['access']
    if (API_CONST.TEST_MODE && access === 'testAccess') {
        return [true, { data: { name: 'Test User', is_admin: true, uid: 'Test ID' } }]
    }
    if (!access) {
        return [true, {}]
    }
    let response;
    let options = {
        method: 'GET',
    }
    let url = API_CONST.GET_USER_INFO;
    tokenUtil.updateOrCreateHeader(options);
    try {
        response = await fetch(url, options);
        let body = await response.json();
        //tokenUtil.checkResponseErrorCode(body, options.method);
        return [body.error_code === 0, body];
    }
    catch (e) {
        if (response && response.statusText) {
            return [false, response.statusText];
        } else {
            return [false, e.message];
        }
    }
}

const logout = async () => {
    let response;
    let options = {
        method: 'GET',
    }
    let url = API_CONST.LOGOUT + `?token=${localStorage['refresh']}`;
    tokenUtil.updateOrCreateHeader(options);
    try {
        response = await fetch(url, options);
        console.log(response)
        let body = await response.json();
        //tokenUtil.checkResponseErrorCode(body, options.method);
        return [body.error_code === 0 || body.error_code === 500, body];
    }
    catch (e) {
        if (response && response.statusText) {
            return [false, response.statusText];
        } else {
            return [false, e.message];
        }
    }
}

const getUserList = async (params = '') => {
    let response;
    let options = {
        method: 'GET',
    }
    let url = API_CONST.GET_USER_LIST + params;
    tokenUtil.updateOrCreateHeader(options);
    try {
        response = await fetch(url, options);
        let body = await response.json();
        //tokenUtil.checkResponseErrorCode(body, options.method);
        return [body.error_code === 0, body];
    }
    catch (e) {
        if (response && response.statusText) {
            return [false, response.statusText];
        } else {
            return [false, e.message];
        }
    }
}
export const ProfileServices = {
    login,
    getUserData,
    logout,
    register,
    getUserList,
}