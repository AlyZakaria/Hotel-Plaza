import Repository from './repository'
import { roomType } from '../interfaces'
import { ALL } from 'dns'
class RoomTypeRepository extends Repository {
    constructor() {
        super()
        this._model = this.prisma.roomType
    }
    async getRoomTypes(): Promise<any | never> {
        try {
            const roomTypes: roomType[] = await this._model.findMany({
                select: {
                    id: true,
                    name: true,
                    view: true,
                    description: true,
                    capacity: true,
                    pricepernight: true,
                    imageURLs: {
                        select: {
                            imageId: true,
                            imageURL: {
                                select: {
                                    id: true,
                                    blob: true,
                                    type: true,
                                },
                            },
                        },
                    },
                },
            })

            if (!roomTypes.length) throw new Error(`No room types found`)
            return roomTypes
        } catch (error: unknown) {
            throw error
        }
    }
    async getRoomType(id: number): Promise<any | never> {
        // Get the room type by id
        try {
            const roomType: roomType = await this._model.findUnique({
                where: {
                    id: id,
                },
                select: {
                    id: true,
                    capacity: true,
                    view: true,
                    name: true,
                    description: true,
                    pricepernight: true,
                    bed: true,
                    size: true,
                    imageURLs: {
                        select: {
                            imageId: true,
                            imageURL: {
                                select: {
                                    id: true,
                                    blob: true,
                                    type: true,
                                },
                            },
                        },
                    },
                },
            })

            if (!roomType) throw new Error(`No room type found`)
            return roomType
        } catch (error: unknown) {
            throw error
        }
    }
    async getRoomTypeDetails(roomTypeId: number): Promise<any | never> {
        try {
            const roomTypeDetails = await this._model.findUnique({
                where: {
                    id: roomTypeId,
                },
                select: {
                    id: true,
                    name: true,
                    view: true,
                    description: true,
                    capacity: true,
                    pricepernight: true,
                    bed: true,
                    size: true,
                    imageURLs: {
                        select: {
                            imageId: true,
                            imageURL: {
                                select: {
                                    id: true,
                                    blob: true,
                                    type: true,
                                },
                            },
                        },
                    },
                    reviews: {
                        select: {
                            id: true,
                            comment: true,
                            rating: true,
                            updatedAt: true,
                            customer: {
                                select: {
                                    fname: true,
                                    lname: true,
                                    image: true,
                                    imageType: true,
                                },
                            },
                        },
                    },
                },
            })
            if (!roomTypeDetails) throw new Error(`No room type found`)
            return roomTypeDetails
        } catch (error: unknown) {
            console.log(error)
            throw error
        }
    }

    async getRoomTypesWithCapacity(): Promise<any | never> {
        try{
            const roomTypes = await this.prisma.roomType.findMany({
                select: {
                    id: true,
                    name: true,
                    capacity: true,
                }
            })
            if(!roomTypes.length) throw new Error(`No room types found`)
            return roomTypes
        }catch(error: unknown){
            throw error
        }
    }
    // get room Images
    async getRoomImages(id: number): Promise<any | never> {
        try {
            const roomImages = await this.prisma.typeImage.findMany({
                where: {
                    typeId: id,
                },
                select: {
                    imageId: true,
                    imageURL: {
                        select: {
                            id: true,
                            blob: true,
                            type: true,
                        },
                    },
                },
            })

            if (!roomImages.length) throw new Error(`No room images found`)
            return roomImages
        } catch (error: unknown) {
            throw error
        }
    }
    async addReview(review: any): Promise<any | never> {
        try {
            
            const newReview = await this.prisma.review.create({
                data: review,
            })
            if (!newReview) throw new Error(`Review not added`)
            return newReview
        } catch (error: unknown) {
            throw error
        }
    }
}

export default RoomTypeRepository
