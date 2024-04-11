interface roomType {
    id?: number
    count: number
    pricepernight: number
    capacity: number
    view: 'garden' | 'pool' | 'sea'
    name: string
    description: string
}
export default roomType
