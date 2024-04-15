import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function otpTokenDeleteSchedule() {
    try {
        let currentDate = new Date()
        const transaction = await prisma.$transaction(async (tx) => {
            const otps = await tx.otp.findMany()
            console.log(otps)
            if (!otps.length) {
                console.log('No OTPs found')
                return
            }

            // check the diffence between the current date and the createdAt date
            // if the difference is greater than 1 hr then delete the otp token
            for (let otp of otps) {
                let diff = currentDate.valueOf() - otp.createdAt.valueOf()
                const timeDifferenceMinutes = diff / (1000 * 60)
                if (timeDifferenceMinutes > 60) {
                    await tx.otp.delete({
                        where: {
                            id: otp.id,
                        },
                    })
                }
            }
        })

        console.log('Scheduled event executed successfully. ', currentDate)
    } catch (error) {
        console.error('Error executing scheduled event:', error)
    }
}

export default otpTokenDeleteSchedule
