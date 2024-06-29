interface customer {
    id?: number
    email?: string
    password?: string | null
    fname: string
    lname?: string
    phone: string
    gender: gender
    dob?: any | null
    address?: string | null
    provenance?: string | null
    country?: string | null
    token?: string
    image?: any | null
    imageType?: string | null
}
enum gender {
    male,
    female,
}

export default customer
