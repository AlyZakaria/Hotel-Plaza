import Repository from './repository'
import { otpToken, otpData } from '../interfaces'

class ResetPasswordRepository extends Repository {
    constructor() {
        super()
        this._model = this.prisma.otp
    }
    // sendOTP
    async sendOTP(otpObject: otpData): Promise<otpData | never> {
        try {
            const createOrUpdateOtp = await this._model.upsert({
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
                const customer = await tx.customer.findFirst({
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
}

export default ResetPasswordRepository
