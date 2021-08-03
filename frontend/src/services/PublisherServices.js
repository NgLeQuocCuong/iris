import { API_CONST } from "./APIs";
import fetch from 'cross-fetch';
// import { tokenUtil } from './tokenUtil';


const getPubliser = async () => {
    if (API_CONST.TEST_MODE) {
        return [true, {
            data: [
                'Nhà xuất bản 1',
                'Nhà xuất bản 2',
                'Nhà xuất bản 3',
                'Nhà xuất bản 4',
                'Nhà xuất bản 5',
                'Nhà xuất bản 6',
                'Nhà xuất bản 7',
            ]
        }]
    }
    let response;
    let options = {
        method: 'GET',
    }
    let url = API_CONST.GET_PUBLISHER;
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
export const PublisherServices = {
    getPubliser,
}