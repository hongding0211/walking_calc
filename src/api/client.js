const fetchAndDump = async (url) => {
    return (await fetch(url)).json()
}

const wrapPromise = (data) => {
    return new Promise((resolve => resolve(data)))
}

export async function getOneUserById(uid) {
    let res
    try {
        res = await fetchAndDump(`${global.host}/getUsers?uid=${uid}`)
        res = res.data.users[0]
        res.img = 'data:image/png;base64,' + res.img
    } catch (e) {
        res = null
    }
    return wrapPromise(res)
}

export async function getUsersById(keyword) {
    let res
    try {
        res = await fetchAndDump(`${global.host}/getUsers?keyword=${keyword}`)
        res = res.data.users
        for(let user of res)
            user.img = 'data:image/png;base64,' + user.img
    } catch (e) {
        res = []
    }
    return wrapPromise(res)
}

export async function getGroupsByUid(uid) {
    let res
    try {
        res = await fetchAndDump(`${global.host}/getGroups?uid=${uid}`)
        res = res.data.groups
    } catch (e) {
        res = []
    }
    return wrapPromise(res)
}
