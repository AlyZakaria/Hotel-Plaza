"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var Database = /** @class */ (function () {
    function Database() {
        this.prisma = new client_1.PrismaClient();
    }
    Database.getInstance = function () {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    };
    Database.prototype.getPrisma = function () {
        return this.prisma;
    };
    return Database;
}());
var dbInstance = Database.getInstance();
var prisma = dbInstance.getPrisma();
exports.default = prisma;
