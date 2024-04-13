import Repository from './repository'
import signedCustomer from '../interfaces/signedCustomer'
import customerData from '../interfaces/customerData'
import otpData from '../interfaces/otpData'
import { error } from 'console'

class CustomerRepository extends Repository {
    constructor() {
        super()
        this._model = this.prisma.customer
    }

    // login
    async login(email: string): Promise<customerData | never> {
        try {
            const customer = await this._model.findFirst({
                where: {
                    email: email,
                },
            })
            if (!customer) throw new Error(`Customer not found`)
            return customer
        } catch (error: unknown) {
            throw error
        }
    }

    // register
    async register(customerData: customerData): Promise<customerData | never> {
        try {
            const customer = await this._model.create({
                data: customerData,
            })
            return customer
        } catch (error: unknown) {
            throw error
        }
    }
    //check Email exists
    async checkEmail(email: string): Promise<any | never> {
        try {
            const customer = await this._model.findFirst({
                where: {
                    email: email,
                },
            })
            if (customer) return customer

            return false
        } catch (error) {
            return false
        }
    }

    // sendOTP
    async sendOTP(otpObject: otpData): Promise<otpData | never> {
        try {
            const otp = await this.prisma.otp.create({
                data: otpObject,
            })
            if (!otp) throw new Error()
            return otp
        } catch (error: unknown) {
            throw error
        }
    }

    // verifyOTP

    async deleteAll() {
        try {
            const customer = this._model.deleteMany()
            await this.prisma.$transaction([customer])
        } catch (error) {
            console.log(error)
        }
    }
}

export default CustomerRepository
