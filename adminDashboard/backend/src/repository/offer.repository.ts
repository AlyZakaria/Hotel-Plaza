import Repository from './repository'
import offer from '../interfaces/offer'
class OfferRepository extends Repository {
    constructor() {
        super()
        this._model = this.prisma.offer
    }

    async addOffer(offer: any): Promise<any | never> {
        try {
            let offerCreated: any
            let roomType: any
            let customers: any
            const transaction = await this.prisma.$transaction(async (tx) => {
                offerCreated = await tx.offer.create({
                    data: {
                        typeId: offer.typeId,
                        startDate: offer.startDate,
                        endDate: offer.endDate,
                        percentage: offer.percentage,
                        description: offer.description,
                        name: offer.name,
                        image: offer.images[0].imageURL.blob,
                        imageType: offer.images[0].imageURL.type,
                        status: offer.status,
                        roomType: offer.roomType,
                    },
                })
                roomType = await tx.roomType.findFirst({
                    where: {
                        id: offer.typeId,
                    },
                })
                customers = await tx.newsLetter.findMany()
                console.log(customers)
                return { offerCreated, roomType, customers }
            })
            if (!transaction) throw new Error(`Can't create offer`)
            return transaction
        } catch (error: unknown) {
            // console.log(error)
            throw error
        }
    }
}

export default OfferRepository
