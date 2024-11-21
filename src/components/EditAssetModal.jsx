import { Flex, Input, InputNumber } from "antd"

const inputNumberStyle = {
    width: '150px',
}

const textAreaStyle = {
    width: '50%',
}

const inputLabel = {
    textAlign: 'end',
    flex: '0 0 20%',
    marginRight: '8px',
}

export default function EditAssetModal({ asset, setAsset }) {
    
    function handleInputNumber(value, name) {
        setAsset((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function handleTextAreaChange(e) {
        setAsset((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    
    return (
        <Flex vertical gap='12px' style={{ marginTop: '20px'}}>
            <Flex align="center">
                <div style={inputLabel}>
                    Asset amount:
                </div>
                <InputNumber 
                    name='amount'
                    style={inputNumberStyle}
                    min={0}
                    placeholder='Amount' 
                    value={asset.amount} 
                    onChange={(value) => handleInputNumber(value, 'amount')}
                />
            </Flex>
            <Flex>
                <div style={inputLabel}>
                    Asset price, $:
                </div>
                <InputNumber 
                    name='price'
                    style={inputNumberStyle}
                    min={0}
                    placeholder='Price' 
                    value={asset.price} 
                    onChange={(value) => handleInputNumber(value, 'price')}
                />
            </Flex>
            <Flex>
                <div style={inputLabel}>
                    Note:
                </div>
                <Input.TextArea 
                    name='note'
                    style={textAreaStyle}
                    placeholder='Note...'
                    value={asset.note}
                    onChange={handleTextAreaChange}
                    autoSize={{minRows: 2, maxRows: 5}}
                />
            </Flex>
        </Flex>
    )
}