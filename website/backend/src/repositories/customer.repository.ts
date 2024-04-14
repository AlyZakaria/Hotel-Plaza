import Repository from './repository'
import signedCustomer from '../interfaces/signedCustomer'
import customerData from '../interfaces/customerData'
import otpData from '../interfaces/otpData'
import { error } from 'console'
import bcrypt from 'bcrypt'
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
            // delete otp if exists
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
        email: string,
        oldPassword: string,
        newPassword: string
    ): Promise<any | never> {
        try {
            const transaction = await this.prisma.$transaction(async (tx) => {
                // compare the password
                const customer: customerData | null =
                    await tx.customer.findFirst({
                        where: {
                            email: email,
                        },
                    })
                if (!customer) throw new Error(`Customer not found`)
                if (
                    !bcrypt.compareSync(
                        oldPassword + pepper,
                        customer.password as string
                    )
                ) {
                    throw new Error(`Wrong password`)
                }

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
                data: { email: email, name: name},
            })
                if (!customer) return false
            return true
        } catch (error: any) {
            throw new Error(`You already subscribed..`)
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
