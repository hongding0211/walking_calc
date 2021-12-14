import {newFulfilledPromise} from "../module/module";

const fetchAndDump = async (url) => {
    return (await fetch(url)).json()
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
    return newFulfilledPromise(res)
}

export async function getUsersById(keyword) {
    let res
    try {
        res = await fetchAndDump(`${global.host}/getUsers?keyword=${keyword}`)
        res = res.data.users
        for (let user of res)
            user.img = 'data:image/png;base64,' + user.img
    } catch (e) {
        res = []
    }
    return newFulfilledPromise(res)
}

export async function getGroupsByUid(uid) {
    let res
    try {
        res = await fetchAndDump(`${global.host}/getGroups?uid=${uid}`)
        res = res.data.groups
    } catch (e) {
        res = []
    }
    return newFulfilledPromise(res)
}

export async function createGroup(groupName, creator, members) {
    let membersStr = ''
    for (const i in members)
        membersStr += `&member${Number(i) + 1}=${members[i].uid}`
    return await fetchAndDump(`${global.host}/createGroup?groupName=${groupName}&creator=${creator}${membersStr}`)
}

export async function joinGroup(uid, groupId) {
    return await fetchAndDump(`${global.host}/joinGroup?groupID=${groupId}&uid=${uid}`)
}

export async function addRecord(groupId, who, paid, forWhom, type) {
    let forWhomStr = ''
    for (const i in forWhom)
        forWhomStr += `&forWhom${Number(i) + 1}=${forWhom[i]}`
    return await fetchAndDump(`${global.host}/addRecord?groupID=${groupId}&who=${who}&paid=${paid}&type=${type}${forWhomStr}`)
}

export async function deleteRecord(groupId, recordId) {
    return await fetchAndDump(`${global.host}/deleteRecord?groupID=${groupId}&recordID=${recordId}`)
}
