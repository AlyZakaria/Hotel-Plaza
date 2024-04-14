interface customerData {
    id?: number
    email: string | null
    password?: string | null
    fname: string
    lname: string
    phone: string
    country: string
    address: string
    zip: string
    token?: string
}
export default customerData
