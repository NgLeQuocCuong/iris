const number = value => /^(?:\.|\d)*$/.test(value)
const func = var2check => var2check && {}.toString.call(var2check) === '[object Function]'

export const typeChecker = {
    number,
    func,
}