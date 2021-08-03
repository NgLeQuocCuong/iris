// const API_ROOT = 'https://thesis-iris-api.herokuapp.com/';
const API_ROOT = 'http://127.0.0.1:8000/';
// const API_ROOT = 'http://35.198.198.151:8000/'
const TEST_MODE = false

const LOGIN = API_ROOT + 'api/auth/login'
const GET_USER_INFO = API_ROOT + 'api/auth/infor'
const LOGOUT = API_ROOT + 'api/auth/logout'
const REGISTER = API_ROOT + 'api/auth/register'
const GET_USER_LIST = API_ROOT + 'api/auth/list'

const GET_CATEGORIES = API_ROOT + 'api/product/category_tree/'
const GET_BOOK_INFO = API_ROOT + 'api/product/item_info'
const GET_RECOMMEND_BOOK = API_ROOT + 'api/product/recommend/'
const GET_RELATED_BOOK = API_ROOT + 'api/product/related/'
const GET_COMMON_BOOK = API_ROOT + 'api/product/list_product/'
const GET_RATES = API_ROOT + 'api/interaction/list'
const GET_RATE_OF_USER = API_ROOT + 'api/interaction/get'
const RATE = API_ROOT + 'api/interaction/rate'

const GET_AUTHOR = API_ROOT + 'api/product/author/'
const GET_PUBLISHER = API_ROOT + 'api/product/publisher'

export const API_CONST = {
    TEST_MODE,
    LOGIN,
    GET_USER_INFO,
    LOGOUT,
    REGISTER,
    GET_USER_LIST,
    GET_CATEGORIES,
    GET_BOOK_INFO,
    GET_RECOMMEND_BOOK,
    GET_RELATED_BOOK,
    GET_COMMON_BOOK,
    GET_RATES,
    GET_RATE_OF_USER,
    RATE,
    GET_AUTHOR,
    GET_PUBLISHER,
}