import { Layout, Card, Statistic, List, Typography, Tag, Flex, Alert, Space, Button, Modal, InputNumber, Input } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import CryptoContext from '../../context/crypto-context';
import '../../index.css'
import EditAssetModal from '../EditAssetModal';

const siderStyle = {
    padding: '1rem',
};

export default function AppSider() {
    const { assets, deleteAsset, addAsset } = useContext(CryptoContext)
    const [showAlerts, setShowAlerts] = useState({})
    const [modal, setModal] = useState(false)
    const [asset, setAsset] = useState({})

    function handleDeleteClick(assetId) {
        setShowAlerts((prev) => {
            return {
                ...prev,
                [assetId]: !prev[assetId],
            }
        })
    }

    function handleEditClick(clickedAsset) {
        setAsset(clickedAsset)
        setModal(true)
    }

    function handleModalOk() {
        deleteAsset(asset)
        addAsset(asset)
        setModal(false)
    }

    return (
        <Layout.Sider width="25%" style={siderStyle}>
            {assets.map(asset => (
                <Card key={asset.uniqId} style={{ marginBottom: '1rem' }}>
                    {showAlerts[asset.uniqId] && 
                    <Alert
                        style={{ marginBottom: '10px' }}
                        message={`Delete ${asset.name}?`}
                        type="warning"
                        action={
                            <Space>
                            <Button type="text" size="small" onClick={() => deleteAsset(asset)}>
                                Delete
                            </Button>
                            </Space>
                        }
                        closable
                        afterClose={() => handleDeleteClick(asset.uniqId)}
                    />}
                    <Flex justify='space-between' align='flex-start'>
                        <Statistic 
                            title={asset.name}
                            value={asset.totalAmount}
                            precision={2}
                            valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322'}}
                            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                            suffix="$"
                        />
                        <Flex>
                            <EditOutlined style={{ color: "rgba(0, 0, 0, 0.45)", marginRight: '5px' }} onClick={() => handleEditClick(asset)} />
                            <DeleteOutlined className='delete-trash-icon' onClick={() => handleDeleteClick(asset.uniqId)}/>
                        </Flex>
                    </Flex>
                    <List 
                        size="small"
                        dataSource={[
                            {
                                title: 'Total Profit', 
                                value: asset.totalProfit, 
                                withTag: true,
                            },
                            {title: 'Asset Amount', value: asset.amount, isPlain: true},
                            {title: 'Asset Symbol', value: asset.symbol, isPlain: true},
                            // {title: 'Difference', value: asset.growPercent}
                        ]}
                        renderItem={(item) => (
                            <List.Item>
                                <span>{item.title}</span>
                                <span>
                                    {item.withTag && (
                                        <Tag color={asset.grow ? 'green' : 'red'}>
                                            {asset.growPercent}%
                                        </Tag>
                                    )}
                                    {item.isPlain && item.value}
                                    {!item.isPlain && (
                                        <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                                            {item.value.toFixed(2)}$
                                        </Typography.Text>
                                    )}
                                </span>
                            </List.Item>
                        )}
                    />
                </Card>
            ))}

            <Modal title={asset.name} open={modal} onOk={handleModalOk} onCancel={() => setModal(false)}>
                <EditAssetModal asset={asset} setAsset={setAsset} />
            </Modal>
        </Layout.Sider>
    )
}