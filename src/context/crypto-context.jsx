import { createContext, useState, useEffect, useContext } from 'react'
import { fakeFetchCrypto, fetchAssets } from '../api';
import { percentDifference } from '../utils'

const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false
})

export function CryptoContextProvider( {children} ) {
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])

    //Функция что бы к каждому ассету добавлять доп поля.
    function mapAssets(assets, result) {
        return assets.map((asset) => {
            const coin = result.find((c) => c.id === asset.id)
            return {
                grow: asset.price < coin.price, // Выросла крипта или нет
                growPercent: percentDifference(asset.price, coin.price), // Выросла или упала в %
                totalAmount: asset.amount * coin.price, // Текущая стоимость крипты сейчас в дол
                totalProfit: asset.amount * coin.price - asset.amount * asset.price, // Сколько заработали или потеряли в дол
                name: coin.name,
                ...asset,
            }
        })
    }

    //Делаем первый запрос за данными о крипте в целом и о крипте которая у нас есть
    useEffect(() => {
        async function preload() {
            setLoading(true)
            const { result } = await fakeFetchCrypto()
            const assets = await fetchAssets()

            setAssets(mapAssets(assets, result))
            setCrypto(result)
            setLoading(false)
        }
        preload()
    }, [])

    function addAsset(newAsset) {
        setAssets((prev) => mapAssets([...prev, newAsset], crypto))
    }
    
    return (
        <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }} >
            {children}
        </CryptoContext.Provider>
    )
}

export default CryptoContext

//Чуть упросили импорт в будущем, теперь не нужно импорт. useContext и CryptoContext, достаточно только useCrypto
export function useCrypto() {
    return useContext(CryptoContext)
}