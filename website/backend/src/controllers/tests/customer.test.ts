import { describe, expect, test } from '@jest/globals'
import customerData from '../../interfaces/customerData'
import CustomerRepository from '../..//repositories/customer.repository'
import request from 'supertest'
import app from '../../server'

const customerRepository = new CustomerRepository()

const user: customerData = {
    email: 'ali.zakariya1929@outlook.com',
    password: '000',
    fname: 'Aly',
    lname: 'zakaria',
    phone: '01122336392',
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

describe(`create new customer and login using apis`, () => {
    it(`create new customer using api/register endpoint`, async () => {
        const response = await request(app)
            .post('/api/register')
            .send(user)
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.token).not.toBeNull()
    })
    it(`login customer with correct email and password using api/login endpoint`, async () => {
        const response = await request(app)
            .post('/api/login')
            .send({
                email: user.email,
                password: user.password,
            })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.token).not.toBeNull()
    })
    it(`login customer with incorrect email and password using api/login endpoint`, async () => {
        const response = await request(app)
            .post('/api/login')
            .send({
                email: user.email + 'wrong',
                password: user.password,
            })
            .set('Accept', 'application/json')
            .expect(404)
        expect(response.body.token).toBeUndefined()
    })
})
