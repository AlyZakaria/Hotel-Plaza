import { PrismaClient } from '@prisma/client'

class Repository {
    protected _model: any
    protected prisma: PrismaClient = new PrismaClient()

    constructor() {}
}

export default Repository
