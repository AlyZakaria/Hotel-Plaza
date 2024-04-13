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
    async verifyOTP(email: string, otp: number): Promise<boolean | never> {
        try {
            // get the otp data from otp schema
            const verify = await this._model.findFirst({
                select: {
                    id: true,
                    email: true,
                    otp: true,
                },
            })
            // if not exists throw error
            if (!verify) throw new Error()

            if (verify.email == email && verify.otp.otp == otp) return true

            return false
        } catch (error: unknown) {
            throw error
        }
    }
    // reset password
    async resetPassword(
        email: string,
        newPassword: string
    ): Promise<boolean | never> {
        try {
            const transaction = await this.prisma.$transaction(async (tx) => {
                // check if the reset password is pending and otp status is verified
                const verify = await this._model.findFirst({
                    select: {
                        id: true,
                        email: true,
                        otp: true,
                    },
                })
                console.log(verify)
                // make transcation to update the password where email is equal to the email and the email is not null

                const customer = await tx.customer.updateMany({
                    where: {
                        id: verify.id,
                        email: email,
                    },
                    data: {
                        password: newPassword,
                    },
                })

                // if not exists throw error
                if (!customer) return false
                return true
            })
            if (!transaction) throw new Error()
            return true
        } catch (error: unknown) {
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
