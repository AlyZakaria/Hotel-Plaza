interface customerData {
    id?: number
    email?: string
    password?: string | null
    fname: string
    lname?: string
    phone: string
    country: string
    address: string
    zip: string
    token?: string
    image?: any
    imageType?: string
}
export default customerData
