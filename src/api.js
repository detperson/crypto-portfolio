import { cryptoAssets, cryptoData } from './data'

export function fakeFetchCrypto() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoData)
        }, 1)
    })
}

export function fetchAssets() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoAssets)
        }, 2)
    })
}

export function fetchLocalStorage() {
    return new Promise((resolve, reject) => {
        const assetsJSON = localStorage.getItem('assets')
        if (assetsJSON !== null) {
            resolve(JSON.parse(assetsJSON))
        } else {
            reject(assetsJSON)
        }
    })
}