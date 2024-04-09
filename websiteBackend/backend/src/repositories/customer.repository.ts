import Repository from './repository'
import signedCustomer from '../interfaces/signedCustomer'
import customerData from '../interfaces/customerData'

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
    async checkEmail(email: string): Promise<boolean | never> {
        try {
            const customer = await this._model.findFirst({
                where: {
                    email: email,
                },
            })
            if (customer) return true

            return false
        } catch (error) {
            return false
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
