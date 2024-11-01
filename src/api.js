import { cryptoAssets, cryptoData } from './data'

export function fakeFetchCrypto() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoData)
        }, 1)
    })
}

export async function fetchCrypto() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-API-KEY': import.meta.env.VITE_WEATHER_APIKEY, // скрываю Api ключ для загрузки на gitHub
        }
    }

    const response = await fetch('https://openapiv1.coinstats.app/coins', options)
    
    if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`)
    }
    const data = await response.json()
    return data
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