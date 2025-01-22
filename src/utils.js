export function percentDifference(a, b) {
    return +(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2)
}

//Пока не использую (раньше пользовался)
//Что бы делать первую букву заглавной
// export function capitalize(str) {
//     return str.charAt(0).toUpperCase() + str.substring(1)
// }

export function cropUrlToHostname(url) {
    let hostName = new URL(url).hostname
    if (hostName.indexOf('www.') === 0) {
        hostName = hostName.replace('www.', '')
    }
    return hostName
}