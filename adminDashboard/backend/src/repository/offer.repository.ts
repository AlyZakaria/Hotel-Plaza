import Repository from './repository'
import offer from '../interfaces/offer'
class OfferRepository extends Repository {
    constructor() {
        super()
        this._model = this.prisma.offer
    }

    async addOffer(offer: offer): Promise<any | never> {
        try {
            let offerCreated: any
            let roomType: any
            let customers: any
            const transaction = await this.prisma.$transaction(async (tx) => {
                offerCreated = await tx.offer.create({
                    data: offer,
                })
                roomType = await tx.roomType.findFirst({
                    where: {
                        id: offer.typeId,
                    },
                })
                customers = await tx.customer.findMany({
                    where: {
                        email: { not: null },
                    },
                })
                return { offerCreated, roomType, customers }
            })
            if (!transaction) throw new Error(`Can't create offer`)
            return transaction
        } catch (error: unknown) {
            throw error
        }
    }
}

export default OfferRepository
