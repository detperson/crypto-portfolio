import { createContext, useState, useEffect, useContext } from 'react'
import { fakeFetchCrypto, fetchAssets, fetchCrypto, fetchLocalStorage } from '../api';
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
                ...asset,
                grow: asset.price < coin.price, // Выросла крипта или нет
                growPercent: percentDifference(asset.price, coin.price), // Выросла или упала в %
                totalAmount: asset.amount * coin.price, // Текущая стоимость крипты сейчас в дол
                totalProfit: asset.amount * coin.price - asset.amount * asset.price, // Сколько заработали или потеряли в дол
                name: (asset.name ? asset.name : coin.name), //??
                uniqId: (coin.symbol.toLowerCase()) + Math.random().toString(16).slice(2), // Уникальный id карточки
                symbol: (asset.symbol ? asset.symbol : coin.symbol),
            }
        })
    }

    async function updateCrypto() {
        try {
            const { result } = await fetchCrypto(false)
            setCrypto(result)
            setAssets(mapAssets(assets, result))
        } catch (err) {
            console.error('Ошибка:', err)
        }
    }

    //Делаем первый запрос за данными о крипте в целом и о крипте которая у нас есть в портфолио
    useEffect(() => {
        async function preload() {
            setLoading(true)
            try {
                // const { result } = await fakeFetchCrypto() //Раскомментировать для работы без Api
                const { result } = await fetchCrypto()
                setCrypto(result)
                // const assets = await fetchAssets()
                const assets = await fetchLocalStorage()
                setAssets(mapAssets(assets, result))
            } catch (err) {
                console.error('Ошибка:', err)
            } finally {
                setLoading(false)
            }
        }
        preload()
    }, [])

    function addAsset(newAsset) {
        setAssets((prev) => {
            //Сортирую асеты по дате, что бы не менялся порядок при добавлении и редактировании
            let sortedAssets = [...prev, newAsset].sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
            const updatedAssets = mapAssets(sortedAssets, crypto)
            localStorage.setItem('assets', JSON.stringify(updatedAssets))
            return updatedAssets
        })
    }

    function deleteAsset(remoteAsset) {
        setAssets((prev) => {
            const assetsWithoutAsset = prev.filter((asset) => asset.uniqId !== remoteAsset.uniqId)
            localStorage.setItem('assets', JSON.stringify(assetsWithoutAsset))
            return assetsWithoutAsset
        })
    }
    
    return (
        <CryptoContext.Provider value={{ loading, crypto, assets, addAsset, deleteAsset, updateCrypto }} >
            {children}
        </CryptoContext.Provider>
    )
}

export default CryptoContext

//Чуть упросили импорт в будущем, теперь не нужно импорт. useContext и CryptoContext, достаточно только useCrypto
export function useCrypto() {
    return useContext(CryptoContext)
}