const convertTimestamp = (timestamp, format = 'dd/mm/yyyy') => {
    if (!timestamp) {
        return timestamp;
    }
    let t = new Date(timestamp * 1000).toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
    t = new Date(t);
    let day = t.getDate();
    let month = t.getMonth() + 1;
    let year = t.getFullYear();
    if (day.toString().length === 1) {
        day = '0' + day;
    }
    if (month.toString().length === 1) {
        month = '0' + month;
    }
    let formated = day + '/' + month + '/' + year;
    if (format === 'yyyy-mm-dd') {
        formated = `${year}-${month}-${day}`;
    }
    return formated;
}

const getParamValue = (paramName, search) => {
    let paramValue = '';
    const arr = search.split("=");
    arr.forEach((obj, index) => {
        if (obj.indexOf(paramName) > -1 && index < arr.length) {
            // get value from next object
            paramValue = arr[index + 1];
            // remove special character: &,=
            if (paramValue.indexOf('&') > -1) {
                paramValue = paramValue.substring(0, paramValue.lastIndexOf('&'))
            }
            return paramValue;

        }
        return paramValue;
    });
    return paramValue;
}
const reformatCategory = cat => {
    const label = Object.keys(cat)[0]
    const uid = cat[label].uid
    const children = cat[label].children && cat[label].children.map(item => reformatCategory(item))
    return {
        uid: uid,
        label: label,
        children: children,
    }
}

const prepareParam = filter => {
    let filter_string = '';
    for (let key in filter) {
        if (filter[key]) {
            filter_string = filter_string + `&${key}=${filter[key]}`
        }
    }
    return filter_string.length ? ('?' + filter_string.slice(1)) : ''
}

export const commonFunction = {
    convertTimestamp,
    getParamValue,
    reformatCategory,
    prepareParam,
}