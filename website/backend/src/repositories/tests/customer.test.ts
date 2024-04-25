import { describe, expect, test } from '@jest/globals'
import customerData from '../../interfaces/customerData'
import CustomerRepository from '../customer.repository'

const customerRepository = new CustomerRepository()

const user: customerData = {
    email: 'ali',
    password: '000',
    fname: 'aly',
    lname: 'zakaria',
    phone: '02524520',
    country: 'Egypt',
    address: 'Ibrahimia',
    zip: '2125',
}

beforeAll(async () => {
    // Truncate all data in the schema
    try {
        await customerRepository.deleteAll()
    } catch (error) {
        console.log(error)
    }
})

describe(`Register new customer and then login`, () => {
    test(`Register new customer`, async () => {
        const customer = await customerRepository.register(user)
        expect(customer.phone).toBe(user.phone)
    })
    test(`customer login with correct email`, async () => {
        const customer = await customerRepository.login(user.email ?? '')
        expect(customer.email).toBe(user.email)
        expect(customer.phone).toBe(user.phone)
    })
    test(`customer login with incorrect email`, async () => {
        try {
            const customer = await customerRepository.login(
                user.email + 'Wrong'
            )
            expect(customer.email).not.toBe(user.email)
        } catch (error: any) {
            expect(error.message).toBe(`Customer not found`)
        }
    })
})
