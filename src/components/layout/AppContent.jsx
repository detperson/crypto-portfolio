import { Flex, Layout, Typography } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { useCrypto } from '../../context/crypto-context';
import PortfolioChart from '../PortfolioChart';
import AssetsTable from '../AssetsTable';
import { useState } from 'react';

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#fff',
    backgroundColor: '#001529',
    padding: '1rem',
};

export default function AppContent() {
    const { assets, crypto, updateCrypto } = useCrypto()
    const [loading, isLoading] = useState(false)

    async function handleUpdateClick() {
        isLoading(true)
        await updateCrypto()
        isLoading(false)
    }

    //карты концепция для получения формата { bitcoin: 43412, } (делаем удобный формат для дальнейших расчетов)
    const cryptoPriceMap = crypto.reduce((acc, c) => {
        acc[c.id] = c.price
        return acc
    }, {})

    return (
        <Layout.Content theme={'dark'} style={contentStyle}>
            <Flex>
                <Typography.Title level={3} style={{ textAlign: 'left', color: '#fff', margin: '0 8px 0 0'}}>
                    Portfolio:
                    {' '}
                    {assets
                        .map((asset) => asset.amount * cryptoPriceMap[asset.id])
                        .reduce((acc, v) => acc += v, 0)
                        .toFixed(2)} $
                </Typography.Title>
                <SyncOutlined spin={loading} onClick={handleUpdateClick}/>
            </Flex>
            <PortfolioChart />
            <AssetsTable />
        </Layout.Content>
    )
}