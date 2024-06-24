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
    // Read each image file in the directory and encode it to base64
    const imageFiles = fs.readdirSync(imageDirectory)
    for (const file of imageFiles) {
        if (!file.endsWith('.jpg')) {
            continue
        }
        const filePath = path.join(imageDirectory, file)

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
            description: 'A standard room with basic amenities.',
            pricepernight: 2000,
            capacity: 2,
            view: 'garden',
            bed: 'double',
            size: 30,
            count: 40,
        },
        {
            id: 2,
            name: 'Luxury Suite',
            description: 'A luxurious suite with a view of the sea.',
            pricepernight: 3000,
            capacity: 4,
            view: 'sea',
            bed: 'king',
            size: 70,
            count: 5,
        },
        {
            id: 3,
            name: 'Family Room',
            description:
                'A spacious room with multiple beds, suitable for families.',
            pricepernight: 2500,
            capacity: 4,
            view: 'pool',
            bed: 'queen',
            size: 45,
            count: 20,
        },
        {
            id: 4,
            name: 'Single Room',
            description:
                'A small room with a single bed, suitable for one person.',
            pricepernight: 1300,
            capacity: 1,
            view: 'pool',
            bed: 'single',
            size: 20,
            count: 30,
        },
        {
            id: 5,
            name: 'Deluxe Suite',
            description:
                'A luxurious suite with premium amenities and a stunning view.',
            pricepernight: 3500,
            capacity: 4,
            view: 'sea',
            bed: 'king',
            size: 60,
            count: 25,
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

    // Seed Room data
    for (let i = 1; i <= 5; i++) {
        await prisma.room.create({
            data: {
                roomType: {
                    connect: { id: i },
                }, // Add type assertion to 'any' to match the expected type
            },
        })
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
    for (let i = 1; i <= 5; i++) {
        await prisma.offer.create({
            data: {
                roomType: {
                    connect: { id: i },
                },
                startDate: new Date(`2024-06-${i}`),
                endDate: new Date(`2024-07-${i}`),
                percentage: new Prisma.Decimal(i * 5),
                name: `Offer${i}`,
                status: i % 2 === 0 ? 'active' : 'inactive',
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
        await prisma.review.create({
            data: {
                customer: {
                    connect: { id: i },
                },
                roomType: {
                    connect: { id: i },
                },
                rating: i % 5,
                comment: `Comment${i}`,
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
