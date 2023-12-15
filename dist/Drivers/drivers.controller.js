"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriversController = void 0;
const common_1 = require("@nestjs/common");
const drivers_service_1 = require("./drivers.service");
const scrape_service_1 = require("../ScrapeService/scrape.service");
let DriversController = class DriversController {
    constructor(driversService, puppeteerService) {
        this.driversService = driversService;
        this.puppeteerService = puppeteerService;
    }
    async getDriversByYear(year) {
        const drivers = await this.driversService.getDriversByYear(year);
        return drivers;
    }
    async getAllDrivers() {
        const drivers = await this.driversService.getAllDrivers();
        return drivers;
    }
    async getRandomDrivers() {
        const drivers = await this.driversService.getRandomDrivers();
        return drivers;
    }
    async searchDriver(name) {
        const drivers = await this.driversService.searchDriver(name);
        if (drivers.length === 0) {
            return "No driver found";
        }
        return drivers;
    }
    async getStandingsByYear(year) {
        const standings = await this.driversService.getStandingsByYear(year);
        return standings;
    }
    async getDriverInfo(driverId) {
        const driver = await this.driversService.getDriverPointsInfo(driverId);
        return driver;
    }
};
exports.DriversController = DriversController;
__decorate([
    (0, common_1.Get)("/driversByYear"),
    __param(0, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DriversController.prototype, "getDriversByYear", null);
__decorate([
    (0, common_1.Get)('/allDrivers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DriversController.prototype, "getAllDrivers", null);
__decorate([
    (0, common_1.Get)('/randomDrivers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DriversController.prototype, "getRandomDrivers", null);
__decorate([
    (0, common_1.Get)('/searchDriver'),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DriversController.prototype, "searchDriver", null);
__decorate([
    (0, common_1.Get)('/driverStandingsByYear'),
    __param(0, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DriversController.prototype, "getStandingsByYear", null);
__decorate([
    (0, common_1.Get)('/driverInfo'),
    __param(0, (0, common_1.Query)('driverId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DriversController.prototype, "getDriverInfo", null);
exports.DriversController = DriversController = __decorate([
    (0, common_1.Controller)('drivers'),
    __metadata("design:paramtypes", [drivers_service_1.DriversService,
        scrape_service_1.PuppeteerService])
], DriversController);
//# sourceMappingURL=drivers.controller.js.map