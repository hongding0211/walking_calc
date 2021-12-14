export const formatDebt = debt => {
    let res = parseFloat(debt).toLocaleString()
    if (debt > 0)
        res = '+' + res
    return res
}

export const formatPrice = price => {
    return '￥' + parseFloat(price).toLocaleString()
}

export const newFulfilledPromise = value => new Promise(resolve => resolve(value))

export const newRejectedPromise = reason => new Promise((_, reject) => reject(reason))