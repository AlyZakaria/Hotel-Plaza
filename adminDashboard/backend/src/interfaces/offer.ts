interface offer {
    id?: number
    name: string
    typeId: number
    startDate: Date
    endDate: Date
    percentage: string
    description: string
    image: any
    imageType: string
    status: 'active' | 'inactive'
}
export default offer
