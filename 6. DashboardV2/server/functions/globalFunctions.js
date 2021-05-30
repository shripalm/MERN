const { verify } = require('jsonwebtoken')
const { secret } = require('../config/envExport')

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

function tokenToId(req){
    let bearerToken = req.headers.authorization.split(" ")[1];
    var confirmation = verify(bearerToken, secret)
    return confirmation.id
}

module.exports = {
    returnFromBody,
    tokenToId
}