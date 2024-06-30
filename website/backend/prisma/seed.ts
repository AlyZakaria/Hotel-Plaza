// prisma/seed.ts
import prisma from '../src/utils/db'
import { PrismaClient, Prisma } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import { base64toBlob } from '../src/helpers'
import sharp from 'sharp'
import { count } from 'console'

async function getImageAsBase64(filePath: string) {
    const buffer = await sharp(filePath)
        .resize(800, 600) // Resize to 800x600
        .jpeg({ quality: 80 }) // Compress to 80% quality
        .toBuffer()

    return buffer.toString('base64')
}

async function main() {
    const imageDirectory = './assets'
    const byteArrays: any[] = []
    const offerImageDirectory = './assets/offers'
    const byteArraysOffer: any[] = []
    // Read each image file in the directory and encode it to base64
    const imageFiles = fs.readdirSync(imageDirectory)
    for (const file of imageFiles) {
        if (file.endsWith('.ts') || file.endsWith('offers')) {
            continue
        }
        const filePath = path.join(imageDirectory, file)
        console.log(filePath)
        const base64Image = await getImageAsBase64(filePath)
        // console.log(base64Image)
        // console.log('-----------')

        // Decode Base64 string
        const byteCharacters = atob(base64Image)
        const byteLists = []

        for (let i = 0; i < byteCharacters.length; i++) {
            byteLists.push(byteCharacters.charCodeAt(i))
        }

        const byteList = new Uint8Array(byteLists)
        byteArrays.push(byteList)
    }
    const imageOfferFiles = fs.readdirSync(offerImageDirectory)

    for (const file of imageOfferFiles) {
        if (file.endsWith('.ts')) {
            continue
        }

        const filePath = path.join(offerImageDirectory, file)

        const base64Image = await getImageAsBase64(filePath)
        // console.log(base64Image)
        // console.log('-----------')

        // Decode Base64 string
        const byteCharacters = atob(base64Image)
        const byteLists = []

        for (let i = 0; i < byteCharacters.length; i++) {
            byteLists.push(byteCharacters.charCodeAt(i))
        }

        const byteList = new Uint8Array(byteLists)
        byteArraysOffer.push(byteList)
    }
    console.log(byteArraysOffer.length)
    for (let i = 1; i <= 10; i++) {
        await prisma.customer.create({
            data: {
                id: i,
                email: `customer${i}@example.com`,
                password: 'password123',
                fname: `FirstName${i}`,
                lname: `LastName${i}`,
                phone: `123456789${i}`,
                gender: i % 2 === 0 ? 'male' : 'female',
                image: null,
                imageType: null,
            },
        })
    }

    const roomTypes: any[] = [
        {
            id: 1,
            name: 'Standard Room',
            description:
                'Our Standard Room offers a cozy and comfortable retreat for solo travelers or couples. Thoughtfully designed, this room features a plush queen-sized bed, modern furnishings, and a well-appointed en-suite bathroom. Enjoy complimentary Wi-Fi, a flat-screen TV, and a minibar to make your stay convenient and enjoyable. Ideal for both business and leisure, the Standard Room ensures a restful experience.',
            pricepernight: 2000,
            capacity: 2,
            view: 'garden',
            bed: 'double',
            size: 30,
            count: 10,
        },
        {
            id: 2,
            name: 'Luxury Suite',
            description:
                'Indulge in the epitome of elegance in our Luxury Suite. This expansive suite boasts a separate living area, a lavish king-sized bed, and a deluxe bathroom with a soaking tub and premium toiletries. Enjoy top-tier amenities including a high-definition TV, in-room dining service, and a private balcony with stunning views. Perfect for those seeking the ultimate in comfort and sophistication, our Luxury Suite promises an unforgettable stay.',
            pricepernight: 3000,
            capacity: 3,
            view: 'sea',
            bed: 'king',
            size: 70,
            count: 10,
        },
        {
            id: 3,
            name: 'Family Room',
            description:
                "Designed with families in mind, our Family Room provides ample space and comfort for everyone. This room features two queen-sized beds, a sofa bed, and a well-equipped bathroom. Enjoy family-friendly amenities such as a microwave, mini-fridge, and entertainment options including a flat-screen TV with kids' channels. With plenty of space for everyone to relax, the Family Room is your home away from home.",
            pricepernight: 2500,
            capacity: 3,
            view: 'pool',
            bed: 'queen',
            size: 45,
            count: 10,
        },
        {
            id: 4,
            name: 'Single Room',
            description:
                'Ideal for solo travelers, our Single Room offers a peaceful and private haven. This compact yet well-designed room features a comfortable single bed, a work desk, and an en-suite bathroom. Enjoy amenities such as complimentary Wi-Fi, a flat-screen TV, and a coffee maker. Perfect for a short stay, the Single Room provides all the essentials for a productive and relaxing visit.',
            pricepernight: 1300,
            capacity: 1,
            view: 'pool',
            bed: 'single',
            size: 20,
            count: 10,
        },
        {
            id: 5,
            name: 'Deluxe Suite',
            description:
                'Experience the height of luxury in our Deluxe Suite. This spacious suite includes a separate bedroom with a king-sized bed, a stylish living area, and a luxurious bathroom with a rain shower and soaking tub. Enjoy premium amenities such as a large flat-screen TV, a well-stocked minibar, and a private terrace with panoramic views. Whether for business or leisure, the Deluxe Suite offers an extraordinary blend of comfort and sophistication.',
            pricepernight: 3500,
            capacity: 3,
            view: 'sea',
            bed: 'king',
            size: 60,
            count: 10,
        },
    ]
    // Add more real room type data here

    const createdRoomTypes = await prisma.roomType.createMany({
        data: roomTypes,
    })

    // Seed RoomType data
    // for (let i = 1; i <= 10; i++) {
    //     await prisma.roomType.create({
    //         data: {
    //             id: i,
    //             count: i * 5,
    //             pricepernight: new Prisma.Decimal(100 + i * 10),
    //             capacity: 2 + (i % 4),
    //             view: i % 3 === 0 ? 'sea' : i % 3 === 1 ? 'garden' : 'pool',
    //             name: `RoomType${i}`,
    //             bed:
    //                 i % 4 === 0
    //                     ? 'single'
    //                     : i % 4 === 1
    //                       ? 'double'
    //                       : i % 4 === 2
    //                         ? 'king'
    //                         : 'queen',
    //             size: new Prisma.Decimal(20 + i * 5),
    //             description: `Description for RoomType${i}`,
    //         },
    //     })
    // }

    //  5 roomtypes
    // 1 roomtype => 10 rooms

    // Seed Room data
    for (let i = 1; i <= 5; i++) {
        for (let j = 1; j <= 10; j++) {
            await prisma.room.create({
                data: {
                    roomType: {
                        connect: { id: i },
                    }, // Add type assertion to 'any' to match the expected type
                    status: j == 4 ? 'out_of_service' : 'in_service',
                    access:
                        j % 2 === 0
                            ? 'online_accessible'
                            : 'online_inaccessible',
                },
            })
        }
    }

    // Seed Reservation data
    for (let i = 1; i <= 10; i++) {
        await prisma.reservation.create({
            data: {
                customer: {
                    connect: { id: i },
                },
                checkin: new Date(`2024-06-${i}`),
                checkout: new Date(`2024-06-${i + 5}`),
            },
        })
    }

    // Seed Bill data
    for (let i = 1; i <= 5; i++) {
        await prisma.bill.create({
            data: {
                reservation: {
                    connect: { id: i },
                },
                totalAmount: new Prisma.Decimal(200 + i * 50),
                status: i % 2 === 0 ? 'complete' : 'incomplete',
                saleId: '',
            },
        })
    }

    // get the ids of the rooms
    const roomsId: any = await prisma.room.findMany({
        select: {
            room_id: true,
        },
    })
    // Seed Booking data
    for (let i = 1; i <= 5; i++) {
        await prisma.booking.create({
            data: {
                reservation: {
                    connect: { id: i },
                },
                room: {
                    connect: { room_id: roomsId[i - 1].room_id },
                },
                status:
                    i % 4 === 0
                        ? 'reserved'
                        : i % 4 === 1
                          ? 'cancelled'
                          : i % 4 === 2
                            ? 'checked_in'
                            : 'checked_out',
            },
        })
    }

    // Seed Offer data
    // for (let i = 1; i <= 5; i++) {
    //     await prisma.offer.create({
    //         data: {
    //             roomType: {
    //                 connect: { id: i },
    //             },
    //             startDate: new Date(`2024-06-${i}`),
    //             endDate: new Date(`2024-07-${i}`),
    //             percentage: new Prisma.Decimal(i * 5),

    //             name: `Offer${i}`,
    //             status: i % 2 === 0 ? 'active' : 'inactive',
    //         },
    //     })
    // }

    let offers: any[] = [
        {},
        {
            id: 1,
            roomTypeId: null,
            startDate: new Date('2024-06-01'),
            endDate: new Date('2024-06-10'),
            percentage: 10,
            description: 'Get 10% off on all rooms',
            name: 'Special Summer Offer',
            image: byteArraysOffer[1],
            imageType: '/image/png',
            status: 'active',
        },
        {
            id: 2,
            roomTypeId: null,
            startDate: new Date('2024-06-20'),
            endDate: new Date('2024-06-30'),
            percentage: 12,
            description: 'Get 12% off on all rooms',
            name: 'Eid Special Offer',
            image: byteArraysOffer[0],
            imageType: '/image/jpg',
            status: 'active',
        },
    ]
    for (let i = 1; i < offers.length; i++) {
        await prisma.offer.create({
            data: {
                roomType: { connect: { id: i } },
                startDate: offers[i].startDate,
                endDate: offers[i].endDate,
                percentage: offers[i].percentage,
                description: offers[i].description,
                name: offers[i].name,
                imageType: offers[i].imageType,
                status: offers[i].status,
                image: offers[i].image,
            },
        })
    }
    // Seed OTP data
    for (let i = 1; i <= 5; i++) {
        await prisma.otp.create({
            data: {
                otp: `otp${i}code`,
                customer: {
                    connect: { id: i },
                },
            },
        })
    }

    // Seed NewsLetter data
    for (let i = 1; i <= 10; i++) {
        await prisma.newsLetter.create({
            data: {
                email: `newsletter${i}@example.com`,
                name: `NewsletterName${i}`,
            },
        })
    }

    // seed the images
    for (let i = 0; i < byteArrays.length; i++) {
        console.log(byteArrays[i])
        await prisma.imageURL.create({
            data: {
                id: i + 1,
                blob: byteArrays[i],
                type: '/image/jpg',
            },
        })
    }
    for (let i = 1; i <= 5; i++) {
        for (let j = 0; j < byteArrays.length; j++) {
            await prisma.typeImage.create({
                data: {
                    typeId: i,
                    imageId: j + 1,
                },
            })
        }
    }
    // add reviews
    for (let i = 1; i <= 5; i++) {
        for (let j = 1; j <= 6; j++) {
            await prisma.review.create({
                data: {
                    customer: {
                        connect: { id: i },
                    },
                    roomType: {
                        connect: { id: i },
                    },
                    rating: Math.random() < 0.5 ? 4 : 5,
                    comment: `The Deluxe Suite at Plaza was an exceptional experience. The room was spacious and beautifully decorated`,
                },
            })
        }
    }
    // add dummy data in the last year table and current year table
    for (let i = 1; i <= 12; i++) {
        await prisma.lastYear.create({
            data: {
                month: i,
                online_reservations: Math.floor(Math.random() * 100),
                offline_reservations: Math.floor(Math.random() * 100),
            },
        })
        await prisma.currentYear.create({
            data: {
                month: i,
                online_reservations: Math.floor(Math.random() * 100),
                offline_reservations: Math.floor(Math.random() * 100),
            },
        })
    }

    console.log('Seed data has been added successfully!')
}

main()
    .catch((e) => {
        console.error(e)

        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
