"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriversModule = void 0;
const common_1 = require("@nestjs/common");
const drivers_controller_1 = require("./drivers.controller");
const drivers_service_1 = require("./drivers.service");
const scrape_service_1 = require("../ScrapeService/scrape.service");
const gpt_service_1 = require("../gptService/gpt.service");
let DriversModule = class DriversModule {
};
exports.DriversModule = DriversModule;
exports.DriversModule = DriversModule = __decorate([
    (0, common_1.Module)({
        controllers: [drivers_controller_1.DriversController],
        providers: [drivers_service_1.DriversService, scrape_service_1.PuppeteerService, gpt_service_1.GptService]
    })
], DriversModule);
//# sourceMappingURL=drivers.module.js.map