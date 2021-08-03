import { API_CONST } from "./APIs";
import fetch from 'cross-fetch';
import { commonFunction } from "../utils/constants/commonFunction";
// import { tokenUtil } from './tokenUtil';


const getAuthors = async (param) => {
    let response;
    let options = {
        method: 'GET',
    }
    let url = API_CONST.GET_AUTHOR + commonFunction.prepareParam(param);
    // tokenUtil.updateOrCreateHeader(options);
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

export const AuthorServices = {
    getAuthors,
}