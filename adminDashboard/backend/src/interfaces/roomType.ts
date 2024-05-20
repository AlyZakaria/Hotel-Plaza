interface roomType {
    id?: number
    count: number
    pricepernight: number
    capacity: number
    view: 'garden' | 'pool' | 'sea'
    name: string
    description: string
    bed: string
    size: number
}
export default roomType
