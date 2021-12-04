export const formatDebt = debt => {
    let res = parseFloat(debt).toLocaleString()
    if (debt > 0)
        res = '+' + res
    return res
}

export const formatPrice = price => {
    return '￥' + Number(price).toFixed(2)
}

