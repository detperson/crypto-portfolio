import { cryptoAssets, cryptoData } from './data'

export function fakeFetchCrypto() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoData)
        }, 1)
    })
}

export async function fetchCrypto(isCache = true) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-API-KEY': process.env.WEATHER_APIKEY, // скрываю Api ключ для загрузки на gitHub
        }
    }

    //Добавляю доп. параметры в запрос, что бы получть обновленные данные в ответ(а не закешированные, браузер кеширует ответ)
    if (!isCache) {
        options.headers = {
            ...options.headers,
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
        }
    }

    const response = await fetch('https://openapiv1.coinstats.app/coins?limit=40', options)
    
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