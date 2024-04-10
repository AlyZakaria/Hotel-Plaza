enum view {
    'garden',
    'pool',
    'sea',
}

interface roomType {
    id?: number
    count: number
    pricepernight: number
    capacity: number
    view: view
    name: string
    description: string
}
export default roomType
