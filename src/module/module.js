export const formatDebt = debt => {
    if (debt > -1e-2)
        return '+' + Math.abs(parseFloat(debt)).toLocaleString('en-US', {maximumFractionDigits: 2})
    return parseFloat(debt).toLocaleString('en-US', {maximumFractionDigits: 2})
}

export const formatPrice = price => {
    return '￥' + parseFloat(price).toLocaleString('en-US', {maximumFractionDigits: 2})
}

export const newFulfilledPromise = value => new Promise(resolve => resolve(value))

export const newRejectedPromise = reason => new Promise((_, reject) => reject(reason))