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
