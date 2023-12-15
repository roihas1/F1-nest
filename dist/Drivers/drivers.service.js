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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriversService = void 0;
const common_1 = require("@nestjs/common");
const scrape_service_1 = require("../ScrapeService/scrape.service");
const axios_1 = require("axios");
const gpt_service_1 = require("../gptService/gpt.service");
const api_url = "http://ergast.com/api/f1/";
let DriversService = class DriversService {
    constructor(puppeteerService, gptService) {
        this.puppeteerService = puppeteerService;
        this.gptService = gptService;
    }
    async getDriversByYear(year) {
        const response = await axios_1.default.get(api_url + year.toString() + '/drivers.json');
        const extractDrivers = this.extractDriversDetails(response.data.MRData.DriverTable.Drivers);
        let drivers = await this.insertPosition(extractDrivers, year);
        drivers = drivers.sort((a, b) => a.position - b.position);
        drivers = await this.getDriversAbout(drivers);
        return drivers;
    }
    extractDriversDetails(drivers) {
        const driversDetails = [];
        for (const driver of drivers) {
            const { driverId, url, givenName, familyName, dateOfBirth, nationality } = driver;
            driversDetails.push({
                driverId: driverId,
                url: url,
                givenName: givenName,
                familyName: familyName,
                dateOfBirth: dateOfBirth,
                nationality: nationality
            });
        }
        return driversDetails;
    }
    async insertPosition(drivers, year) {
        const positions = await this.getStandingsbyYear(year);
        for (const driver of drivers) {
            const info = positions.find(element => element.Driver.driverId === driver.driverId);
            if (info === undefined) {
                driver.position = "N/A";
                continue;
            }
            driver.position = info.position;
            driver.points = info.points;
            driver.constructor = info.Constructors[0];
        }
        return drivers;
    }
    async getStandingsbyYear(year) {
        const response = await axios_1.default.get(api_url + year.toString() + '/driverStandings.json?limit=1000');
        return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    }
    async getDriversAbout(drivers) {
        const promises = drivers.map(async (driver) => {
            const about = await this.getDriverAbout(driver.url);
            driver.about = about;
            return driver;
        });
        const updatedDrivers = await Promise.all(promises);
        console.log(updatedDrivers);
        return drivers;
    }
    async getDriverAbout(url) {
        return await this.gptService.getDriverSummary(url);
    }
    async getAllDrivers() {
        const response = await axios_1.default.get(api_url + 'drivers.json?limit=1000');
        return response.data.MRData.DriverTable.Drivers;
    }
    async getRandomDrivers() {
        const drivers = await this.getAllDrivers();
        const randomDrivers = this.chooseDrivers(drivers);
        const updatedDrivers = await this.getDriversAbout(randomDrivers);
        return updatedDrivers;
    }
    chooseDrivers(drivers) {
        const randomDrivers = [];
        for (let i = 0; i < 3; i++) {
            const random = Math.floor(Math.random() * drivers.length);
            const driver = drivers[random];
            drivers.splice(random, 1);
            randomDrivers.push(driver);
        }
        return randomDrivers;
    }
    async searchDriver(name) {
        const drivers = await this.getAllDrivers();
        const searchDrivers = this.searchDriversByName(drivers, name);
        if (searchDrivers.length !== 0) {
            const updatedDrivers = await this.getDriversAbout(searchDrivers);
            return updatedDrivers;
        }
        return searchDrivers;
    }
    searchDriversByName(drivers, name) {
        const searchDrivers = [];
        for (const driver of drivers) {
            if (driver.givenName.toLowerCase() === name.toLowerCase() ||
                driver.familyName.toLowerCase() === name.toLowerCase() ||
                driver.driverId.toLowerCase() === name.toLowerCase()) {
                searchDrivers.push(driver);
            }
        }
        return searchDrivers;
    }
    async getStandingsByYear(year) {
        const response = await axios_1.default.get(api_url + year.toString() + '/driverStandings.json?limit=1000');
        return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    }
    async getDriverPointsInfo(driverId) {
        const response = await axios_1.default.get(api_url + 'drivers/' + driverId + '/driverStandings.json?limit=1000');
        const driverStandings = response.data.MRData.StandingsTable.StandingsLists;
        let totalPoints = 0;
        let totalWins = 0;
        const standingPerYear = {};
        for (const standing of driverStandings) {
            totalPoints += Number(standing.DriverStandings[0].points);
            totalWins += Number(standing.DriverStandings[0].wins);
            standingPerYear[standing.season] = { position: standing.DriverStandings[0].position, points: standing.DriverStandings[0].points, wins: standing.DriverStandings[0].wins };
        }
        return { totalPoints: totalPoints, totalWins: totalWins, standingPerYear: standingPerYear };
    }
};
exports.DriversService = DriversService;
exports.DriversService = DriversService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [scrape_service_1.PuppeteerService,
        gpt_service_1.GptService])
], DriversService);
//# sourceMappingURL=drivers.service.js.map