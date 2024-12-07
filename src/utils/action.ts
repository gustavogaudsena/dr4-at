

interface HandleInputChangeInterface {
    (field: string, value: any, data: any, setData: (update: () => any) => void): void;
}
interface SelectItemInterface {
    (value: any, key: string, data: any, setData: (update: () => any) => void): void;
}


const handleInputChange: HandleInputChangeInterface = (field, value, data, setData) => {
    setData({ ...data, [field]: value })
}

const selectItem: SelectItemInterface = (value, key, data, setData) => {
    setData({ ...data, [key]: value })
}

export {
    handleInputChange,
    selectItem
}