import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function offerUpdateSchedule() {
    try {
        let currentDate = new Date()
        let date = `${currentDate.getFullYear() + '-' + currentDate.getMonth() + '-' + currentDate.getDate()}`

        let newDate = new Date(date)
        console.log(typeof newDate)
        await prisma.offer.updateMany({
            where: {
                status: 'active',
                endDate: { lte: newDate },
            },
            data: {
                status: 'inactive',
            },
        })
        await prisma.offer.updateMany({
            where: {
                status: 'inactive',
                startDate: { lte: newDate },
            },
            data: {
                status: 'active',
            },
        })
        console.log('Scheduled event executed successfully.')
    } catch (error) {
        console.error('Error executing scheduled event:', error)
    }

    console.log('Scheduled function executed.')
}

export default offerUpdateSchedule
