import Repository from './repository'
import { customerData } from '../interfaces'
import { gender } from '@prisma/client'

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
    async uploadProfileImage(
        id: number,
        byteArrays: any,
        mimeType: any
    ): Promise<any | never> {
        try {
            const customer = await this._model.update({
                where: {
                    id: id,
                },
                data: {
                    image: byteArrays,
                    imageType: mimeType,
                },
            })
            return customer
        } catch (error: unknown) {
            throw error
        }
    }

    async updateCustomer(
        customerData: customerData
    ): Promise<customerData | never> {
        try {
            const customer = await this._model.update({
                where: {
                    id: customerData.id,
                },
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
                    gender: true,
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
