import { PrismaClient } from '@prisma/client/extension'
import prisma from '../utils/db'

class Repository {
    protected _model: any
    protected prisma: PrismaClient = prisma
    constructor() {}
}

export default Repository
