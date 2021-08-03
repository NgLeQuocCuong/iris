import { toastUtil } from '../utils/toastUtil'
const errorMessage = {
    DEFAULTMESSAGE: 'Không thành công!!'
}
const updateOrCreateHeader = header => {
    if (header === null || header === void 0) {
        header = {
            method: 'GET',
            headers: {

            }
        }
    }
    let token = localStorage.getItem('access');
    if (token === null) {
    }
    if (header.headers === null || header.headers === void 0) {
        header.headers = {};
    }
    header.headers.Authorization = "Bearer " + token;
    return header;
}
const checkResponseErrorCode = (data, successMessage, customErrorMessage) => {
    if (typeof data === 'string') {
        toastUtil.showErrorMsg(data)
        return
    }
    if (successMessage === void (0)) {
        successMessage = 'Thành Công!'
    }
    if (data && data.error_code > 0) {
        toastUtil.showErrorMsg(
            (customErrorMessage && customErrorMessage[data && data.error_code && `CODE_${data.error_code}`]) ||
            errorMessage[(data && data.error_code && `CODE_${data.error_code}`)] ||
            errorMessage.DEFAULTMESSAGE
        )
    } else {
        toastUtil.showSuccessMsg(successMessage)
    }
}

export const tokenUtil = {
    updateOrCreateHeader,
    checkResponseErrorCode,
};