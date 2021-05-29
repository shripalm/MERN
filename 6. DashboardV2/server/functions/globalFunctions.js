function returnFromBody(want, body) {
    let retObject = {}
    let checker = -1
    for (let i = 0; i < want.length; i++) {
        let temp = want[i]
        if (!body.hasOwnProperty(temp)) {
            checker = i
            break
        }
        retObject[temp] = body[temp].toString()
    }
    if (checker !== -1) return { success: false, data: want[checker] }
    return { success: true, data: retObject }
}

module.exports = {
    returnFromBody
}