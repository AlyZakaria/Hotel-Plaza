import Repository from './repository'
import signedCustomer from '../interfaces/signedCustomer'
import customerData from '../interfaces/customerData'
import otpData from '../interfaces/otpData'
import { error } from 'console'
import bcrypt from 'bcrypt'
import otpToken from '../interfaces/otpToken'
import { Sql } from '@prisma/client/runtime/library'

const saltRounds = process.env.SALT_ROUNDS
const pepper = process.env.BCRYPT_PASSWORD
const tokenSecret = process.env.TOKEN

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
    async checkEmail(email: string): Promise<customerData | null | never> {
        try {
            const customer: customerData | null = await this._model.findFirst({
                select: {
                    id: true,
                    email: true,
                    fname: true,
                    phone: true,
                    country: true,
                    address: true,
                    zip: true,
                },
                where: {
                    email: email,
                },
            })
            if (customer) return customer

            return null
        } catch (error) {
            return null
        }
    }

    // sendOTP
    async sendOTP(otpObject: otpData): Promise<otpData | never> {
        try {
            const createOrUpdateOtp = await this.prisma.otp.upsert({
                where: {
                    userId: otpObject.userId
                        ? Number(otpObject.userId)
                        : undefined,
                },
                update: {
                    otp: otpObject.otp,
                },
                create: {
                    otp: otpObject.otp,
                    userId: otpObject.userId,
                },
            })

            if (!createOrUpdateOtp) throw new Error()
            return createOrUpdateOtp
        } catch (error: unknown) {
            throw error
        }
    }

    // verifyOTP
    async verifyOTP(email: string, otp: string): Promise<any | never> {
        try {
            const transaction = await this.prisma.$transaction(async (tx) => {
                // get the customer by email
                const customer = await tx.customer.findFirst({
                    select: {
                        id: true,
                        email: true,
                    },
                    where: {
                        email: email,
                    },
                })
                if (!customer) throw new Error(`Customer not found`)

                // get the otp data from otp schema
                const verify = await tx.otp.findFirst({
                    select: {
                        id: true,
                        otp: true,
                        userId: true,
                    },
                    where: {
                        userId: customer.id,
                        otp: otp,
                    },
                })
                if (!verify) throw new Error()

                return verify
            })

            if (!transaction) throw new Error()
            return transaction
        } catch (error: unknown) {
            throw error
        }
    }
    // reset password
    async resetPassword(
        token: otpToken,
        newPassword: string
    ): Promise<any | never> {
        try {
            const transaction = await this.prisma.$transaction(async (tx) => {
                // compare the password
                const customer: customerData | null =
                    await tx.customer.findFirst({
                        where: {
                            email: token.email,
                        },
                    })
                if (!customer) throw new Error(`Customer not found`)

                // update the password
                const updated = await tx.customer.update({
                    where: {
                        id: customer.id,
                        email: customer.email,
                    },
                    data: {
                        password: newPassword,
                    },
                })
                if (!updated) throw new Error()
                return updated
            })
            if (!transaction) throw new Error()
            return transaction
        } catch (error: unknown) {
            throw error
        }
    }
    async receiveOffer(email: string, name: string): Promise<boolean | never> {
        try {
            const customer: any = await this.prisma.newsLetter.create({
                data: { email: email, name: name },
            })
            if (!customer) return false
            return true
        } catch (error: any) {
            throw new Error(`You already subscribed..`)
        }
    }

    async getAllCustomers() {
        try {
            const result = await this.prisma.$queryRaw`CALL get_customers`
            
            console.log(result)
            return result
        } catch (error) {
            throw error
        }
    }

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
