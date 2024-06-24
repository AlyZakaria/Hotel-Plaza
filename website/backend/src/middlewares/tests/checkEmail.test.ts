import { describe, expect, test } from '@jest/globals'
import customerData from '../../interfaces/customerData'
import CustomerRepository from '../../repositories/customer.repository'
import request from 'supertest'
import app from '../../server'

const customerRepository = new CustomerRepository()

const user: customerData = {
    email: 'ali.zakariya1929@outlook.com',
    password: '000',
    fname: 'aly',
    lname: 'zakaria',
    phone: '01154567214',
    country: 'Egypt',
    address: 'Ibrahimia',
    zip: '2125',
}
let server: any
beforeAll(async () => {
    // Truncate all data in the schema
    try {
        await customerRepository.deleteAll()
    } catch (error) {
        console.log(error)
    }
})
describe(`Check Email exist or not`, () => {
    it(`Register new customer`, async () => {
        const customer = await customerRepository.register(user)
        expect(customer.phone).toBe(user.phone)
    })

    it(`check email already exists`, async () => {
        const response = await request(app)
            .post('/api/register')
            .send(user)
            .set('Accept', 'application/json')
            .expect(409)
    })
})
