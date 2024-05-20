interface roomType {
    id: number
    name: string
    view: string
    description: string
    capacity: number
    pricepernight: number
    imageUrl: {
        id: number
        blob: string
        type: string
    } | null
}

export default roomType
